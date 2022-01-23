import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.scss']
})
export class AddInventoryComponent implements OnInit {

  categories = [];

  itemForm = this._formBuilder.group({
    id: [null],
    itemName: ['', [Validators.required]],
    itemPrice: ['', Validators.required],
    category: ['', [Validators.required]],
    itemDescription: ['', Validators.required]

  })
  constructor(
    private _formBuilder: FormBuilder,
    private _service: InventoryService,
    private _route: Router,
    public dialogRef: MatDialogRef<AddInventoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.itemForm.get('id').setValue(this.data.id)
      this.itemForm.get('itemName').setValue(this.data.itemName);
      this.itemForm.get('itemPrice').setValue(this.data.itemPrice);
      this.itemForm.get('itemDescription').setValue(this.data.itemDescription);
    } else {
      this.itemForm.get('itemName').setValue('');
      this.itemForm.get('itemPrice').setValue('');
      this.itemForm.get('itemDescription').setValue('');
    }

    this.getCategories();
  }

  addItem() {
    // console.log(this.itemForm.value);
    this._service.addItem(this.itemForm.value).subscribe(res => {
      // console.log("item added successfully");
      this._service.notification("item added successfully");
      this.dialogRef.close(true);
    })
  }

  updateItem() {
    this._service.getUpdate({ ...this.itemForm.value }).subscribe(res => {
      this._service.notification("item updated successefully");
      this.dialogRef.close(true);
    })
  }

  getCancel() {
    this._route.navigate(['/inventory/view'])
  }

  getCategories(){
    this._service.getCategories().subscribe(res=>{
      this.categories = res;

      if(this.data){
        let isExist = this.categories.filter(cat=> cat.id == this.data.category.id);
        if(isExist.length > 0){
          this.itemForm.get('category').setValue(isExist[0]);
        }
      }
    })
  }

}
