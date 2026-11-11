import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { form } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Service()
export class AuthenticationService {
  private _HttpClient = inject(HttpClient);
  private _Router = inject(Router);
  private _CookieService = inject(CookieService);

  isLogIn = signal<boolean>(false);

  SignUp(formData: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`, formData);
  }

  SignIn(formData: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`, formData);
  }

  SignOut() {
    this.isLogIn.set(false);
    this._Router.navigate(['/login']);
    this._CookieService.delete('token');
    this._CookieService.delete('userInfo');
  }

  UpdateLoggedUserPassword(formData: object): Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/users/changeMyPassword`, formData);
  }

  ForgotPassword(email: string): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`, {
      email: email,
    });
  }

  VerifyResetCode(resetCode: string): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`, {
      resetCode: resetCode,
    });
  }

  ResetPassword(email:string,password:string): Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`, {"email":email,"newPassword":password});
  }
}
