import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../core/Services/Authentication/authentication.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-login',
  styleUrl: './login.component.css',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private _AuthenticationService = inject(AuthenticationService);
  private _Router = inject(Router);
  private _CookieService = inject(CookieService);

  resMessage: string = '';
  isSubmitted: boolean = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/),
    ]),
  });

  login() {
    this.isSubmitted = true;
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      this.resMessage = '';
      this._AuthenticationService.SignIn(this.loginForm.value).subscribe({
        next: (res) => {
          this._AuthenticationService.isLogIn.set(true)
          console.log(res);
          this._CookieService.set('token',res.token)
          this._CookieService.set('userInfo',JSON.stringify(res.user))

        

          setTimeout(() => {
            this._Router.navigate(['/home']);
          }, 1000);
        },
        error: (err) => {
          console.log(err);
          this.resMessage = err.error.message;
          console.log(this.resMessage);
        },
      });
    }
  }
}
