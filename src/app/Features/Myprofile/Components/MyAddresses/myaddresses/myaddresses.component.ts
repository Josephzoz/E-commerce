import { Component, inject, OnInit, signal } from '@angular/core';
import { AddressesService } from '../../../../../core/Services/Addresses/addresses.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUseraddresses } from '../../../../../core/Models/iuseraddresses.interface';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-myaddresses',
  styleUrl: './myaddresses.component.css',
  templateUrl: './myaddresses.component.html',
})
export class MyaddressesComponent implements OnInit {
  private _AddressesService = inject(AddressesService);

  isSubmitted: boolean = false;
  userAddresses = signal<IUseraddresses[]>([]);
  ngOnInit(): void {
    this.getUserAddresses();
  }

  newAddressForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    details: new FormControl(null, Validators.required),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    city: new FormControl(null, Validators.required),
  });
  isModalOpen=signal<boolean>(false)

  openModal(): void {
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }

  addNewAddress() {
    this.isSubmitted = true;
    console.log(this.newAddressForm.value);
    if (this.newAddressForm.valid) {
      this._AddressesService.AddAddress(this.newAddressForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.isModalOpen.set(false)
          this.userAddresses.set(res.data)
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  getUserAddresses() {
    this._AddressesService.GetLoggedUserAddresses().subscribe({
      next: (res) => {
        console.log(res);
        this.userAddresses.set(res.data)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteAddress(addressId:string){
    this._AddressesService.RemoveAddress(addressId).subscribe({
       next: (res) => {
          console.log(res);
          this.userAddresses.set(res.data)
        },
        error: (err) => {
          console.log(err);
        },
    })
  }
}
