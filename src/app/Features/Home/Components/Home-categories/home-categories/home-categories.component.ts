import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoriesComponent } from '../../../../categories/categories.component';
import { CategoriesService } from '../../../../../core/Services/Categories/categories.service';
import { ICategories } from '../../../../../core/Models/icategories.interface';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-home-categories',
  styleUrl: './home-categories.component.css',
  templateUrl: './home-categories.component.html',
})
export class HomeCategoriesComponent implements OnInit {
  private _CategoriesService=inject(CategoriesService)
  categories=signal<ICategories[]>([])

  ngOnInit(): void {
    this.getAllCategories()
  }

  getAllCategories(){
    this._CategoriesService.GetAllCategories().subscribe({
      next:(res)=>{
        console.log(res.data)
        this.categories.set(res.data)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }


}
