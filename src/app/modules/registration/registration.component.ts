import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  loginUser = JSON.parse(sessionStorage.getItem('user'))

  registrationForm = this._fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', Validators.required],
    userName: ['', Validators.required],
    password: ['', Validators.required],
    role: ['', Validators.required]
  });

  constructor(
    private _fb: FormBuilder,
    private _service:ServiceService,
    private _route: Router,
  ) { }

  ngOnInit(): void {

  
  }


  register(){
    console.log(this.registrationForm.value);
    this._service.registerUser(this.registrationForm.value).subscribe(res=>{
      console.log("User registred sucessfully");
      this._service.notification("User registred sucessfully")
      //this._route.navigate(['/login']);
      history.back()
    })
  }


}
