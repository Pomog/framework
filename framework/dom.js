// Class representing a DOM element
class Element {

    // Constructor to initialize an Element
    constructor(tag, attrs = {}, children = []) {
        this.tag = tag; // HTML tag (e.g., 'div', 'span')
        this.attrs = attrs; // Object containing attributes for the element
        this.children = children; // Array of child elements or text nodes
    }

    // Render method to create and return a DOM element
    render() {
        const el = document.createElement(this.tag); // Create the element using the tag

        // Set attributes on the created element
        for (const attr in this.attrs) {
            el.setAttribute(attr, this.attrs[attr]);
        }

        // Append child elements or text nodes
        this.children.forEach(child => {
            if (child instanceof Element) {
                el.appendChild(child.render()); // Render child if it's an Element
            } else {
                el.appendChild(document.createTextNode(child)); // Create and append text node
            }
        });

        return el; // Return the created element
    }
}

// Function to render an Element instance
function renderElement(element) {
    if (!(element instanceof Element)) {
        console.error('Invalid element passed to renderElement:', element); // Log error if not an Element
        return document.createTextNode(''); // Return an empty text node if invalid
    }
    return element.render(); // Render the valid Element
}

// Function to render a component into a specified container
function renderComponent(component, containerId) {
    const container = document.getElementById(containerId); // Get the container element by ID

    if (!container) {
        console.error(`Container with id "${containerId}" not found.`); // Log error if container is not found
        return;
    }

    container.innerHTML = ''; // Clear any existing content in the container
    container.appendChild(renderElement(component)); // Render and append the component
}

export { Element, renderElement, renderComponent }; // Export the classes and functions for use elsewhere

