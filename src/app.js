import {App} from './Modules/App';
import { Router } from './Modules/Router';
import pages from './routes';

const app = new App();

const routes = pages;

const router = new Router(routes, app);


document.addEventListener('click', (event) => {
    event.preventDefault();

    if (event.target.tagName === 'A') {
        const target = event.target.getAttribute('href').substring(1);
        
        router.navigateTo(target);
    }
})

window.addEventListener('popstate', (event) => {
    const target = event.state ? event.state.route : 'home';
    router.navigateTo(target);
})