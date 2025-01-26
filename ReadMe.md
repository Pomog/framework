# Description

This application is a simple framework designed to build a modular, client-side single-page application (SPA).
It consists of several foundational files that work together to manage the application's UI, routing, events, and state.

## Using

### Initialization:
When the app starts, the index.html file is loaded in the browser.
The TodoList component is imported, instantiated, and rendered to the #app container using its renderToDOM method.

### Rendering Components:
The framework/dom.js file provides the functionality to create and render UI components dynamically.
Components (e.g., TodoList, TodoItem) are represented as instances of the Element class.
These virtual structures are transformed into actual DOM elements via the renderElement function.

### User Interaction:
* Adding a Task
The user types a new task into the input field and clicks "Add."
The TodoList component updates the application state with the new task using the Store and re-renders the list of todos.
* Toggling or Removing a Task
The TodoItem component provides buttons to mark a task as completed or remove it.
These actions update the application state and notify other parts of the app via events.

### Event Handling:
Components communicate using the event system (framework/events.js).
For example, when a task is deleted, an event (e.g., taskDeleted) can be emitted to update related components.

### Routing:
The framework/router.js file handles navigation within the app without page reloads.
It updates the URL and renders the corresponding component in the #app container.

## Key Components and Files

### index.html +
* Purpose: Entry point for the application.
* Includes:
A <div id="app"> placeholder where the application renders content.
A script to import and initialize the TodoList component.

### framework/dom.js +
* Purpose: Provides a simple abstraction for creating and rendering DOM elements.
* Key Features:
Element class: Represents components as virtual DOM-like objects (tag, attributes, children).
renderElement function: Converts Element instances into actual DOM elements.
renderComponent function: Renders a component into a specified container by ID.

### framework/events.js +
* Purpose: Implements an event system for inter-component communication.
* Key Features:
on method: Registers event listeners for specific events.
emit method: Triggers an event, notifying all registered listeners.

### framework/router.js +
* Purpose: Manages navigation within the app.
* Key Features:
Matches URL segments to specific routes (objects with path and component properties).
Updates the browser's URL and renders the correct component.

### framework/state.js +
* Purpose: Provides a central store for managing application state.
* Key Features:
Allows components to subscribe to state changes.
Provides methods to update state and notify subscribers.

### app/components/todoList.js +
* Purpose: Defines the main Todo List component.
* Key Features:
Manages adding, removing, and rendering todos.
Uses the Store and EventSystem for state management and communication.

### app/components/todoItem.js
* Purpose: Represents a single todo item in the list.
* Key Features:
Each TodoItem is responsible for rendering its own structure and handling its interactions.
Properties:
todo: Data object for the todo item ({ id, text, completed }).
remove: Callback to handle removing the item.
toggle: Callback to handle toggling the item's completion state.
Rendering:
Creates a virtual DOM element (<li>) with:
<span> for the task text (strikethrough applied if completed).
"Toggle" button to switch the completion state.
"Remove" button to delete the task.

### TODO
1. Add error boundaries or fallback UI for handling unexpected errors.
2. Implement unit tests for core classes like Store, Router, and EventSystem.
3. Enhance accessibility by adding ARIA attributes to rendered elements.
4. Optimize performance by minimizing unnecessary DOM updates (e.g., diffing algorithm).

