// Imports the Google Cloud client library
// const { Translate } = require("@google-cloud/translate").v2;
import { Translate } from "@google-cloud/translate/build/src/v2/index.js";

// Creates a client
const translate = new Translate();

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// const text = "Hello";
const target = "ko";

const translateText = async (text) => {
  // Translates the text into the target language. "text" can be a string for
  // translating a single piece of text, or an array of strings for translating
  // multiple texts.
  let translations = await translate.translate(text, target);
  translations = Array.isArray(translations)
    ? translations
    : [translations];

  // const result = JSON.parse(JSON.stringify(translations));
  // console.log(`${text} => (${target}) ${translations}`);
  return translations;
};

export { translateText };
