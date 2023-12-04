import axios from "axios";
import { baseUrl } from "../Utils/Options";

export class LocationList {
    constructor() {
        this.locations = [];
    }

    async list() {
        if (this.locations.length > 0) {
            return this.locations;
        }

        return this.loadLocations();
    }

    async loadLocations() {
        const {data: result} = await axios.get(`${baseUrl}/locations`);

        this.locations = result.data;

        return this.locations;
    }

    renderTo(targetElm) {
        this.locations.forEach(item => {
            const option = document.createElement('option');
            option.value = item.id;
            option.innerText = item.title;
            
            targetElm.append(option);
        })
    }
}