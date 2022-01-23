import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { RegistrationComponent } from '../../registration/registration.component';
import { ServiceService } from '../../service.service';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {

  loginUser = JSON.parse(sessionStorage.getItem('user'));
  
  page:PageEvent = {
    "length":0,
    "pageIndex":0,
    "pageSize":10,
  }
  users = [];

  constructor(
    private _service:ServiceService,
    public dialog: MatDialog,
    private _route:Router
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  pageChange(page:PageEvent){
    this.page = page;
    this.getUsers();
  }

  getUsers(){

    this._service.getUsers(this.page).subscribe(res=>{
     
      
      if(this.page.length == 0){
        let i = 0;
        while(i < 10){
          this.users.push(res[i]);
          i++;
        }

        this.page.length = res.length;
      }else{
        this.users = res;
      }

      
    })
  }

  editUser(user): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      data: {...user},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUsers();
    });
  }

  deleteUser(id){
    this._service.deleteUser(id).subscribe(res=>{
      this._service.notification("User deleted successfully")
      this.users = this.users.filter(u=> u.id !== id);
    })
  }

  addUser(){
    this._route.navigate(['/registration']);
  }

}
