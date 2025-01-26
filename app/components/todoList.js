import { Store } from '../../framework/state.js'; // Importing the Store class for managing state
import { EventSystem } from '../../framework/events.js'; // Importing the EventSystem class for handling events

// Retrieve existing todos from localStorage or use an empty array as a fallback
const initialTodos = JSON.parse(localStorage.getItem('todos')) || [];
const store = new Store({ todos: initialTodos }); // Create a store instance initialized with todos
const events = new EventSystem(); // Initialize the EventSystem for managing event-based interactions

// Class responsible for handling the todo list functionality
export class TodoList {
    constructor() {
        this.currentFilter = 'all'; // Default filter setting is 'all'

        // Set up a subscription to the store to trigger updates on changes
        store.subscribe(() => {
            this.renderToDOM(); // Re-render the todo list on updates
            this.saveTodosToLocalStorage(); // Save the updated state to localStorage
        });

        // Register an event listener for adding new todos
        events.on('addTodo', this.addTodo.bind(this));
    }

    // Add a new todo item to the list
    addTodo(todoText) {
        const todos = store.getState().todos; // Access the current todo list from the store
        store.setState({ todos: [...todos, { text: todoText, completed: false }] }); // Append a new todo and update the state
    }

    // Change the filter for displaying todos
    filterTodos(filter) {
        this.currentFilter = filter; // Update the filter state
        this.renderToDOM(); // Refresh the display based on the new filter
        console.log(`Filter applied: ${filter}`); // Log the applied filter
    }

    // Retrieve todos based on the active filter
    getFilteredTodos() {
        const todos = store.getState().todos; // Access the current todos
        if (this.currentFilter === 'active') {
            return todos.filter(todo => !todo.completed); // Return incomplete todos
        } else if (this.currentFilter === 'completed') {
            return todos.filter(todo => todo.completed); // Return completed todos
        } else {
            return todos; // Return all todos by default
        }
    }

    // Remove todos that are marked as completed
    clearCompleted() {
        const todos = store.getState().todos.filter(todo => !todo.completed); // Filter out completed todos
        store.setState({ todos }); // Update the store with the remaining todos
    }

    // Render the todo list to the webpage
    renderToDOM() {
        const html = this.renderHTML(); // Generate the HTML structure for the todo list
        this.insertHTMLToDOM(html, 'app'); // Place the generated HTML into the DOM

        // Attach event listener to the "Add" button
        const addButton = document.querySelector('.input-container button');
        if (addButton) {
            addButton.addEventListener('click', () => this.handleAddTodo());
        }

        // Add event listeners to toggle buttons for marking todos as complete/incomplete
        const toggleButtons = document.querySelectorAll('.toggle-circle');
        toggleButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const todoText = event.target.getAttribute('data-todo-text');
                this.toggleTodo(todoText);
            });
        });

        // Add event listeners to remove buttons for deleting todos
        const removeButtons = document.querySelectorAll('.todo-items button[data-action="remove"]');
        removeButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const todoText = event.target.getAttribute('data-todo-text');
                this.removeTodo(todoText);
            });
        });
    }

    // Generate the HTML structure for the todo list
    renderHTML() {
        const todos = this.getFilteredTodos(); // Get todos based on the current filter
        const todoItemsHTML = todos.map((todo, index) => `
            <div class="todo-item-container">
                <li class="todo-item">
                    <button class="toggle-circle ${todo.completed ? 'completed' : ''}" 
                        data-todo-text="${todo.text}">
                        ${todo.completed ? '✔' : ''}
                    </button>
                    <span style="${todo.completed ? 'text-decoration: line-through;' : ''}">${todo.text}</span>
                    <button class="remove-button" data-todo-text="${todo.text}" data-action="remove">Remove</button>
                </li>
            </div>
        `).join(''); // Create HTML for each todo item

        return `
        <div class="main-container">
            <h1>TODO LIST</h1>
            <div class="todo-container">
                <div class="input-container"> 
                    <input type="text" id="new-todo-input" placeholder="Add a task" />
                    <button>Add</button>
                </div>
                
                <ul class="todo-items">${todoItemsHTML}</ul> 
                <hr />
                <p class="items-total"><span>${todos.length}</span> items total</p> 
                <div class="filter-buttons">
                    <button onclick="todoList.filterTodos('all')">All</button>
                    <button onclick="todoList.filterTodos('active')">Active</button>
                    <button onclick="todoList.filterTodos('completed')">Completed</button>
                    <button onclick="todoList.clearCompleted()">Clear completed</button>
                </div>
            </div>
        </div>
        `;
    }

    // Insert the generated HTML into a specific container
    insertHTMLToDOM(html, containerId) {
        const container = document.getElementById(containerId); // Find the container by ID
        if (!container) {
            console.error(`Element with ID "${containerId}" was not found.`); // Log an error if the container doesn't exist
            return;
        }
        container.innerHTML = html; // Update the container's content with the new HTML
    }

    // Add a new todo item from the input field
    handleAddTodo() {
        const input = document.getElementById('new-todo-input'); // Get the input field element
        const todoText = input.value.trim(); // Extract and clean the input value
        if (todoText) {
            this.addTodo(todoText); // Add the new todo to the list
            input.value = ''; // Reset the input field after adding
        }
    }

    // Remove a todo item by its text
    removeTodo(todoText) {
        const todos = store.getState().todos.filter(todo => todo.text !== todoText); // Exclude the specified todo
        store.setState({ todos }); // Update the store with the new list
    }

    // Toggle the completion status of a specific todo
    toggleTodo(todoText) {
        const todos = store.getState().todos.map(todo =>
            todo.text === todoText ? { ...todo, completed: !todo.completed } : todo
        ); // Change the completed status for the specified todo
        store.setState({ todos }); // Update the state with the modified todos
    }

    // Persist the current todos to localStorage
    saveTodosToLocalStorage() {
        const todos = store.getState().todos; // Retrieve the current todos
        localStorage.setItem('todos', JSON.stringify(todos)); // Save them in localStorage
    }
}

// Instantiate the TodoList class to initialize the application
const todoList = new TodoList();