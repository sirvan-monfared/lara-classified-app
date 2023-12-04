import { Classified } from "./Classified";
import axios from "axios";

export class App {

    static init() {
        axios.defaults.headers.common['Accept'] = 'application/json';
        axios.defaults.headers.common['X-Laraplus-Identify'] = '9ab79533-1103-4804-88e7-b2910cbbcc44';

        this.classified = new Classified();
    }

    static getAdsList() {
        return this.classified.adsList;
    }

    static getAppContainer() {
        return this.classified.appContainer;
    }

    
    static getRouter() {
        return this.classified.router;
    }

    static getAuth() {
        return this.classified.auth;
    }
}