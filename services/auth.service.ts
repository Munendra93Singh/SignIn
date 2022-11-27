import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string ="https://localhost:7052/api/User/"
  constructor(private http:HttpClient,private router:Router) { }

  signUp(userObj:any){
    // return this.http.post<any>('${this.baseUrl}register',userObj)
    return this.http.post<any>('https://localhost:7052/api/User/register',userObj)
  }

  login(loginObj:any){
    // return this.http.post<any>('${this.baseUrl}authenticate',loginObj);
    return this.http.post<any>('https://localhost:7052/api/User/authenticate',loginObj);
  }
  storeToken(tokenValue:string){
    localStorage.setItem('token',tokenValue)
  }
  getToken(){
    return localStorage.getItem('token')
  }
  isLoggedIn():Boolean{
   return !! localStorage.getItem('token')
  }
  signOut(){
    localStorage.clear();
    this.router.navigate(['login']);
    // localStorage.removeItem('token');
  }
}
