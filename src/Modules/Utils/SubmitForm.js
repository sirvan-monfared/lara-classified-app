import axios from "axios";
import {baseUrl} from "./Options";
import { Loading } from "./Loading";
import { Form } from "./Form";
import { App } from "../App";

export class SubmitForm extends Form {
    constructor() {
        super();

        this.form = document.getElementById('submit-form');
        this.submitBtn = document.getElementById('submit-button');
    }


    async submitForm(event) {
        event.preventDefault();

    }

    sendFormData() {
        
    }
}