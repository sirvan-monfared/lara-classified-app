import axios from "axios";
import { Ad } from "./Ad";

export class AdsList {
    constructor() {
        this.ads = [];
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
        return axios.get(`https://js-course-api.test/api/v1/ads`);
    }
}