require("dotenv").config();
const openai = require("openai");
openai_apiKey: process.env.openai_apiKey;

async function generateText(prompt) {
  const response = await openai.Completion.create({
    engine: "text-davinci-002",
    prompt: prompt,
  });
  return response.choices[0].text;
}

module.exports = { generateText };
const Shopify = require("shopify-api-node");

const shopify = new Shopify({
  shopName: process.env.shopName,
  apiKey: process.env.apiKey,
  password: process.env.password,
  access_token: process.env.access_token,
});

const keywords = ["best", "top", "quality", "discount", "sale"];

async function updateProduct(id, data) {
  try {
    const updatedProduct = await shopify.product.update(id, data);
    console.log(`Product ${id} updated!`);
    return updatedProduct;
  } catch (error) {
    console.error(error);
  }
}

async function updateAllProducts() {
  try {
    const products = await shopify.product.list();
    for (const product of products) {
      // Update product title
      let newTitle = `${product.title} - ${
        keywords[Math.floor(Math.random() * keywords.length)]
      }`;
      await updateProduct(product.id, { title: newTitle });

      // Update product description
      let newDescription = `${product.body_html} - ${
        keywords[Math.floor(Math.random() * keywords.length)]
      }`;
      await updateProduct(product.id, { body_html: newDescription });

      // Update product metatitle
      let newMetatitle = `${product.title} - ${
        keywords[Math.floor(Math.random() * keywords.length)]
      }`;
      await updateProduct(product.id, {
        metafields: [{ key: "metatitle", value: newMetatitle }],
      });
    }
  } catch (error) {
    console.error(error);
  }
}
