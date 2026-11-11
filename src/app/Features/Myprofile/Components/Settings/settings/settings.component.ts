import { Component, inject, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../../core/Services/Authentication/authentication.service';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-settings',
  styleUrl: './settings.component.css',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  private _AuthenticationService = inject(AuthenticationService);
  private _ToastrService=inject(ToastrService)
  isSubmitted: boolean = false;

  ngOnInit(): void {}

  changePasswordForm: FormGroup = new FormGroup({
    currentPassword: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/),
    ]),
    rePassword: new FormControl(null, [Validators.required]),
  },{ validators: [this.confirmPassword] });

  confirmPassword(g: AbstractControl) {
    if (g.get('password')?.value === g.get('rePassword')?.value) return null;
    else {
      return { missmatch: true };
    }
  }

  changePassword(){
    this.isSubmitted=true
    console.log(this.changePasswordForm.value )
    // if(this.changePasswordForm.valid){
      this._AuthenticationService.UpdateLoggedUserPassword(this.changePasswordForm.value).subscribe({
        next:(res)=>{
          console.log(res)
          
          
        },
        error:(err)=>{
          console.log(err.error.errors.msg)
          this._ToastrService.error(err.error.errors.msg,'failed',{positionClass:'toast-top-center'})
          
          
        }
      })
    // }
  }


}
