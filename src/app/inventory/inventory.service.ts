import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(
    private _http: HttpClient,
    private _snackBar: MatSnackBar
  ) { }

  addItem(payload: any) {
    return this._http.post(environment.api + 'item', payload)
  }

  getItem() {
    return this._http.get<any[]>(environment.api + 'item')
  }

  getUpdate(payload:any){
  let id = payload.id;
  delete payload.id;
  return this._http.put(environment.api + 'item/' +id , payload)
  }

  getDeleteItem(id){
    return this._http.delete(environment.api + 'item/' + id)
  }

  getCategories(){
    return this._http.get<any[]>(environment.api + 'category')
  }

  searchItem1(payload: {"search":string, "category": string, minPrice: string, maxPrice:string}){
    console.log(payload);

    let api = environment.api + `item?q=${payload.search}`;
    if(payload.category){
      api = environment.api + `item?q=${payload.search}&category.id=${payload.category}`;
      if(payload.minPrice && payload.maxPrice){
        api = environment.api + `item?q=${payload.search}&category.id=${payload.category}&itemPrice_gte=${payload.minPrice}&itemPrice_lte=${payload.maxPrice}`;  
      }      

    }else if(payload.category && (!payload.minPrice && !payload.maxPrice)){
      api = environment.api + `item?q=${payload.search}&category.id=${payload.category}`;
    }else if(payload.minPrice && payload.maxPrice){
      //http://localhost:3000/item?category.id=1&itemPrice_gte=15000&itemPrice_lte=200000
      api = environment.api + `item?q=${payload.search}&itemPrice_gte=${payload.minPrice}&itemPrice_lte=${payload.maxPrice}`;
    }else if(payload.minPrice){
      api = environment.api + `item?q=${payload.search}&itemPrice_gte=${payload.minPrice}`;
    }else if(payload.maxPrice){
      api = environment.api + `item?q=${payload.search}&itemPrice_lte=${payload.maxPrice}`;
    }

    return this._http.get<any[]>(api)
  }

  searchItem(payload: {"search":string, "category": string, minPrice: string, maxPrice:string}){
    let api = environment.api + `item`;
    if(payload.search && payload.category && payload.minPrice && payload.maxPrice){
      api = api = environment.api + `item?q=${payload.search}&category.id=${payload.category}&itemPrice_gte=${payload.minPrice}&itemPrice_lte=${payload.maxPrice}`;
    }else if(payload.search && payload.category && payload.minPrice && !payload.maxPrice){
      api = api = environment.api + `item?q=${payload.search}&category.id=${payload.category}&itemPrice_gte=${payload.minPrice}`;
    }else if(payload.search && payload.category && !payload.minPrice && !payload.maxPrice){
      api = api = environment.api + `item?q=${payload.search}&category.id=${payload.category}`;
    }else if(!payload.search && payload.category && !payload.minPrice && !payload.maxPrice){
      api = api = environment.api + `item?category.id=${payload.category}`;
    }else if(!payload.search && payload.category && payload.minPrice && !payload.maxPrice){
      api = api = environment.api + `item?category.id=${payload.category}`;
    }else if(payload.search && !payload.category && !payload.minPrice && !payload.maxPrice){
      api = api = environment.api + `item?q=${payload.search}`;
    }
    
    return this._http.get<any[]>(api)

  }



  notification(msg:string){
    this._snackBar.open(msg, '', {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      duration:5000
    });
   }

}
