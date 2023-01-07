/* /home/blackbox/git/hash-router/static/modules/hash-router.mjs */
import { AsyncRequest } from './async-request.mjs';

class HashRouter {
    constructor(selector, routes = {}) {
        this.selector = selector;
        this.routes = routes;
        window.addEventListener('hashchange', this.handleRoute.bind(this));
    }

    async handleRoute() {
        let hash = window.location.hash.substring(1);
        let route = this.routes[hash];
        if (route) {
            const request = new AsyncRequest();
            const html = await request.get(route);
            document.querySelector(this.selector).innerHTML = html;
        }
    }

    addRoute(hash, path) {
        this.routes[hash] = path;
    }

    init(selector) {
        const click = this.handleRoute.bind(this);
        const element = document.querySelector(selector);
        const anchors = element.querySelectorAll('a');

        for (let a of anchors) {
            if (a.getAttribute('data-route')) {
                a.addEventListener('click', click);
            }
        }

        window.addEventListener('hashchange', click);
        this.handleRoute();
    }
}

export { HashRouter };
