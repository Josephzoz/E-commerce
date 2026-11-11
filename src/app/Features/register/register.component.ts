import { Component, inject, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core/Services/Authentication/authentication.service';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { validate } from '@angular/forms/signals';
import { Router } from '@angular/router';


@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-register',
  styleUrl: './register.component.css',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  private _AuthenticationService = inject(AuthenticationService);
  private _Router=inject(Router)
 

  resMessage:string=''
  isSubmitted:boolean=false

  ngOnInit(): void {
    
  }

  terms:FormControl=new FormControl(false,Validators.requiredTrue)

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    email: new FormControl(null, [
      Validators.required,
      Validators.email,
    ]),
    password:new FormControl(null,[
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/)
    ]),
    rePassword:new FormControl(null,[
      Validators.required
    ]),
    phone:new FormControl(null,[
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/)
    ]),

  },{validators:[this.confirmPassword]});

  confirmPassword(g:AbstractControl){
    if(g.get('password')?.value===g.get('rePassword')?.value){
      return null
    }else{
      return {'missmatch':true}
    }
  }

  register(){
    this.isSubmitted=true
    console.log(this.registerForm.value )
    if(this.registerForm.valid && this.terms.valid){
      this.resMessage=''
      this._AuthenticationService.SignUp(this.registerForm.value).subscribe({
        next:(res)=>{
          console.log(res)
          setTimeout(() => {
            this._Router.navigate(['/login'])
          }, 1000);
          
        },
        error:(err)=>{
          console.log(err)
          this.resMessage=err.error.message
          console.log(this.resMessage)
        }
      })
    }
  }
}
