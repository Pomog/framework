// Class for managing application routes
class Router {

    constructor(routes) {
        this.routes = routes; // Array of route definitions
        this.loadInitialRoute(); // Load the initial route on instantiation
    }

    // Method to load a route based on URL segments
    loadRoute(...urlSegments) {
        const matchedRoute = this.matchUrlToRoute(urlSegments); // Find the matching route
        window.history.pushState({}, 'page', `/${urlSegments.join('/')}`); // Update the browser history
        const routerOutElement = document.querySelector('[data-router]'); // Get the router output element
        routerOutElement.innerHTML = ''; // Clear existing content
        routerOutElement.appendChild(matchedRoute.component.render()); // Render and append the component for the matched route
    }

    // Method to match URL segments to a route
    matchUrlToRoute(urlSegments) {
        return this.routes.find(route => route.path === `/${urlSegments.join('/')}`) || this.routes[0]; // Find the matching route or return the default
    }

    // Method to load the initial route based on the current URL
    loadInitialRoute() {
        const pathnameSplit = window.location.pathname.split('/'); // Split the URL path into segments
        const pathSegments = pathnameSplit.length > 1 ? pathnameSplit.slice(1) : ''; // Get the path segments
        this.loadRoute(...pathSegments); // Load the route based on the segments
    }

}

export { Router }; 
