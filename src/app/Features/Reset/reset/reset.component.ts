import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthenticationService } from '../../../core/Services/Authentication/authentication.service';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-reset',
  styleUrl: './reset.component.css',
  templateUrl: './reset.component.html',
})
export class ResetComponent implements OnInit {
  private _AuthenticationService = inject(AuthenticationService);
  private _Router=inject(Router)
  forgotPasswordFlag=signal<boolean>(true)
  codeFlag=signal<boolean>(false)
  changePasswordFlag=signal<boolean>(false)
  ngOnInit(): void {}

  email: FormControl = new FormControl(null, [Validators.required, Validators.email]);

  resetCode: FormControl = new FormControl(null, Validators.required);

  resetPasswordForm: FormGroup = new FormGroup({
    // email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/),
      Validators.minLength(8),
    ]),
    rePassword:new FormControl(null,[
      Validators.required
    ]),
  },{validators:[this.confirmPassword]});

  

  confirmPassword(g:AbstractControl){
    if(g.get('newPassword')?.value===g.get('rePassword')?.value){
      return null
    }else{
      return {'missmatch':true}
    }
  }

  forgotPassword(){
   if(this.email.valid){
     this._AuthenticationService.ForgotPassword(this.email.value).subscribe({
      next:(res)=>{
        console.log(res)
        this.codeFlag.set(true)
        this.forgotPasswordFlag.set(false)
        this.changePasswordFlag.set(false)
      },
      error:(err)=>{
        console.log(err)
      }
    })
   }
  }

  code(){
    if(this.resetCode.valid){
     this._AuthenticationService.VerifyResetCode(this.resetCode.value).subscribe({
      next:(res)=>{
        console.log(res)
        this.changePasswordFlag.set(true)
        this.codeFlag.set(false)
        this.forgotPasswordFlag.set(false)
      },
      error:(err)=>{
        console.log(err)
      }
    })
   }

  }

  backToEmail() {
    this.forgotPasswordFlag.set(true);
    this.codeFlag.set(false);
    this.changePasswordFlag.set(false);
  }
  
  changePassword(){
    if(this.resetPasswordForm.valid){
      this._AuthenticationService.ResetPassword(this.email.value,this.resetPasswordForm.get('newPassword')?.value).subscribe({
      next:(res)=>{
        console.log(res)
        this._Router.navigate(['/login'])
        this.changePasswordFlag.set(false)
        this.codeFlag.set(false)
        this.forgotPasswordFlag.set(false)
      },
      error:(err)=>{
        console.log(err)
      }
    })
    }
  }
}
