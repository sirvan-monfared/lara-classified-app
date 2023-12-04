import { App } from "../../App";
import { Loading } from "../../Utils/Loading";
import { Page } from "../Page";
import { UserAdsList } from "../UserAdsList";

export class DashboardPage extends Page {

    shouldBeLoggedIn() {
        return true;
    }

    async prepareForRender(pageContent) {
        const pageDom = document.createElement('div');
        pageDom.innerHTML = pageContent;
        
        const ads = await (new UserAdsList()).loadAds();
        
        const wrapper = pageDom.querySelector("#dashboard-list");

        ads.forEach(ad => {
            wrapper.append(ad.render(true));
        })

        this._prepareDOM(pageDom, ads);


        return pageDom.innerHTML;
    }

    afterRender() {
        this._handleDeleteAds();
        this._handleLogout();
    }

    _handleDeleteAds() {
        const deleteBtns = document.querySelectorAll('.item-delete');
        
        deleteBtns.forEach(btn => {
            btn.addEventListener('click', (event) => {
                const adId = event.currentTarget.getAttribute('data-item-id');

                const conf = confirm("آیا از حذف این آگهی مطمئن هستید؟");

                if(! conf) {
                    return;
                }

                Loading.show();

                new UserAdsList().delete(adId).then(() => {
                    btn.closest('.listing-item').remove();
                    Loading.hide();
                }) 
            })
        })
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

    _prepareDOM(pageDom, ads) {
        const messageBox = pageDom.querySelector("#no-result");

        if (ads.length > 0) {
            messageBox.classList.add('hidden');
        } else {
            messageBox.classList.remove('hidden');
        }

        pageDom.querySelector('#dashboard-user').textContent = App.getAuth().user;
        pageDom.querySelector('#dashboard-ads-count').textContent = ads.length;
    }
}