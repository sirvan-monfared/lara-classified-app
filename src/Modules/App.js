import { Classified } from "./Classified";

export class App {

    static init() {
        this.classified = new Classified();
    }

    static getAppContainer() {
        return this.classified.appContainer;
    }

    
    static getRouter() {
        return this.classified.router;
    }
}