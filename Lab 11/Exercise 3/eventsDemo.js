// Import events module
const EventEmitter = require('events');

// Create an event emitter object
const eventEmitter = new EventEmitter();

// 1. Register event listener (Listener 1)
eventEmitter.on('greet', (name) => {
    console.log(`Hello, ${name}! Welcome to Node.js events.`);
});

// 2. Register another listener for same event (Listener 2)
eventEmitter.on('greet', (name) => {
    console.log(`How are you, ${name}?`);
});

// 3. Register another custom event
eventEmitter.on('status', (status) => {
    console.log(`Current status: ${status}`);
});

// 4. Trigger events using emit()
eventEmitter.emit('greet', 'Ashok');
eventEmitter.emit('status', 'Server is running');

// 5. Demonstrate asynchronous behavior
setTimeout(() => {
    eventEmitter.emit('greet', 'User after 2 seconds');
}, 2000);