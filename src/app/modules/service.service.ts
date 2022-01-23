import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(
    private _http: HttpClient,
    private _snackBar: MatSnackBar
  ) { }

   registerUser(payload:any){
    return this._http.post(environment.api + 'user', payload)
   } 
   
   getUsers(page){
    let api = `user` 
    if(page.length > 0){
      api = `user?_page=${page.pageIndex + 1 }&_limit=${page.pageSize}`
     }
    return this._http.get<any[]>(environment.api + api)
   } 
   
   deleteUser(id){
    return this._http.delete(environment.api + 'user/' + id)
   } 

   updateUser(payload:any){
    let id = payload.id;
    delete payload.id;
    return this._http.put(environment.api + 'user/' + id , payload)
   } 
  
   loginUser(payload:any){
    return this._http.get<any[]>(environment.api + `user?userName=${payload.username}&password=${payload.password}`)
   } 

   notification(msg:string){
    this._snackBar.open(msg, '', {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      duration:5000
    });
   }
}
