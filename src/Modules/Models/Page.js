export class Page {
    constructor(route, template) {
        this.route = route;
        this.template = template;
    }

    render(appContainer) {
        fetch(`./pages/${this.template}`)
        .then(response => response.text())
        .then(html => {
            appContainer.innerHTML = html;

            this.afterRender();
        })
    }

    afterRender() {
        console.log('this is default message');
    }
}