// Class for managing application state
class Store {

    constructor(initialState) {
        this.state = initialState; // Initial state of the store
        this.listeners = []; // Array of listeners to notify on state changes
    }

    // Method to subscribe a listener to state changes
    subscribe(listener) {
        this.listeners.push(listener); // Add the listener to the array
    }

    // Method to update the state and notify all listeners
    setState(newState) {
        this.state = { ...this.state, ...newState }; // Merge new state with current state
        this.listeners.forEach(listener => listener(this.state)); // Notify all listeners with the new state
    }

    // Method to get the current state
    getState() {
        return this.state; // Return the current state
    }
}

export { Store };