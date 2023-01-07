/* /home/blackbox/git/hash-router/tests/hash-router.test.mjs */
import { AsyncRequest } from '../static/modules/async-request.mjs';
import { HashRouter } from '../static/modules/hash-router.mjs';

const routes = {
    404: '/static/views/404.html',
    '/': '/static/views/profile.html',
    '/portfolio': '/static/views/portfolio.html',
    '/contact': '/static/views/contact.html'
};

const router = new HashRouter('#test-view-onhashchange', routes);
router.init('.router');

const attachTestResult = (selector, result, message) => {
    const block = document.querySelector(selector);
    const res = document.createElement('span');
    const mes = document.createElement('span');
    if (result) {
        res.style = 'color: var(--success)';
    } else {
        res.style = 'color: var(--danger)';
    }
    res.innerText = result;
    mes.innerText = message;
    block.appendChild(res);
    block.appendChild(mes);
};

const testRouteChanges = () => {
    const expectedRoute = '/portfolio';
    window.location.hash = expectedRoute;
    const currentRoute = window.location.hash.substring(1);
    const result = expectedRoute === currentRoute;
    const message = `Route changes to ${expectedRoute}`;
    console.assert(result, message);
    attachTestResult('#test-route-onhashchange', result, message);
};

const testContentInjection = async () => {
    const expectedRoute = '/portfolio';
    window.location.hash = expectedRoute;
    const request = new AsyncRequest();
    const html = await request.get(routes[expectedRoute]);
    const result = typeof html === 'string';
    console.log(result);
    const message = `Content injection for ${expectedRoute}`;
    console.assert(result, message);
    attachTestResult('#test-view-onhashchange', result, message);
};

testRouteChanges();
testContentInjection();
