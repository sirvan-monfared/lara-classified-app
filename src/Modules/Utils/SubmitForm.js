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

        this.validate();

        if (this.failed()) {
            this.showValidationErrors();

            return;
        }

        Loading.show();
        try {
            const {data: result} = await this.sendFormData();
            console.log(result);

            this.showSuccessToast("ثبت آگهی شما با موفقیت انجام شد");

            Loading.hide();

            App.getRouter().navigateTo('dashboard');
        } catch(e) {
            Loading.hide();
            const errors = e.response.data.errors;

            for(let error in errors) {
                this.showErrorToast(errors[error][0])
            }
        }
    }

    validate() {
        this.clearErrors();

        const inputs = this.form.querySelectorAll('input');
        const selects = this.form.querySelectorAll('select');
        const textareas = this.form.querySelectorAll('textarea');

        inputs.forEach(input => {
            if (! input.value.trim() && input.type !== 'file') {
                this.addError(`وارد کردن ${input.getAttribute('data-title')} ضروری است`);
            }
        })

        selects.forEach(select => {
            if (! select.value.trim() || select.value === 'any') {
                this.addError(`انتخاب کردن ${select.getAttribute('data-title')} ضروری است`);
            }
        })

        textareas.forEach(input => {
            if (! input.value.trim()) {
                this.addError(`وارد کردن ${input.getAttribute('data-title')} ضروری است`);
            }
        })
    }

    async sendFormData() {
        const formData = new FormData();

        formData.append('title', this.form.querySelector('#title').value);
        formData.append('category_id', this.form.querySelector('#category').value);
        formData.append('location_id', this.form.querySelector('#location').value);
        formData.append('price', this.form.querySelector('#price').value);
        formData.append('link', this.form.querySelector('#link').value);
        formData.append('description', this.form.querySelector('#description').value);

        return axios.post(`${baseUrl}/account/submit`, formData, {
            headers: {
                Authorization: App.getAuth().authorizationToken()
            }
        })
    }
}