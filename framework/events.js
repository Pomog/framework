// Class for managing events and listeners
class EventSystem {

    constructor() {
        this.events = {}; // Object to store event listeners
    }

    // Method to register an event listener
    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = []; // Initialize an array for the event if it doesn't exist
        }
        this.events[event].push(listener); // Add the listener to the event
    }

    // Method to emit an event and notify all listeners
    emit(event, data) {
        const listeners = this.events[event];
        if (listeners) {
            listeners.forEach(listener => listener(data)); // Call each listener with the event data
        }
    }
}

export { EventSystem }; 
