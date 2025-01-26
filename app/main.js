// Importing the TodoList class, which manages the todo list's core logic
import { TodoList } from './components/todoList.js';

// Importing the EventSystem class to handle custom event-based interactions
import { EventSystem } from '../framework/events.js';

// Create an instance of EventSystem for managing application-wide events
const events = new EventSystem();

// Initialize the TodoList component for rendering and managing todos
const todoList = new TodoList();

/**
 * Function to handle the addition of a new todo item.
 * It reads the user input, trims any unnecessary spaces,
 * and emits an event to add the todo to the list.
 */
function handleAddTodo() {
    const input = document.getElementById('new-todo'); // Get the input field for new todos
    const todoText = input.value.trim(); // Clean the input by removing leading/trailing spaces
    if (todoText) {
        events.emit('addTodo', todoText); // Trigger the 'addTodo' event with the user's input
        input.value = ''; // Clear the input field after adding the todo
    }
}

// Render the initial state of the todo list to the DOM
todoList.renderToDOM()

// Set up the "Add" button to call handleAddTodo when clicked
document.getElementById('add-todo-button').onclick = handleAddTodo;
