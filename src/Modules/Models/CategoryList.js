import axios from "axios";
import { baseUrl } from "../Utils/Options";

export class CategoryList {
    constructor() {
        this.categories = [];
    }

    async list() {
        if (this.categories.length > 0) {
            return this.categories;
        }

        return this.loadCategories();
    }

    async loadCategories() {
        const {data: result} = await axios.get(`${baseUrl}/categories`);

        this.categories = result.data;

        return this.categories;
    }

    renderTo(targetElm) {
        this.categories.forEach(item => {
            const option = document.createElement('option');
            option.value = item.id;
            option.innerText = item.title;
            
            targetElm.append(option);
        })
    }
}