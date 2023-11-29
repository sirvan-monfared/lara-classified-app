import { Page } from "../Page";

export class AboutPage extends Page {
    afterRender() {
        console.log('this is about...');
    }
}