const openai = require("openai");

const apiKey = process.env.openai_apiKey;

async function generateText(prompt) {
  try {
    const response = await openai.Completion.create({
      prompt: prompt,
      model: "text-davinci-002",
      temperature: 0.7,
      apiKey: apiKey
    });
    return response.choices[0].text;
  } catch (error) {
    console.error(error);
  }
}

const productName = "Example Product";
const productKeywords = "example, product, new";

const metaTitlePrompt = `Generate a meta title optimized for SEO for product ${productName} with the following keywords: ${productKeywords}`;
const generatedMetaTitle = generateText(metaTitlePrompt);
console.log(generatedMetaTitle);

const metaDescriptionPrompt = `Generate a meta description optimized for SEO for product ${productName} with the following keywords: ${productKeywords}`;
const generatedMetaDescription = generateText(metaDescriptionPrompt);
console.log(generatedMetaDescription);
