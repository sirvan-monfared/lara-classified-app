import { DashboardPage } from "./Modules/Models/Pages/DashboardPage";
import { HomePage } from "./Modules/Models/Pages/HomePage";
import { LoginPage } from "./Modules/Models/Pages/LoginPage";
import { RegisterPage } from "./Modules/Models/Pages/RegisterPage";
import { SinglePage } from "./Modules/Models/Pages/SinglePage";

export default [
    new HomePage('home', 'home.html'),
    new SinglePage('single', 'single.html'),
    new RegisterPage('register', 'register.html'),
    new LoginPage('login', 'login.html'),
    new DashboardPage('dashboard', 'dashboard.html')
];