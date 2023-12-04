import axios from "axios";
import { Ad } from "./Ad";
import { baseUrl } from "../Utils/Options";
import { App } from "../App";

export class UserAdsList {
    constructor() {
        this.ads = [];
    }

    async loadAds() {
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
        return axios.get(`${baseUrl}/account/listing`, {
            headers: {
                Authorization: App.getAuth().authorizationToken()
            }
        });
    }

    async delete(id) {
        return axios.delete(`${baseUrl}/account/listing/${id}`, {
            headers: {
                Authorization: App.getAuth().authorizationToken()
            }
        })
    }
}