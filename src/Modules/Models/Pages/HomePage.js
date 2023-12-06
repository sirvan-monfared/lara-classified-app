import { Page } from "../Page";
import { App } from "../../App";
import { Loading } from "../../Utils/Loading";

export class HomePage extends Page {


    async prepareForRender(pageContent) {

        const pageDom = document.createElement('div');
        pageDom.innerHTML = pageContent;

        const [ads] = await Promise.all([
            App.getAdsList().list(),
            App.getCategoryList().list(),
            App.getLocationList().list()
        ])

        this._prepareFilterInputs(pageDom);
        this._preapreAds(pageDom, ads);
        
        return pageDom.innerHTML;
    }

    afterRender() {
        this._handleFilterForm();
        this._handleSort();
    }

    _handleSort() {
        const sortElm = document.getElementById('sort-select');

        sortElm.addEventListener('change', (event) => {
            App.getAdsList().setFilter('sort', sortElm.value);

            Loading.show();
            App.getAdsList().loadAds().then((ads) => {
                this._preapreAds(document, ads);
                Loading.hide();
            })
        })
    }

    _handleFilterForm() {
        const form = document.getElementById('filter-form');
        const submitBtn = document.getElementById('filter-form-submit');

        const keywordElm = document.getElementById('keyword');
        const categoryElm = document.getElementById('category');
        const locationElm = document.getElementById('location');

        submitBtn.addEventListener('click', () => {
            App.getAdsList().setFilters(keywordElm.value, categoryElm.value, locationElm.value);

            Loading.show();
            App.getAdsList().loadAds().then((ads) => {
                
                this._preapreAds(document, ads);
                Loading.hide();
            })
        })
    }

    _prepareFilterInputs(pageDom) {

        const keywordElm = pageDom.querySelector("#keyword");
        const categoriesElm = pageDom.querySelector('#category');
        const locationsElm = pageDom.querySelector('#location');

        const adsList = App.getAdsList();

        if (adsList.getFilter('keyword')) {
            keywordElm.setAttribute('value', adsList.getFilter('keyword'));
        }


        App.getCategoryList().renderTo(categoriesElm, adsList.getFilter('category'));
        App.getLocationList().renderTo(locationsElm, adsList.getFilter('location'));
    }

    _preapreAds(pageDom, ads) {
        const listWrapper = pageDom.querySelector("#home-list");
        
        listWrapper.innerHTML = '';

        ads.forEach(ad => {
            listWrapper.append(ad.render());
        });
    }
}