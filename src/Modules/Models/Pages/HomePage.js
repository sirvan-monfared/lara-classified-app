import { Page } from "../Page";
import { App } from "../../App";

export class HomePage extends Page {


    async prepareForRender(pageContent) {

        const pageDom = document.createElement('div');
        pageDom.innerHTML = pageContent;

        const [ads] = await Promise.all([
            App.getAdsList().loadAds(),
            App.getCategoryList().list(),
            App.getLocationList().list()
        ])

        this._prepareFilterInputs(pageDom);
        this._preapreAds(pageDom, ads);
        
        return pageDom.innerHTML;
    }

    _prepareFilterInputs(pageDom) {
        const categoriesElm = pageDom.querySelector('#category');
        const locationsElm = pageDom.querySelector('#location');

        App.getCategoryList().renderTo(categoriesElm);
        App.getLocationList().renderTo(locationsElm);
    }

    _preapreAds(pageDom, ads) {
        const listWrapper = pageDom.querySelector("#home-list");
        
        ads.forEach(ad => {
            listWrapper.append(ad.render());
        });
    }
}