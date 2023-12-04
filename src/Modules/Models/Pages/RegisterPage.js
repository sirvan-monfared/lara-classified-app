import { RegisterForm } from "../../Utils/RegisterForm";
import { Page } from "../Page";

export class RegisterPage extends Page {
    async prepareForRender(pageContent) {
        return pageContent;
    }

    afterRender() {
        const form = new RegisterForm();

        form.submit();
    }
}