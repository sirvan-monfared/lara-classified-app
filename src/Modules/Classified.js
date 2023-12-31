import { Router } from "./Router";
import pages from "../routes";
import { AdsList } from "./Models/AdsList";
import { Auth } from "./Models/Auth";
import { CategoryList } from "./Models/CategoryList";
import { LocationList } from "./Models/LocationList";

export class Classified {
    constructor() {
        this.appContainer = document.getElementById('app');

        this.initiateApp();
        this.initiateRouter();
    }

    initiateApp() {
        this.adsList = new AdsList();
        this.auth = new Auth();
        this.categoryList = new CategoryList();
        this.locationList = new LocationList();
    }

    initiateRouter() {
        const routes = pages;

        this.router = new Router(routes, this); 

        this.handleNavigationLinks();
        this.handleHistory();
        this.handleFirstPage();
    }

    handleNavigationLinks() {
        document.addEventListener('click', (event) => {

            if (event.target.tagName === 'INPUT') {
                return;
            }

            event.preventDefault();

            let link = null;
            if (event.target.tagName === 'IMG' || event.target.tagName === 'I') {
                link = event.target.closest('a');
            }
        
            if (event.target.tagName === 'A' && event.target.getAttribute('href')) {
                link = event.target;
            }

            if (! link) {
                return;
            }
            
            this.router.navigateTo(
                link.getAttribute('href').substring(1),
                link.getAttribute('data-item-id')
            );
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