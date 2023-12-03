import axios from "axios";
import {baseUrl} from "./Options";
import Toastify from "toastify-js";
import { App } from "../App";
import { Loading } from "./Loading";

export class RegisterSubmitForm {
    constructor() {
        this.form = document.getElementById('register-form');
        this.submitBtn = document.getElementById('register-submit');

        this._errors = [];
    }

    submit() {
        this.submitBtn.addEventListener('click', this.submitForm.bind(this));
    }

    async submitForm(event) {
        event.preventDefault();

        this.validate();

        if (this.failed()) {
            this.errors().forEach(error => {
                this.showErrorToast(error);
            })

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

    errors() {
        return this._errors;
    }

    failed() {
        return this._errors.length > 0;
    }

    validate() {
        this.clearErrors();
        
        const inputs = this.form.querySelectorAll('input');

        inputs.forEach(input => {
            if (! input.value.trim()) {
                this.addError(`field ${input.name} is required`);
            }
        })
    }

    addError(message) {
        this._errors.push(message);
    }

    clearErrors() {
        this._errors = [];
    }

    showErrorToast(message) {
        Toastify({
            text: message,
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right", 
            stopOnFocus: true, 
            style: {
              background: "#bb4141",
            }
          }).showToast();
    }

    showSuccessToast(message) {
        Toastify({
            text: message,
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right", 
            stopOnFocus: true, 
            style: {
              background: "#3aa43e",
            }
          }).showToast();
    }
}