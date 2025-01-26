class Element {
    /**
     * Initializes a new custom element.
     * @param {string} tag - The type of HTML tag (e.g., 'div', 'p').
     * @param {Object} [attrs={}] - Key-value pairs for HTML attributes (e.g., { class: "container" }).
     * @param {Array} [children=[]] - A list of child elements or plain text.
     */
    constructor(tag, attrs = {}, children = []) {
        this.tag = tag; // HTML tag for this element
        this.attrs = attrs; // Attributes for this element
        this.children = children; // Child elements or text nodes
    }

    /**
     * Creates and returns the actual DOM node.
     * @returns {HTMLElement} - The created DOM element with all its children.
     */
    render() {
        // Create a new DOM element based on the provided tag.
        const el = document.createElement(this.tag);

        // Assign attributes to the element.
        for (const [key, value] of Object.entries(this.attrs)) {
            el.setAttribute(key, value);
        }

        // Add each child to the created element.
        this.children.forEach((child) => {
            if (child instanceof Element) {
                // If the child is an Element instance, render it recursively.
                el.appendChild(child.render());
            } else {
                // If the child is plain text, create a text node.
                el.appendChild(document.createTextNode(child));
            }
        });

        return el; // Return the fully constructed element.
    }
}

/**
 * Converts a custom Element instance into a DOM node.
 * @param {Element} element - The custom Element instance.
 * @returns {Node} - A DOM node created from the Element.
 */
function renderElement(element) {
    // Ensure the input is an Element; otherwise, log an error.
    if (!(element instanceof Element)) {
        console.error('renderElement expects an instance of Element:', element);
        return document.createTextNode(''); // Fallback to an empty text node.
    }
    return element.render(); // Use the Element's render method.
}

/**
 * Adds a component to a specific container in the DOM.
 * @param {Element} component - The custom Element to be added.
 * @param {string} containerId - The ID of the DOM element where the component should be added.
 */
function renderComponent(component, containerId) {
    // Find the container in the DOM using its ID.
    const container = document.getElementById(containerId);

    if (!container) {
        // If the container doesn't exist, show an error message.
        console.error(`No container found with id "${containerId}".`);
        return;
    }

    // Clear any existing content inside the container.
    container.innerHTML = '';

    // Render the component and add it to the container.
    container.appendChild(renderElement(component));
}

// Exporting the Element class and the utility functions for use in other files.
export { Element, renderElement, renderComponent };
