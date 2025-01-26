import { Element } from '../../framework/dom.js'; // Import the Element class for virtual DOM manipulation

// Class representing a single todo item in the list
export class TodoItem {
    /**
     * Constructs a new TodoItem instance.
     *
     * @param {Object} todo - The data object for the todo item (contains text and completed status).
     * @param {Function} remove - Callback function to handle removing this todo item.
     * @param {Function} toggle - Callback function to toggle the completion state of this todo item.
     */
    constructor(todo, remove, toggle) {
        this.todo = todo; // Store the todo item data (e.g., { text: 'Task name', completed: true/false })
        this.remove = remove; // Store the function to remove the todo item
        this.toggle = toggle; // Store the function to toggle the completion state of the todo item
    }

    /**
     * Creates the virtual DOM structure for this todo item.
     *
     * @returns {Element} - A virtual DOM element representing this todo item.
     */
    render() {
        return new Element(
            'li', // The main container tag for the todo item
            {}, // Attributes for the <li> element (empty in this case)
            [
                // Child elements inside the <li>
                new Element(
                    'span',
                    {
                        // If the todo is marked as completed, apply a line-through style
                        style: this.todo.completed ? 'text-decoration: line-through;' : ''
                    },
                    [this.todo.text] // The visible text of the todo item
                ),
                new Element(
                    'button',
                    {
                        onclick: () => this.toggle(this.todo.id) // Call the toggle function when this button is clicked
                    },
                    ['Toggle'] // Button label
                ),
                new Element(
                    'button',
                    {
                        onclick: () => this.remove(this.todo.id) // Call the remove function when this button is clicked
                    },
                    ['Remove'] // Button label
                )
            ]
        );
    }
}
