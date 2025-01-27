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

        // Initialize the filter based on the URL
        this.initializeFilterFromURL();
    }

    initializeFilterFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const filter = urlParams.get('filter') || 'all'; // Default to 'all' if no filter is specified
        this.currentFilter = filter;
        this.renderToDOM(); // Render the initial state based on the filter
    }

    // Count only the unchecked (active) items
    countUncheckedItems() {
        const todos = store.getState().todos; // Get the current state of todos
        return todos.filter(todo => !todo.completed).length; // Count items where 'completed' is false
    }

    // Add a new todo item to the list
    addTodo(todoText) {
        const todos = store.getState().todos; // Access the current todo list from the store
        store.setState({ todos: [...todos, { text: todoText, completed: false }] }); // Append a new todo and update the state
    }

    // Change the filter for displaying todos
    filterTodos(filter) {
        this.currentFilter = filter; // Update the filter state

        // Update the URL without reloading the page
        const newUrl = `${window.location.pathname}?filter=${filter}`;
        history.pushState(null, '', newUrl);

        this.renderToDOM(); // Refresh the display based on the new filter
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

// Updated renderToDOM to include the dblclick functionality
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

        // Add double-click event listeners to enable editing todo items
        const todoTextElements = document.querySelectorAll('.todo-item span');
        todoTextElements.forEach(span => {
            span.addEventListener('dblclick', (event) => this.handleEditTodo(event));
        });

        // Update the active task count
        const uncheckedCountElement = document.getElementById('unchecked-count');
        if (uncheckedCountElement) {
            uncheckedCountElement.textContent = `Active tasks: ${this.countUncheckedItems()}`;
        }
    }


// Add a method to handle editing a to-do
    handleEditTodo(event) {
        const span = event.target;
        const oldText = span.textContent;
        const parentLi = span.parentElement;

        // Replace the span with an input field
        const input = document.createElement('input');
        input.type = 'text';
        input.value = oldText;
        input.classList.add('edit-todo-input');
        parentLi.replaceChild(input, span);

        // Focus the input field and select the text
        input.focus();
        input.select();

        // Handle saving the edited text on blur or pressing Enter
        const saveEdit = () => {
            const newText = input.value.trim();
            if (newText && newText !== oldText) {
                this.updateTodoText(oldText, newText);
            }
            parentLi.replaceChild(span, input);
            span.textContent = newText || oldText; // Revert to the old text if input is empty
        };

        input.addEventListener('blur', saveEdit); // Save changes when the input loses focus
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') saveEdit(); // Save changes when Enter is pressed
        });
    }

// Add a method to update a to-do's text in the store
    updateTodoText(oldText, newText) {
        const todos = store.getState().todos.map(todo =>
            todo.text === oldText ? { ...todo, text: newText } : todo
        ); // Update the text of the matching to-do
        store.setState({ todos }); // Update the state with the modified todos
    }


    // Generate the HTML structure for the todo list
    renderHTML() {
        const todos = this.getFilteredTodos(); // Get todos based on the current filter
        const todoItemsHTML = todos.map(todo => `
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
        `).join('');

        return `
            <div class="main-container">
                <h1>TODO LIST</h1>
                <div class="todo-container">
                    <div class="input-container"> 
                        <input type="text" id="new-todo-input" placeholder="Add a task" />
                        <button>Add</button>
                    </div>
                    
                    <ul class="todo-items">${todoItemsHTML}</ul> 
            
                    ${todos.length > 0
            ? `
                        <footer class="footer">
                            <hr />
                            <p id="unchecked-count">Active tasks: 0</p>
                                <div class="filter-buttons">
                                    <button onclick="todoList.filterTodos('all')">All</button>
                                    <button onclick="todoList.filterTodos('active')">Active</button>
                                    <button onclick="todoList.filterTodos('completed')">Completed</button>
                                    <button onclick="todoList.clearCompleted()">Clear completed</button>
                                </div>
                        </footer>
                        `
            : ''}
                </div>
            </div>
        `;
    }

    // Add event listeners for toggle and remove buttons
    attachEventListeners() {
        const addButton = document.querySelector('.input-container button');
        if (addButton) {
            addButton.addEventListener('click', () => this.handleAddTodo());
        }

        const toggleButtons = document.querySelectorAll('.toggle-circle');
        toggleButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const todoText = event.target.getAttribute('data-todo-text');
                this.toggleTodo(todoText);
            });
        });

        const removeButtons = document.querySelectorAll('.todo-items button[data-action="remove"]');
        removeButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const todoText = event.target.getAttribute('data-todo-text');
                this.removeTodo(todoText);
            });
        });
    }

    // Add a new todo item from the input field
    handleAddTodo() {
        const input = document.getElementById('new-todo-input');
        const todoText = input.value.trim();
        if (todoText) {
            this.addTodo(todoText);
            input.value = '';
        }
    }

    // Remove a todo item by its text
    removeTodo(todoText) {
        const todos = store.getState().todos.filter(todo => todo.text !== todoText);
        store.setState({ todos });
    }

    // Toggle the completion status of a specific todo
    toggleTodo(todoText) {
        const todos = store.getState().todos.map(todo =>
            todo.text === todoText ? { ...todo, completed: !todo.completed } : todo
        );
        store.setState({ todos });
    }

    // Persist the current todos to localStorage
    saveTodosToLocalStorage() {
        const todos = store.getState().todos;
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // Insert the generated HTML into a specific container
    insertHTMLToDOM(html, containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Element with ID "${containerId}" was not found.`);
            return;
        }
        container.innerHTML = html;
    }
}

// Instantiate the TodoList class to initialize the application
const todoList = new TodoList();
