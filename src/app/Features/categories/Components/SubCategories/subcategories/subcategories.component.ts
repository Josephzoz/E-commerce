import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SubcategoriesService } from '../../../../../core/Services/SubCategories/subcategories.service';
import { ISubcategory } from '../../../../../core/Models/isubcategory.interface';
import { CategoriesService } from '../../../../../core/Services/Categories/categories.service';
import { ICategories } from '../../../../../core/Models/icategories.interface';

@Component({
  imports: [RouterLink],
  selector: 'app-subcategories',
  styleUrl: './subcategories.component.css',
  templateUrl: './subcategories.component.html',
})
export class SubcategoriesComponent implements OnInit {
  private _SubcategoriesService=inject(SubcategoriesService)
  private _CategoriesService=inject(CategoriesService)

  private _ActivatedRoute=inject(ActivatedRoute)
  categoryId=signal<string>('')
  subCategories=signal<ISubcategory[]>([])
  specificCategory=signal<ICategories>({} as ICategories)
  
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((route)=>
    this.categoryId.set(route.get('id')!))
    this.getSubcategories()
    this.getSpecificCategory()
  }

  getSubcategories(){
    this._SubcategoriesService.GetAllSubCategoriesOnCategory(this.categoryId()).subscribe({
      next:(res)=>{
        console.log(res.data)
        this.subCategories.set(res.data)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  getSpecificCategory(){
    this._CategoriesService.GetspecificCategory(this.categoryId()).subscribe({
      next:(res)=>{
        // console.log(res)
        
        this.specificCategory.set(res.data)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}
