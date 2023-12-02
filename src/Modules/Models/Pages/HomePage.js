import { Page } from "../Page";

export class HomePage extends Page {


    async prepareForRender(pageContent) {

        
        return pageContent;
    }

    afterRender() {
        console.log('this is home...');
    }
}