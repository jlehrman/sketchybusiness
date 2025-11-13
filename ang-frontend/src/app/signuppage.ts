import { Component} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { inject } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AsyncValidatorFn } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export function usernameExistsValidator(http: HttpClient): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const username = control.value;
    if (!username) {
      // if no value, no error
      return of(null);
    }

    return http.post<{ exists: boolean }>('http://localhost:8080/userexists', { username })
      .pipe(
        map(response => {
          // Assuming backend returns { exists: true/false }
          return response.exists ? { usernameExists: true } : null;
        }),
        catchError(() => of(null)) // In case of error, consider valid (or adjust)
      );
  };
}

//validator to check email exists
export function emailExistsValidator(http: HttpClient): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const email = control.value;
    if (!email) {
      // if no value, no error
      return of(null);
    }

    return http.post<{ exists: boolean }>('http://localhost:8080/userexists', { email })
      .pipe(
        map(response => {
          // Assuming backend returns { exists: true/false }
          return response.exists ? { emailExists: true } : null;
        }),
        catchError(() => of(null)) // In case of error, consider valid (or adjust)
      );
  };
}
//validator to check passwords match
export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const passwordConfirm = control.get('passwordConfirm')?.value;

  if (password && passwordConfirm && password !== passwordConfirm) {
    return { passwordsMismatch: true };
  }
  return null;
};

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
        } @else if(signupForm.get('username')?.errors?.['minlength']){
          <small>Minimum length is 4 characters.</small>
        } @else if(signupForm.get('username')?.errors?.['usernameExists']){
          <small>Username already taken.</small>
        }
        </div>
      } 
    </div>
    <div>
      <input type="email" formControlName="email" /> 
      @if(signupForm.get('email')?.invalid && signupForm.get('email')?.touched){
        <div>
        @if(signupForm.get('email')?.errors?.['required']){
          <small>Email is required.</small>
        }@else if(signupForm.get('email')?.errors?.['email']){
          <small>Must be a valid email.</small>
        } @else if(signupForm.get('email')?.errors?.['emailExists']){
          <small>Email address already in use.</small>
        }
        </div>
        }
    </div>
    <div>
      <input type="password" formControlName="password" />
      @if(signupForm.get('password')?.invalid && signupForm.get('password')?.touched){
        <div>
          @if(signupForm.get('password')?.errors?.['required']){
            <small>Password is required.</small>
          } @else if (signupForm.get('password')?.errors?.['minlength']) {
            <small>Password must be at least 6 characters.</small>
          }
        </div>
      }
    </div>
    <div>
      <input type="password" formControlName="passwordConfirm" />
      @if(signupForm.errors&&signupForm.errors['passwordsMismatch']){
        <div>
            <small>Passwords must be the same.</small>
          </div>
      }
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

  private http = inject(HttpClient);

  signupForm = new FormGroup({
    username: new FormControl('', { validators: [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$'), Validators.maxLength(16), Validators.minLength(4)], asyncValidators: [usernameExistsValidator(this.http)], updateOn: 'blur' }),
    email: new FormControl('', { validators: [Validators.required, Validators.email], asyncValidators: [emailExistsValidator(this.http)], updateOn: 'blur' }),
    password: new FormControl('', { validators: [Validators.required,Validators.minLength(6)], updateOn: 'blur' }),
    passwordConfirm: new FormControl('', { validators: [Validators.required], updateOn: 'blur' })
  }, { validators: passwordMatchValidator });


  //check if the username exists from the backend
  usernameExists = false;
  constructor() {
    this.signupForm.get('username')?.valueChanges.pipe(
      debounceTime(650)
    ).subscribe(value => {
      if (value !== null) {
        this.checkExistsUsername(value);
      }
    });
  }
  checkExistsUsername(value: string) {
    this.http.post<boolean>('http://localhost:8080/userexists', { username: value })
      .subscribe({
        next: (exists) => this.usernameExists = exists,
        error: (err) => console.error('Error:', err),
      });
  }


  //submit the final form
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
      <a routerLink="/about">About Us</a>
    </nav>`,
  styleUrl: './app.css',
  imports: [SignupForm, RouterModule],

})
export class SignupPage {
}