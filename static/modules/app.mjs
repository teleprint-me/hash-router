/* /home/blackbox/git/hash-router/static/modules/app.mjs */
import { HashRouter } from './hash-router.mjs';

const main = async () => {
    const routes = {
        404: {
            path: '/static/views/404.html'
        },
        '/': {
            path: '/static/views/profile.html'
        },
        '/portfolio': {
            path: '/static/views/portfolio.html'
        },
        '/contact': {
            path: '/static/views/contact.html'
        }
    };

    const router = new HashRouter('#app', routes);

    // Initialize the router using router id as the container
    router.init('#router');
};

document.addEventListener('DOMContentLoaded', main);
