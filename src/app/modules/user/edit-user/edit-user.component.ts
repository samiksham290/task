import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  profileForm = this._fb.group({
    id: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', Validators.required],
    userName: ['', Validators.required],
    password: ['', Validators.required],
    role: ['', Validators.required],
  });
  
  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _service:ServiceService,
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    
    this.profileForm.get('id').setValue(this.data.id);
    this.profileForm.get('firstName').setValue(this.data.firstName);
    this.profileForm.get('lastName').setValue(this.data.lastName);
    this.profileForm.get('userName').setValue(this.data.userName);
    this.profileForm.get('password').setValue(this.data.password);
    this.profileForm.get('role').setValue(this.data.role);

  }

  updateProfile(){
    //console.log(this.registrationForm.value);
    this._service.updateUser({...this.profileForm.value}).subscribe(res=>{
      this._service.notification("User updated sucessfully");
      this.dialogRef.close(true);
    })
  }

}
