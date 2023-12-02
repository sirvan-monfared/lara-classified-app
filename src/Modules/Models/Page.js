export class Page {
    constructor(route, template) {
        this.route = route;
        this.template = template;
    }

    render(appContainer) {
        
        fetch(`./pages/${this.template}`)
        .then(response => response.text())
        .then(html => {

            this.prepareForRender(html).then(result => {
                appContainer.innerHTML = result;

                this.afterRender();
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