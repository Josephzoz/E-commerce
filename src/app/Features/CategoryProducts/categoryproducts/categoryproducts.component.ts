import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../../core/Services/Products/products.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IProducts } from '../../../core/Models/iproducts.interface';
import { CategoriesService } from '../../../core/Services/Categories/categories.service';
import { SubcategoriesService } from '../../../core/Services/SubCategories/subcategories.service';
import { ISubcategory } from '../../../core/Models/isubcategory.interface';
import { BrandsService } from '../../../core/Services/Brands/brands.service';
import { CartService } from '../../../core/Services/Cart/cart.service';
import { WishlistService } from '../../../core/Services/Wishlist/wishlist.service';

@Component({
  imports: [RouterLink],
  selector: 'app-categoryproducts',
  styleUrl: './categoryproducts.component.css',
  templateUrl: './categoryproducts.component.html',
})
export class CategoryproductsComponent implements OnInit {
  protected readonly Math = Math;
  private _ProductsService = inject(ProductsService);
  private _SubcategoriesService = inject(SubcategoriesService);
  private _CategoriesService = inject(CategoriesService);
  private _CartService=inject(CartService)
  private _BrandsService = inject(BrandsService);
  private _ActivatedRoute = inject(ActivatedRoute);
  private _WishlistService=inject(WishlistService)

  type = signal<string>('');
  id = signal<string>('');
  products = signal<IProducts[]>([]);

  category = signal<ISubcategory>({} as ISubcategory);
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((route) => {
      this.type.set(route.get('type')!);
      this.id.set(route.get('id')!);
      let params;
      if (this.type() === 'category') {
        params = { category: this.id() };
        this.getSpecificCategory()
      } else if (this.type() === 'subcategories') {
        params = { subcategory: this.id() };
        this.getSpecificSubCategory();
      } else if (this.type() === 'brand') {
        params = { brand: this.id() };
        this.getSpecificBrand()
      }
      if (params) {
        this.getProducts(params);
      }
    });
    // this.getSpecificSubCategory()
  }

  getProducts(params: object) {
    this._ProductsService.GetAllProducts(params).subscribe({
      next: (res) => {
        // console.log(res.data)
        this.products.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getSpecificSubCategory() {
    this._SubcategoriesService.GetSpecificSubCategory(this.id()).subscribe({
      next: (res) => {
        console.log(res.data);
        this.category.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getSpecificCategory() {
    this._CategoriesService.GetspecificCategory(this.id()).subscribe({
      next: (res) => {
        console.log(res.data);
        this.category.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getSpecificBrand() {
      this._BrandsService.GetSpecificBrand(this.id()).subscribe({
      next: (res) => {
        console.log(res.data);
        this.category.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  } 

  

    addToCart(productId:string){
    this._CartService.AddProductToCart(productId).subscribe({
      next:(res)=>{
        console.log(res)
                this._CartService.count.set(res.numOfCartItems)
      },
      error:(err)=>{
        console.log(err)
      }
    })
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
