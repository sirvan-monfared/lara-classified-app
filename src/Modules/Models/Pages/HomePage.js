import { Page } from "../Page";
import { App } from "../../App";

export class HomePage extends Page {


    async prepareForRender(pageContent) {

        const pageDom = document.createElement('div');
        pageDom.innerHTML = pageContent;

        const ads = await App.getAdsList().loadAds();

        const listWrapper = pageDom.querySelector("#home-list");
        
        ads.forEach(ad => {
            listWrapper.append(ad.render());
        });
        
        return pageDom.innerHTML;
    }
}