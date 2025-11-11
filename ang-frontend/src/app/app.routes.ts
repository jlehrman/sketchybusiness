import { Routes } from '@angular/router';
import { LoginPage } from './loginpage';
import { AboutPage } from './aboutpage';
export const routes: Routes = [
    {path: '', component: LoginPage},
    {path: 'about', component: AboutPage},
];
