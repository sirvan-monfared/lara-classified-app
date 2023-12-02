import { Router } from "./Router";
import pages from "../routes";

export class Classified {
    constructor() {
        this.appContainer = document.getElementById('app');

        const routes = pages;

        this.router = new Router(routes, this); 

        this.handleNavigationLinks();
        this.handleHistory();
        this.handleFirstPage();
    }

    handleNavigationLinks() {
        document.addEventListener('click', (event) => {
            event.preventDefault();
        
            if (event.target.tagName === 'A') {
                const target = event.target.getAttribute('href').substring(1);
                
                this.router.navigateTo(target);
            }
        })
    }

    handleHistory() {
        window.addEventListener('popstate', (event) => {
            const target = event.state ? event.state.route : 'home';
            this.router.navigateTo(target);
        })
    }

    handleFirstPage() {
        this.router.navigateTo('home');
    }

    getAppContainer() {
        return this.appContainer;
    }
}