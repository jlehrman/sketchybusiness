import { Routes } from '@angular/router';
import { LoginPage } from './loginpage';
import { AboutPage } from './aboutpage';
import { SignupPage } from './signuppage';
export const routes: Routes = [
    {path: '', component: LoginPage},
    {path: 'about', component: AboutPage},
    {path: 'signup', component: SignupPage},
];
