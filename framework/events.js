// A simple class for managing custom events and their listeners
class EventSystem {
    /**
     * Initializes the event system with an empty storage for events.
     */
    constructor() {
        this.events = {}; // Stores events as keys and their listeners as arrays.
    }

    /**
     * Registers a listener for a specific event type.
     * @param {string} event - The name of the event to listen for.
     * @param {Function} listener - The callback function to execute when the event is triggered.
     */
    on(event, listener) {
        // If the event is new, create an empty array to hold its listeners.
        if (!this.events[event]) {
            this.events[event] = [];
        }
        // Add the provided listener to the event's listener list.
        this.events[event].push(listener);
    }

    /**
     * Triggers an event, notifying all its registered listeners.
     * @param {string} event - The name of the event to trigger.
     * @param {*} data - Optional data to pass to each listener when the event is triggered.
     */
    emit(event, data) {
        // Retrieve the list of listeners for the specified event.
        const listeners = this.events[event];

        if (listeners) {
            // Call each listener, passing the provided data to them.
            listeners.forEach((listener) => listener(data));
        }
    }
}

export { EventSystem }; // Export the class for use in other parts of the application.
