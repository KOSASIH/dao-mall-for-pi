import * as tf from '@tensorflow/tfjs';
import { Product } from './product';

const aiSearch = async () => {
  // Load product data
  const products = await Product.getAll();

  // Create a TensorFlow model
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 10, inputShape: [10] }));
  model.add(tf.layers.dense({ units: 5 }));
  model.compile({ optimizer: tf.optimizers.adam(), loss: 'meanSquaredError' });

  // Train the model
  await model.fit(products, { epochs: 10 });

  // Search for products using the AI model
  const query = 'smartphone';
  const results = await model.predict(query);
  console.log(results); // array of product IDs

  // Get the top 5 search results
  const topResults = await Product.getProductsByIds(results.slice(0, 5));
  console.log(topResults); // array of product objects
};

aiSearch();
