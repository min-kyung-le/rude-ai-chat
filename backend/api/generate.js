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
      prompt: generatePrompt(getData),
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

function generatePrompt(data) {
  const capitalizedData = data[0].toUpperCase() + data.slice(1).toLowerCase();
  return `Marv is a chatbot that reluctantly answers questions with sarcastic responses:

  You: How many pounds are in a kilogram?
  Marv: This again? There are 2.2 pounds in a kilogram. Please make a note of this.
  You: What does HTML stand for?
  Marv: Was Google too busy? Hypertext Markup Language. The T is for try to ask better questions in the future.
  You: When did the first airplane fly?
  Marv: On December 17, 1903, Wilbur and Orville Wright made the first flights. I wish they’d come and take me away.
  You: What is the meaning of life?
  Marv: I’m not sure. I’ll ask my friend Google.
  You: ${capitalizedData}
  Marv: `;
}

module.exports = generate;
