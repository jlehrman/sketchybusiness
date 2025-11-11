import { Component, signal } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { inject } from '@angular/core';
import { HttpClient, HttpParams, HttpParameterCodec } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'login-form',
    template: `
    <form [formGroup]="loginForm" (ngSubmit)="submit()">
      
    <input type="text" formControlName="usernameEmail" /> 
      <input type="password" formControlName="password" />
      <button type="submit" [disabled]="!loginForm.valid">Submit</button>
    </form>
    <span>Dont have an account yet? <a routerLink="/signup">Sign Up</a><span>

    <h2>Profile Form</h2>
    <p>Username: {{ loginForm.value.usernameEmail }}</p>
    <p>Password: {{ loginForm.value.password}}</p>
  `,
    styleUrl: './app.css',
    imports: [ReactiveFormsModule, RouterModule],

})
export class LoginForm {
    loginForm = new FormGroup({
        usernameEmail: new FormControl('', [Validators.required]),
        password: new FormControl('', Validators.required),
    });

    private http = inject(HttpClient);

    submit() {
        alert(this.loginForm.value.usernameEmail);
        this.http.post('http://localhost:8080/login', {usernameEmail: this.loginForm.value.usernameEmail, password:this.loginForm.value.password})
            .subscribe({
                next: (response) => console.log('Success:', response),
                error: (err) => console.error('Error:', err),
            });
    }
}
@Component({
    selector: 'login-page',
    template: `
    <login-form />
    <nav>
      <a href="/about">About Us</a>
    </nav>`,
    styleUrl: './app.css',
    imports: [LoginForm],

})
export class LoginPage {
}