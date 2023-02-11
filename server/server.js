require("dotenv").config();
const Shopify = require("shopify-api-node");
const openai = require("openai");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const shopify = new Shopify({
  shopName: process.env.shopName,
  apiKey: process.env.apiKey,
  password: process.env.password,
  access_token: process.env.access_token,
  openai_apiKey: process.env.openai_apiKey,
});

async function optimizeProduct(productId) {
  try {
    const product = await shopify.product.get(productId);
    const { title, body_html: description } = product;

    const response = await openai.Completion.create({
      prompt: `Optimize the title and description for SEO for the following product:
        Title: ${title}
        Description: ${description}`,
      model: "text-davinci-002",
    });

    const optimizedTitle = response.choices[0].text;
    const optimizedDescription = response.choices[1].text;

    await shopify.product.update(productId, {
      title: optimizedTitle,
      body_html: optimizedDescription,
    });

    console.log(`Product with ID ${productId} has been optimized`);
  } catch (error) {
    console.error(error);
  }
}

rl.question("Enter the ID of the product to optimize: ", (productId) => {
  optimizeProduct(productId);
});
