import { App } from "./App";

export class Router {
    constructor(pages, app) {
        this.pages = pages;
        this.app = app;
    }

    navigateTo(route, data = null) {
        const page = this.pages.find(item => item.route === route);

        if (page) {
            page.render(this.app.getAppContainer(), data);
            history.pushState({ route: route }, '', route);
        }
    }
}
