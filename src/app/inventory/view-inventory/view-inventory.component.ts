import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddInventoryComponent } from '../add-inventory/add-inventory.component';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-view-inventory',
  templateUrl: './view-inventory.component.html',
  styleUrls: ['./view-inventory.component.scss']
})
export class ViewInventoryComponent implements OnInit {

  data = [];
  filters = {
    "search": new FormControl(''),
    "category": new FormControl(''),
    "minPrice": new FormControl(''),
    "maxPrice": new FormControl('')
  }
  categories=[]

  constructor(
    private _service:InventoryService,
    private _route:Router,
    public dialog:MatDialog
   ) { }
    
  ngOnInit(): void {
    this.getItem();
    this.getCategory();

    this.filters.search.valueChanges.subscribe(res=>{
      console.log('Search: ',res);  
      this.onFilterItem();
    })

    this.filters.category.valueChanges.subscribe(res=>{
      console.log('Search: ',res);  
      this.onFilterItem();
    })

    this.filters.minPrice.valueChanges.subscribe(res=>{
      console.log('Search: ',res);  
      this.onFilterItem();
    })

   
  }
  

  getItem(){
    this._service.getItem().subscribe(res=>{
      console.log(res);
      this.data = res;    
    })
  }

  add(){
    const dialogRef = this.dialog.open(AddInventoryComponent, {
      data:null,
    });
    dialogRef.afterClosed().subscribe(result=>{
      this.getItem();
    })
  }


  addOrEditItem(data):void{
    
      const dialogRef = this.dialog.open(AddInventoryComponent,{
        data:{...data},
      });
  
      dialogRef.afterClosed().subscribe(result=>{
        this.getItem();
      });
     
   
  }

  getDelete(id){
    this._service.getDeleteItem(id).subscribe(res=>{
      this._service.notification("Item deleted successefully");
      this.data= this.data.filter(u=> u.id !== id )
    })
  }

  onFilterItem(){    
    let payload = {
      "search": this.filters.search.value,
      "category": this.filters.category.value,
      "minPrice": this.filters.minPrice.value,
      "maxPrice": this.filters.maxPrice.value,
    }
    this._service.searchItem(payload).subscribe(res=>{
      this.data = res;    
    })
  }

  getCategory(){
    this._service.getCategories().subscribe(res=>{
      // console.log(res);
      this.categories=res
      
    })
  }

  onFIlterChange(){
    console.log('aaa');
    
  }

}
