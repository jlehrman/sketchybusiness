import { Component, signal } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { inject } from '@angular/core';
import { HttpClient, HttpParams, HttpParameterCodec } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'signup-form',
  template: `
    <form [formGroup]="signupForm" (ngSubmit)="submit()">
      <div>
      <input type="text" formControlName="username" />
      @if (signupForm.get('username')?.invalid && signupForm.get('username')?.touched){
        <div>
        @if(signupForm.get('username')?.errors?.['required']){
          <small>Username is required.</small>
        } @else if (signupForm.get('username')?.errors?.['pattern']) {
          <small>Only letters and numbers allowed.</small>
        } @else if(signupForm.get('username')?.errors?.['maxlength']){
          <small>Max length is 16 characters.</small>
        }
      </div>
      }
    </div>
      <div>
      <input type="email" formControlName="email" /> 
    </div>
    <div>
      <input type="password" formControlName="password" />
    </div>
    <div>
      <input type="password" formControlName="passwordConfirm" />
    </div>
    <div>  
      <button type="submit" [disabled]="!signupForm.valid">Submit</button>
    </div>
    </form>
    <span>Already have an account? <a routerLink="/">Sign In</a><span>

    <h2>Profile Form</h2>
    <p>Username: {{ signupForm.value.username }}</p>
    <p>Email: {{ signupForm.value.email}}</p>
    <p>Password: {{ signupForm.value.password}}</p>
  `,
  styleUrl: './app.css',
  imports: [ReactiveFormsModule, RouterModule],

})
export class SignupForm {
  signupForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$'), Validators.maxLength(16)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    passwordConfirm: new FormControl('',[Validators.required, Validators.minLength(6)])
  });

  private http = inject(HttpClient);

  submit() {
    this.http.post('http://localhost:8080/signup', { email: this.signupForm.value.email, username: this.signupForm.value.username, password: this.signupForm.value.password })
      .subscribe({
        next: (response) => console.log('Success:', response),
        error: (err) => console.error('Error:', err),
      });
  }
}
@Component({
  selector: 'signup-page',
  template: `
    <signup-form />
    <nav>
      <a href="/about">About Us</a>
    </nav>`,
  styleUrl: './app.css',
  imports: [SignupForm],

})
export class SignupPage {
}