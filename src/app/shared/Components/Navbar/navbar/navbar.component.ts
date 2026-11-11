import { AfterViewChecked, Component, computed, HostListener, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoriesService } from '../../../../core/Services/Categories/categories.service';
import { FlowbiteService } from '../../../../core/Services/Flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { CookieService } from 'ngx-cookie-service';
import { IUserinfo } from '../../../../core/Models/iuserinfo.interface';
import { AuthenticationService } from '../../../../core/Services/Authentication/authentication.service';
import { CartService } from '../../../../core/Services/Cart/cart.service';
import { WishlistService } from '../../../../core/Services/Wishlist/wishlist.service';

@Component({
  imports: [RouterLink],
  selector: 'app-navbar',
  styleUrl: './navbar.component.css',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit, AfterViewChecked {
  private _FlowbiteService = inject(FlowbiteService);
  private _CookieService = inject(CookieService);
  private _CartService = inject(CartService);
  private _WishlistService = inject(WishlistService);
  private _AuthenticationService = inject(AuthenticationService);
  // flag=signal<boolean>(false)
  logged = computed(() => this._AuthenticationService.isLogIn());
  userInfo = signal<IUserinfo>({} as IUserinfo);
  cartBadge=computed(()=>this._CartService.count())
  wishlistBadge=computed(()=>this._WishlistService.count())

  isDropdownOpen = signal<boolean>(false);

  toggleDropdown(): void {
    this.isDropdownOpen.update((val) => !val);
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('#user-menu-container')) {
      this.isDropdownOpen.set(false);
    }
  }

  ngOnInit(): void {
    this._FlowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    if (this._CookieService.get('token')) {
      this._AuthenticationService.isLogIn.set(true);
      this._CartService.getCount();
      this._WishlistService.getCount();
    }
    if (this._CookieService.get('userInfo')) {
      this.userInfo.set(JSON.parse(this._CookieService.get('userInfo')));
    }

  }
  ngAfterViewChecked(): void {
    this._FlowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
   if (this._CookieService.get('userInfo')) {
      this.userInfo.set(JSON.parse(this._CookieService.get('userInfo')));
    }
  }

  signOut() {
    this._AuthenticationService.SignOut();
    this.isDropdownOpen.set(false);
  }
}
