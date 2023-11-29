import { Page } from "../Page";

export class HomePage extends Page {
    afterRender() {
        console.log('this is home...');
    }
}