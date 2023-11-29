export class Router {
    constructor(pages, app) {
        this.pages = pages;
        this.app = app;
    }

    navigateTo(route) {
        const page = this.pages.find(item => item.route === route);

        if (page) {
            page.render(this.app.getAppContainer());
            history.pushState({ route: route }, '', route);
        }
    }
}
