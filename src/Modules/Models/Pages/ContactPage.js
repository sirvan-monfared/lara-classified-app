import { Page } from "../Page";

export class ContactPage extends Page {
    afterRender() {
        console.log('this is contact...');
    }
}