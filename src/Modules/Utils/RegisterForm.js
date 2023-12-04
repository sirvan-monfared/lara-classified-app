import axios from "axios";
import {baseUrl} from "./Options";
import { App } from "../App";
import { Loading } from "./Loading";
import { Form } from "./Form";

export class RegisterForm extends Form {
    constructor() {
        super();

        this.form = document.getElementById('register-form');
        this.submitBtn = document.getElementById('register-submit');
    }


    async submitForm(event) {
        event.preventDefault();

        this.validate();

        if (this.failed()) {
            this.showValidationErrors();

            return;
        }

        Loading.show();
        try {
            await this.sendFormData();

            this.showSuccessToast("ثبت نام شما با موفقیت انجام شد");

            Loading.hide();

            App.getRouter().navigateTo('login');
        } catch(e) {
            Loading.hide();
            const errors = e.response.data.errors;

            for(let error in errors) {
                this.showErrorToast(errors[error][0])
            }
        }
    }

    sendFormData() {
        const params = {
            "name": this.form.querySelector('#name').value,
            "email": this.form.querySelector('#email').value,
            "phone": this.form.querySelector('#phone').value,
            "password": this.form.querySelector('#password').value,
            "password_confirmation": this.form.querySelector('#password_confirmation').value
        }

        return axios.post(`${baseUrl}/register`, params);
    }
}