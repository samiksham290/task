import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user:any;

  constructor() { }

  ngOnInit(): void {
    this.getUserInfo()
  }

  getUserInfo(){
    this.user = JSON.parse(sessionStorage.getItem('user'));
  }
  
}
