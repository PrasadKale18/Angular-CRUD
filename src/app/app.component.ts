import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserdataService } from './services/userdata.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'api';

  loginform: any = FormGroup;
  alldata:any
  buttonValueChange: Boolean = false
  userID:any
  popValue:Boolean=false
  deleteuserID:any
  constructor(private fb: FormBuilder,private toastr: ToastrService,private services :UserdataService,private http : HttpClient) { }

  ngOnInit() {
    this.loginform = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmpassword: ['', [Validators.required, Validators.minLength(6)]],

    }, { validator: this.passwordMatchValidator })
    this.getuser()
  }

  get username() {
    return this.loginform.get('username')
  }
  get email() {
    return this.loginform.get('email')
  }
  get password() {
    return this.loginform.get('password')
  }
  get confirmpassword() {
    return this.loginform.get('confirmpassword')
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmpassword');

    if (passwordControl && confirmPasswordControl) {
      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }

 

  onSubmit() {
if(this.buttonValueChange==false){
    if(this.loginform.invalid){
      this.toastr.info('please fill up all fields!');
    }else{
      this.services.adduser(this.loginform.value).subscribe((data)=>{
      this.toastr.success('User Save Successfully!');
       console.log(data);
       this.getuser()
      })
  
    }

  }else{
    this.services.updateuser(this.loginform.value,this.userID).subscribe((data)=>{
      this.toastr.success('User Update Successfully!');
      this.getuser()
    })
  }
    
  }

  
  getuser(){
    this.services.getuser().subscribe((data)=>{
    this.alldata=data
    
    });
  }


  deleteShoreUser(){
    this.services.deleteuser(this.deleteuserID).subscribe((data)=>{
      this.toastr.error("User Delete Successfully!")
      this.getuser()
      this.popValue=false
      
    })
  }



deleteuser(id:any){
  this.deleteuserID=id
  this.popValue=true
}


close(){
  this.popValue=false
}


edituser(id:any){
this.userID=id
  this.buttonValueChange=true
this.http.get('http://localhost:3000/posts/'+id).subscribe((data:any)=>{
  console.log(data);
  this.loginform.patchValue({
    username:data?.username,
    email:data?.email,
    password:data?.password,
    confirmpassword:data?.confirmpassword
  })
})
}

}
