import { App } from "../App";
import { Loading } from "../Utils/Loading";

export class Page {
    constructor(route, template) {
        this.route = route;
        this.template = template;
    }

    render(appContainer, data) {
        Loading.show();
        window.scrollTo({top: 0, behavior: 'smooth'});

        if (this.restrictOnAuth() && App.getAuth().check()) {
            App.getRouter().navigateTo('home');
            
            return;
        }

        if (this.shouldBeLoggedIn() && ! App.getAuth().check()) {
            App.getRouter().navigateTo('login');

            return;
        }
        
        fetch(`./pages/${this.template}`)
        .then(response => response.text())
        .then(html => {

            this.prepareForRender(html, data).then(result => {
                appContainer.innerHTML = result;

                this.afterRender(data);
                Loading.hide();
            });

        })
    }

    async prepareForRender(html) {
        return html;
    }

    afterRender() {
        
    }

    restrictOnAuth() {
        return  false;
    }

    shouldBeLoggedIn() {
        return false;
    }
}