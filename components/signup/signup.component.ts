import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validateForm';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  type: string ="password";
  isText:boolean =false;
  eyeIcon:string ="fa-eye-slash";
  signUpForm!:FormGroup;
  

   constructor(private fb:FormBuilder,
    private auth:AuthService,
    private route:Router,
    private toast:NgToastService
    ) { }
 
   ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      Email:['',Validators.required],
      username:['',Validators.required],
      password:['',Validators.required]
    })
   }
 
   hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText? this.type ="text": this.type ="password";
   }

   onSignup(){
    if(this.signUpForm.valid){
      //perfect logic for signup
      this.auth.signUp(this.signUpForm.value)
      .subscribe({
        next:(res=>{
          // alert(res.message);
          this.signUpForm.reset();
          this.toast.success({detail:"Registration Successfully",summary:res.message,duration:5000})
          this.route.navigate(['login']);
        })
        ,error:(err=>{
          this.toast.error({detail:"ERROR",summary:"Something when wrong",duration:5000})
          console.log(err);
          // alert(err?.error.message)
        })
      })
      // console.log(this.signUpForm.value)
    }else{
      ValidateForm.validateAllFormFields(this.signUpForm)
    }
   }
  
 }
