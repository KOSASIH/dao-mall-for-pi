import * as tf from '@tensorflow/tfjs';
import { Product } from './product';

const productRecommender = async () => {
  // Load product data
  const products = await Product.getAll();

  // Create a TensorFlow model
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 10, inputShape: [10] }));
  model.add(tf.layers.dense({ units: 5 }));
  model.compile({ optimizer: tf.optimizers.adam(), loss: 'eanSquaredError' });

  // Train the model
  await model.fit(products, { epochs: 10 });

  // Make recommendations
  const userProducts = await Product.getUserProducts('userId');
  const recommendations = await model.predict(userProducts);
  console.log(recommendations);
};

productRecommender();
