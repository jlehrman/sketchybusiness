import { Component, signal } from '@angular/core';


@Component({
  selector: 'login-form',
  template: '<form>',
  styleUrl: './app.css',
  imports: [],

})
export class LoginForm {

}
@Component({
  selector: 'login-page',
  template: `
    <nav>
      <a href="/about">About Us</a>
    </nav>`,
  styleUrl: './app.css',
  imports: [],

})
export class LoginPage {
}