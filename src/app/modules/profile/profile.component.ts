import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  editProfile = false;

  profileForm = this._fb.group({
    id: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', Validators.required],
    userName: ['', Validators.required],
    password: ['', Validators.required],
    role: ['', Validators.required],
  });
  user: any;

  constructor(
    private _fb: FormBuilder,
    private _service: ServiceService
    ) { }

  ngOnInit(): void {
    this.getUserInfo();
  }


  getUserInfo(){
    this.user = JSON.parse(sessionStorage.getItem('user'));
    
    this.profileForm.get('id').setValue(this.user.id);
    this.profileForm.get('firstName').setValue(this.user.firstName);
    this.profileForm.get('lastName').setValue(this.user.lastName);
    this.profileForm.get('userName').setValue(this.user.userName);
    this.profileForm.get('password').setValue(this.user.password);
    this.profileForm.get('role').setValue(this.user.role);
  }

  
  updateProfile(){
    //console.log(this.registrationForm.value);
    this._service.updateUser({...this.profileForm.value}).subscribe(res=>{
      this._service.notification("User profile updated sucessfully")

      sessionStorage.setItem('user', JSON.stringify(this.profileForm.value));
      this.user = this.profileForm.value;
      this.editProfile = false;
    })
  }

}
