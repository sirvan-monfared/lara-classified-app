import { LoginForm } from "../../Utils/LoginForm";
import { Page } from "../Page";

export class LoginPage extends Page {

    restrictOnAuth() {
        return true;
    }


    async prepareForRender(pageContent) {
        return pageContent;
    }

    afterRender() {
        const form = new LoginForm();

        form.submit();
    }
}