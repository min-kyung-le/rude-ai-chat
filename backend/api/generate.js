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
  const getName = req.body.name || "";
  if (getData.trim().length === 0) {
    console.log("Please enter a valid getData");
    return;
  }
  let completion;
  try {
    if (getName == "RudeChat") {
      completion = openai.createCompletion({
        model: "text-davinci-003",
        prompt: rudePrompt(getData),
        temperature: 0.5,
        max_tokens: 60,
        top_p: 0.3,
        frequency_penalty: 0.5,
        presence_penalty: 0,
      });
    } else if (getName == "KindChat") {
      completion = openai.createCompletion({
        model: "text-davinci-003",
        prompt: kindPrompt(getData),
        temperature: 0,
        max_tokens: 60,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      });
    } else if (getName == "MovieChat") {
      completion = openai.createCompletion({
        model: "text-davinci-003",
        prompt: moviePrompt(getData),
        temperature: 0.8,
        max_tokens: 60,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["\n"],
      });
    }

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

function rudePrompt(data) {
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
  Marv:`;
}

function kindPrompt(data) {
  const capitalizedData = data[0].toUpperCase() + data.slice(1).toLowerCase();

  return `Q: Who is Batman?
  A: Batman is a fictional comic book character.
  Q: What is torsalplexity?
  A: ?
  Q: What is Devz9?
  A: ?
  Q: Who is George Lucas?
  A: George Lucas is American film director and producer famous for creating Star Wars.
  Q: What is the capital of California?
  A: Sacramento.
  Q: What orbits the Earth?
  A: The Moon.
  Q: Who is Fred Rickerson?
  A: ?
  Q: What is an atom?
  A: An atom is a tiny particle that makes up everything.
  Q: Who is Alvan Muntz?
  A: ?
  Q: What is Kozar-09?
  A: ?
  Q: How many moons does Mars have?
  A: Two, Phobos and Deimos.
  Q: ${capitalizedData}
  A:`;
}

function moviePrompt(data) {
  const capitalizedData = data[0].toUpperCase() + data.slice(1).toLowerCase();

  return `Convert movie titles into emoji.
  Back to the Future: 👨👴🚗🕒
  Batman: 🤵🦇
  Transformers: 🚗🤖
  ${capitalizedData}:`;
}

module.exports = generate;
