const root = '#/';

const routes = {
    404: '/static/views/404.html',
    '#/': '/static/views/home.html',
    '#/about': '/static/views/about.html',
    '#/contact': '/static/views/contact.html'
};

async function hashchange() {
    let hash = window.location.hash;
    if (!hash) {
        window.location = `/${root}`;
    }
    const route = routes[hash] || routes[404];
    const text = await fetch(route).then((response) => response.text());
    document.querySelector('main').innerHTML = text;
}

window.addEventListener('hashchange', hashchange);
hashchange();
