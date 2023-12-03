import { Loading } from "../Utils/Loading";

export class Page {
    constructor(route, template) {
        this.route = route;
        this.template = template;
    }

    render(appContainer, data) {
        Loading.show();
        window.scrollTo({top: 0, behavior: 'smooth'});
        
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
        console.log('this is default message');
    }
}