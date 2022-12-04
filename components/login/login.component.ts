import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validateForm';
import { AuthService } from 'src/app/services/auth.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, 
    private auth:AuthService,
    private route:Router,
    private toast:NgToastService,
    private userStore: UserServiceService
    ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  // -----------Eyes Hiddden--------------
  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
  onlogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value)
      this.auth.login(this.loginForm.value).subscribe({
        next:(res)=>{
          this.loginForm.reset();
          this.auth.storeToken(res.token);
          const tokenPayload = this.auth.decodedToken();
          this.userStore.setFullNameForStore(tokenPayload.name);
          this.userStore.setRoleForStore(tokenPayload.role)
          // alert(res.message);
          this.toast.success({detail:"Success",summary:res.message,duration:5000})
          this.route.navigate(['dashboard']);
        },
        error:(err)=>{
          // alert("Something when wrong");
          this.toast.error({detail:"ERROR",summary:"Something when wrong",duration:5000})
          console.log(err);
        }
      })
    }
    else {
      //console.log("Form is not valid");
      // throw the error using toaster and required fields
      ValidateForm.validateAllFormFields(this.loginForm);
      alert("Your form is invalid")
    }
  }
}
