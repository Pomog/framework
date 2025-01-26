// A simple Router class to manage client-side application routes
class Router {
    /**
     * Creates a Router instance with defined routes and initializes the first route.
     * @param {Array} routes - An array of route definitions, where each route contains a path and a component.
     */
    constructor(routes) {
        this.routes = routes; // Stores the routes passed to the Router.
        this.loadInitialRoute(); // Automatically loads the initial route on creation.
    }

    /**
     * Loads a specific route based on provided URL segments.
     * Updates the browser's history and renders the associated component.
     * @param {...string} urlSegments - URL segments that specify the route to load.
     */
    loadRoute(...urlSegments) {
        // Find the route that matches the provided URL segments.
        const matchedRoute = this.matchUrlToRoute(urlSegments);

        // Update the browser's address bar without reloading the page.
        window.history.pushState({}, 'page', `/${urlSegments.join('/')}`);

        // Get the element designated for dynamic route content.
        const routerOutElement = document.querySelector('[data-router]');

        if (!routerOutElement) {
            console.error('No element found with data-router attribute for rendering route content.');
            return;
        }

        // Clear any existing content inside the router output element.
        routerOutElement.innerHTML = '';

        // Render the component for the matched route and append it to the output element.
        routerOutElement.appendChild(matchedRoute.component.render());
    }

    /**
     * Matches the provided URL segments to one of the defined routes.
     * If no route matches, the default route (first route) is returned.
     * @param {Array} urlSegments - URL segments used to match a route.
     * @returns {Object} The matched route or the default route if no match is found.
     */
    matchUrlToRoute(urlSegments) {
        return (
            this.routes.find((route) => route.path === `/${urlSegments.join('/')}`) ||
            this.routes[0] // Return the first route as the default if no match is found.
        );
    }

    /**
     * Loads the initial route based on the current URL when the application starts.
     * Uses the browser's current pathname to determine which route to display.
     */
    loadInitialRoute() {
        // Split the current URL path into individual segments.
        const pathnameSplit = window.location.pathname.split('/');

        // Extract relevant path segments, ignoring the first empty element caused by the leading slash.
        const pathSegments = pathnameSplit.length > 1 ? pathnameSplit.slice(1) : '';

        // Load the route corresponding to the current URL.
        this.loadRoute(...pathSegments);
    }
}

export { Router }; // Export the Router class for use in other parts of the application.