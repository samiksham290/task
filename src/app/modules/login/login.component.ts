import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this._fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private _fb: FormBuilder,
    private _service:ServiceService,
    private _route: Router,
  ) { }

  ngOnInit(): void {
  }


  login(){
    console.log(this.loginForm.value);
    this._service.loginUser(this.loginForm.value).subscribe(res=>{

      if(res.length > 0){
        this._service.notification("User login sucessfully")
        sessionStorage.setItem('user', JSON.stringify(res[0]))
        this._route.navigate(['/dashboard']);
      }else{
        this._service.notification("Username or password not correct")
      }
    })
  }

  submitData(){
    this._route.navigate(['/registration']);
  }

}
