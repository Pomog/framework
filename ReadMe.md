# Mini-Framework Documentation

The Mini-Framework is a lightweight, custom-built framework designed to simplify the development of dynamic web applications. It provides essential tools for managing application state, manipulating the DOM, routing, and handling events, without the need for established libraries like React, Angular, or Vue.

## Getting Started

1. Clone or Download the repository.
2. Open `index.html ` using `Live Server `
3. Add Todos: Enter a task in the input field and click "Add".
4. Filter Todos: Use the "All", "Active", or "Completed" buttons to filter your list.
5. Clear Completed Todos: Click "Clear completed" to remove all finished tasks.


## Project structure

### 1. App folder 

The app folder contains the components that define the structure and functionality of the application:

* Components Folder: 
This folder contains two files: todoItem.js and todoList.js.

#### todoItem.js

Defines the TodoItem class, representing a single task in the app.

Constructor: Initializes the todo with text and provides functionality to remove or toggle the task.
Render Method: Renders a <li> element for the todo, with a line-through style if marked as complete.
 
![code1](css/code1.png)

#### todoList.js

Manages the entire todo list's functionality through the TodoList class.

* Constructor: Sets up the state, event handling, and DOM interactions.
* AddTodo Method: Adds new tasks to the state.
* FilterTodos Method: Updates the filter and re-renders the list.
* GetFilteredTodos Method: Returns todos based on the selected filter (all, active, completed).
* ClearCompleted Method: Removes all completed tasks.
* RenderToDOM Method: Renders the todo list and attaches event listeners.
* Helper Methods: Handle interactions like adding, removing, or toggling todos, and saving them to localStorage.

![code2](css/code2.png)

### 2. framework folder 

The framework folder includes essential files that form the core of the mini-framework, focusing on DOM manipulation, routing, state management, and event handling:

#### dom.js

Provides utilities for abstracting and manipulating the DOM.

Element Class: Represents a virtual DOM structure.
renderComponent Function: Renders virtual DOM elements to the actual DOM.

![code3](css/code3.png)

#### router.js
The router.js file provides a routing system to synchronize the application state with the URL, allowing navigation between different views.

* Router Class: Manages URL changes and maps them to specific components or functions.

![code4](css/code4.png)

#### state.js 
The state.js file handles state management for the application, allowing a centralized store that multiple components can interact with and share, making it easier to maintain and update.

* Store Class: Manages global state.
* subscribe Method: Allows components to listen for state changes. 

![code5](css/code5.png)

#### events.js
The events.js file provides a custom event handling system, allowing to manage user interactions and other events in a more controlled and centralized way.

* EventSystem Class: Custom event handling system.
* on and emit Methods: Register and trigger events.

![code6](css/code6.png)

