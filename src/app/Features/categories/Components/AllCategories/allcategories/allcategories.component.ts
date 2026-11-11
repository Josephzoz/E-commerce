import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoriesComponent } from '../../../categories.component';
import { CategoriesService } from '../../../../../core/Services/Categories/categories.service';
import { ICategories } from '../../../../../core/Models/icategories.interface';

@Component({
  imports: [RouterLink],
  selector: 'app-allcategories',
  styleUrl: './allcategories.component.css',
  templateUrl: './allcategories.component.html',
})
export class AllcategoriesComponent implements OnInit {
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
