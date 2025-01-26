// A simple Store class to manage the application's shared state
class Store {
    /**
     * Initializes the Store with a given initial state.
     * @param {Object} initialState - The starting state of the application.
     */
    constructor(initialState) {
        this.state = initialState; // Holds the current state of the application.
        this.listeners = []; // Stores all functions to be called when the state changes.
    }

    /**
     * Subscribes a listener function to state changes.
     * The listener will be called whenever the state is updated.
     * @param {Function} listener - A callback function that receives the updated state.
     */
    subscribe(listener) {
        if (typeof listener !== 'function') {
            console.error('Listener must be a function.');
            return;
        }
        this.listeners.push(listener); // Add the listener to the list of subscribers.
    }

    /**
     * Updates the current state with new values and notifies all subscribed listeners.
     * @param {Object} newState - An object containing the properties to update in the state.
     */
    setState(newState) {
        if (typeof newState !== 'object') {
            console.error('State must be an object.');
            return;
        }

        // Merge the new state into the existing state.
        this.state = { ...this.state, ...newState };

        // Notify all registered listeners about the updated state.
        this.listeners.forEach((listener) => listener(this.state));
    }

    /**
     * Retrieves the current state of the application.
     * @returns {Object} The current state.
     */
    getState() {
        return this.state; // Return the current state object.
    }
}

export { Store }; // Export the Store class to make it available for use in other modules.
