const redis = require('redis');

// Create a Redis client
const client = redis.createClient();

// Check if the connection to the Redis server is successful
client.on('connect', () => {
  console.log('Connected to Redis server');
});

// If there's an error connecting to the Redis server
client.on('error', (err) => {
  console.error('Error connecting to Redis:', err);
});

// Perform Redis operations
// For example, let's set and get a key-value pair
client.set('myKey', 'Hello, Redis!', (err, reply) => {
  if (err) {
    console.error('Error setting key:', err);
  } else {
    console.log('Key set:', reply);

    // Now, let's get the value of the key we just set
    client.get('myKey', (err, value) => {
      if (err) {
        console.error('Error getting key:', err);
      } else {
        console.log('Value:', value);

        // Close the connection when done
        client.quit();
      }
    });
  }
});
