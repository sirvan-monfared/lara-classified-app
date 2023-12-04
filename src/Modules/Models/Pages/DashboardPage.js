import { App } from "../../App";
import { Loading } from "../../Utils/Loading";
import { Page } from "../Page";

export class DashboardPage extends Page {

    shouldBeLoggedIn() {
        return true;
    }

    async prepareForRender(pageContent) {
        const pageDom = document.createElement('div');
        pageDom.innerHTML = pageContent;
        

        pageDom.querySelector('#dashboard-user').textContent = App.getAuth().user;

        return pageDom.innerHTML;
    }

    afterRender() {
        this._handleLogout();
    }

    _handleLogout() {
        const logoutBtn = document.getElementById('dashboard-logout');

        
        logoutBtn.addEventListener('click', () => {
            Loading.show();
            App.getAuth().logout().then(() => {
                Loading.hide();
                App.getRouter().navigateTo('home');
            }).catch(() => {
                Loading.hide();
            });
        })
    }
}