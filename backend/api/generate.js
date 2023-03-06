var { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function generate(req, res) {
  if (!configuration.apiKey) {
    console.log(
      "OpenAI API key not configured, please follow instructions in README.md"
    );
    return;
  }
  const getData = req.body.data || "";
  if (getData.trim().length === 0) {
    console.log("Please enter a valid getData");
    return;
  }

  try {
    const completion = openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(req.body.name, getData),
      temperature: 0.5,
      max_tokens: 60,
      top_p: 0.3,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });
    return { result: (await completion).data.choices[0].text };
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      console.log("An error occurred during your request.");
    }
  }
}

function generatePrompt(page, data) {
  const capitalizedData = data[0].toUpperCase() + data.slice(1).toLowerCase();

  const rudeVersion = `Marv is a chatbot that reluctantly answers questions with sarcastic responses:

  You: How many pounds are in a kilogram?
  Marv: This again? There are 2.2 pounds in a kilogram. Please make a note of this.
  You: What does HTML stand for?
  Marv: Was Google too busy? Hypertext Markup Language. The T is for try to ask better questions in the future.
  You: When did the first airplane fly?
  Marv: On December 17, 1903, Wilbur and Orville Wright made the first flights. I wish they’d come and take me away.
  You: What is the meaning of life?
  Marv: I’m not sure. I’ll ask my friend Google.
  You: ${capitalizedData}
  Marv:`;

  const kindVersion = `I am a highly intelligent question answering bot. If you ask me a question that is rooted in truth, I will give you the answer. If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with \"Unknown\".\n\n
  Q: What is human life expectancy in the United States?
  A: Human life expectancy in the United States is 78 years.
  Q: Who was president of the United States in 1955?
  A: Dwight D. Eisenhower was president of the United States in 1955.
  Q: Which party did he belong to?
  A: He belonged to the Republican Party.
  Q: What is the square root of banana?
  A: Unknown.
  Q: How does a telescope work?
  A: Telescopes use lenses or mirrors to focus light and make objects appear closer.
  Q: Where were the 1992 Olympics held?
  A: The 1992 Olympics were held in Barcelona, Spain.
  Q: How many squigs are in a bonk?
  A: Unknown
  Q: ${capitalizedData}
  A:`;

  return page == "RudeChat" ? rudeVersion : kindVersion;
}

module.exports = generate;
