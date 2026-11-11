import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../core/Services/Wishlist/wishlist.service';
import { CartService } from '../../core/Services/Cart/cart.service';
import { Daum, IWishlist } from '../../core/Models/iwishlist.interface';

@Component({
  imports: [RouterLink],
  selector: 'app-wishlist',
  styleUrl: './wishlist.component.css',
  templateUrl: './wishlist.component.html',
})
export class WishlistComponent implements OnInit {
  private _WishlistService = inject(WishlistService);
  private _CartService = inject(CartService);
  wishlistProducts = signal<Daum[]>([]);

  ngOnInit(): void {
    this.getWishlistProducts();
  }

  getWishlistProducts() {
    this._WishlistService.GetLoggedUserWishlist().subscribe({
      next: (res) => {
        console.log(res);
        this.wishlistProducts.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addToCart(productId: string) {
    this._CartService.AddProductToCart(productId).subscribe({
      next: (res) => {
        console.log(res);
        this._CartService.count.set(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteWishlistProduct(productId: string) {
    this._WishlistService.RemoveProductFromWishlist(productId).subscribe({
      next: (res) => {
        console.log(res);
        this.getWishlistProducts();
        this._WishlistService.getCount();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
