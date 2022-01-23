import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user:any;

  constructor(
    private _route:Router
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(){
    this.user = JSON.parse(sessionStorage.getItem('user'));
    if(this.user == null){
      this._route.navigate(['/login']);
    }
  }

  logout(){
    sessionStorage.removeItem('user');
    this._route.navigate(['/login']);
  }

}
