import { Routes } from '@angular/router';

import { BrandsComponent } from './Features/brands/brands.component';
import { ShopComponent } from './Features/shop/shop.component';
import { CategoriesComponent } from './Features/categories/categories.component';
import { LoginComponent } from './Features/login/login.component';
import { RegisterComponent } from './Features/register/register.component';
import { CartComponent } from './Features/cart/cart.component';
import { PDetailsComponent } from './Features/p-details/p-details.component';
import { WishlistComponent } from './Features/wishlist/wishlist.component';
import { WildcardComponent } from './shared/Components/wildcard/wildcard.component';

import { guestGuard } from './core/Guards/Guest/guest-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./Features/Home/home/home.component').then((c) => c.HomeComponent),
    title: 'Fresh Mart | Home',
  },
  {
    path: 'shop',
    loadComponent: () => import('./Features/shop/shop.component').then((c) => c.ShopComponent),
    title: 'Fresh Mart | Shop',
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./Features/categories/categories.component').then((c) => c.CategoriesComponent),
    title: 'Fresh Mart | Categories',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./Features/categories/Components/AllCategories/allcategories/allcategories.component').then(
            (c) => c.AllcategoriesComponent,
          ),
      },
      {
        path: 'subcategories/:id',
        loadComponent: () =>
          import('./Features/categories/Components/SubCategories/subcategories/subcategories.component').then(
            (c) => c.SubcategoriesComponent,
          ),
      },
    ],
  },
  {
    path: 'products/:type/:id',
    loadComponent: () =>
      import('./Features/CategoryProducts/categoryproducts/categoryproducts.component').then(
        (c) => c.CategoryproductsComponent,
      ),
    title: 'Fresh Mart | Products',
  },

  {
    path: 'brands',
    loadComponent: () =>
      import('./Features/brands/brands.component').then((c) => c.BrandsComponent),
    title: 'Fresh Mart | Brands',
  },
  {
    path: 'login',
    loadComponent: () => import('./Features/login/login.component').then((c) => c.LoginComponent),
    title: 'Fresh Mart | Login',
    canActivate: [guestGuard],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./Features/register/register.component').then((c) => c.RegisterComponent),
    title: 'Fresh Mart | Register',
    canActivate: [guestGuard],
  },
  {
    path: 'cart',
    loadComponent: () => import('./Features/cart/cart.component').then((c) => c.CartComponent),
    title: 'Fresh Mart | Cart',
  },
  {
    path: 'p-details/:id',
    loadComponent: () =>
      import('./Features/p-details/p-details.component').then((c) => c.PDetailsComponent),
    title: 'Fresh Mart | Product Details',
  },
   {
    path: 'reset',
    loadComponent: () =>
      import('./Features/Reset/reset/reset.component').then((c) => c.ResetComponent),
    title: 'Fresh Mart | Forget Password',
  },
  {
    path: 'wishlist',
    loadComponent: () =>
      import('./Features/wishlist/wishlist.component').then((c) => c.WishlistComponent),
    title: 'Fresh Mart | Wishlist',
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./Features/Contact/contact/contact.component').then((c) => c.ContactComponent),
    title: 'Fresh Mart | Contact Us',
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./Features/Checkout/checkout/checkout.component').then((c) => c.CheckoutComponent),
    title: 'Fresh Mart | Checkout',
  },
  {
    path: 'allorders',
    loadComponent: () =>
      import('./Features/Allorders/allorders/allorders.component').then(
        (c) => c.AllordersComponent,
      ),
    title: 'Fresh Mart | All Orders',
  },
  {
    path: 'myorders',
    loadComponent: () =>
      import('./Features/Myorders/myorders/myorders.component').then((c) => c.MyordersComponent),
    title: 'Fresh Mart | My Orders',
  },
  {
    path: 'myprofile',
    loadComponent: () =>
      import('./Features/Myprofile/myprofile/myprofile.component').then(
        (c) => c.MyprofileComponent,
      ),
    title: 'Fresh Mart | My Profile',
    children: [
      {
        path: '',
        redirectTo: 'myaddresses',
        pathMatch: 'full',
      },
      {
        path: 'myaddresses',
        loadComponent: () =>
          import('./Features/Myprofile/Components/MyAddresses/myaddresses/myaddresses.component').then(
            (c) => c.MyaddressesComponent,
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./Features/Myprofile/Components/Settings/settings/settings.component').then(
            (c) => c.SettingsComponent,
          ),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./shared/Components/wildcard/wildcard.component').then((c) => c.WildcardComponent),
    title: 'Fresh Mart | 404 Not Found',
  },
];
