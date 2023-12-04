import { App } from "../../App";
import { SubmitForm } from "../../Utils/SubmitForm";
import { Page } from "../Page";

export class SubmitPage extends Page {

    shouldBeLoggedIn() {
        return true;
    }

    async prepareForRender(pageContent) {
        const pageDom = document.createElement('div');
        pageDom.innerHTML = pageContent;

        await Promise.all([
            App.getCategoryList().list(),
            App.getLocationList().list()
        ])

        this._prepareSelectOptions(pageDom);

        return pageDom.innerHTML;
    }

    afterRender() {
        const form = new SubmitForm();
        form.submit();
        
    }

    _prepareSelectOptions(pageDom) {
        const categoriesElm = pageDom.querySelector('#category');
        const locationsElm = pageDom.querySelector('#location');

        App.getCategoryList().renderTo(categoriesElm);
        App.getCategoryList().renderTo(locationsElm);
    }
}