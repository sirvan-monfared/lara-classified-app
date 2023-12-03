import { RegisterSubmitForm } from "../../Utils/RegisterSubmitForm";
import { Page } from "../Page";

export class RegisterPage extends Page {
    async prepareForRender(pageContent) {
        return pageContent;
    }

    afterRender() {
        const form = new RegisterSubmitForm();

        form.submit();
    }
}