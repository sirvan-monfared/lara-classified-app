import axios from "axios";
import { Ad } from "./Ad";
import { baseUrl } from "../Utils/Options";

export class AdsList {
    constructor() {
        this.ads = [];

        this.filters = {
            keyword: null,
            category: null,
            location: null,
            sort: 'default'
        }
    }

    async loadAds() {

        if (this.ads.length > 0) {
            return this.ads;
        }

        const {data: result} = await this.fetch();

        result.data.forEach(item => {
            this.ads.push(new Ad(item))
        })

        return this.ads;
    }

    find(id) {
        return this.ads.find(item => +item.id === +id)
    }

    fetch() {
        let queryString = "";
        for(let filter in this.filters) {

            if (! this.filters[filter]) continue;

            queryString += `${filter}=${this.filters[filter]}&`;
        }

        return axios.get(`${baseUrl}/ads?${queryString}`);
    }
}