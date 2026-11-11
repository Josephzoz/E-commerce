import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../core/Services/Products/products.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IProductdetails } from '../../core/Models/iproductdetails.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/Services/Cart/cart.service';
import { WishlistService } from '../../core/Services/Wishlist/wishlist.service';

@Component({
  imports: [CarouselModule, RouterLink],
  selector: 'app-p-details',
  styleUrl: './p-details.component.css',
  templateUrl: './p-details.component.html',
})
export class PDetailsComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    margin: 12,
    navText: ['', ''],
    responsive: {
      0: {
        items: 3,
      },
      640: {
        items: 4,
      },
      1024: {
        items: 4,
      },
    },
    nav: false,
  };

  private _ProductsService = inject(ProductsService);
  private _ActivatedRoute = inject(ActivatedRoute);
  private _CartService = inject(CartService);
  private _WishlistService=inject(WishlistService)
  productId = signal<string>('');
  pDetails = signal<IProductdetails>({} as IProductdetails);
  quantity = signal<number>(1);
  selectedImage = signal<string>('');

  productImages = computed(() => {
    const details = this.pDetails();
    if (!details) return [];

    const list: string[] = [];
    if (details.imageCover) {
      list.push(details.imageCover);
    }
    if (details.images && details.images.length > 0) {
      for (const img of details.images) {
        if (!list.includes(img)) {
          list.push(img);
        }
      }
    }
    return list;
  });

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((route) => {
      const id = route.get('id');
      if (id) {
        this.productId.set(id);
        this.getProductDetails();
      }
    });
  }

  getProductDetails() {
    this._ProductsService.GetspecificProduct(this.productId()).subscribe({
      next: (res) => {
        console.log(res.data);
        this.pDetails.set(res.data);
        if (res.data.imageCover) {
          this.selectedImage.set(res.data.imageCover);
        } else if (res.data.images && res.data.images.length > 0) {
          this.selectedImage.set(res.data.images[0]);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  changeImage(imageSrc: string) {
    this.selectedImage.set(imageSrc);
  }

  increaseQuantity() {
    this.quantity.update((current) => current + 1);
  }

  decreaseQuantity() {
    if (this.quantity() > 1) {
      this.quantity.update((current) => current - 1);
    }
  }

  totalPrice() {
    if (this.pDetails().priceAfterDiscount) {
      return this.quantity() * this.pDetails().priceAfterDiscount;
    } else { 
      return this.quantity() * this.pDetails().price;
    }
  }
  discountPercentage() {
    return Math.round(100 - (this.pDetails().priceAfterDiscount / this.pDetails().price) * 100);
  }

  addToCart(productId: string) {
    this._CartService.AddProductToCart(productId).subscribe({
      next: (res) => {
        console.log(res);
                this._CartService.count.set(res.numOfCartItems)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

   addToWishlist(productId:string){
    this._WishlistService.AddProductToWishlist(productId).subscribe({
      next:(res)=>{
        console.log(res)
        this._WishlistService.getCount()
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}
