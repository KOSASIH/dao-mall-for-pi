import * as mqtt from 'mqtt';
import { Inventory } from './inventory';

const iotInventory = async () => {
  // Connect to the MQTT broker
  const client = mqtt.connect('mqtt://iot-broker:1883');

  // Subscribe to the inventory topic
  client.subscribe('inventory/+');

  // Handle incoming inventory updates
  client.on('message', (topic, message) => {
    const productId = topic.split('/')[1];
    const quantity = parseInt(message.toString());

    // Update the inventory
    await Inventory.update(productId, quantity);
  });

  // Get the current inventory levels
  const inventory = await Inventory.getAll();
  console.log(inventory); // object with product IDs as keys and quantities as values
};

iotInventory();
