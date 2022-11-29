import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = "https://localhost:7052/api/User/"
  private userPayload:any="";
  constructor(private http: HttpClient, private router: Router) { 
    this.userPayload = this.decodedToken();
  }

  signUp(userObj: any) {
    // return this.http.post<any>('${this.baseUrl}register',userObj)
    return this.http.post<any>('https://localhost:7052/api/User/register', userObj)
  }

  login(loginObj: any) {
    // return this.http.post<any>('${this.baseUrl}authenticate',loginObj);
    return this.http.post<any>('https://localhost:7052/api/User/authenticate', loginObj);
  }
  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue)
  }
  getToken() {
    return localStorage.getItem('token')
  }
  isLoggedIn(): Boolean {
    return !!localStorage.getItem('token')
  }
  signOut() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token))
    return jwtHelper.decodeToken(token)
  }

  getfullNameFromToken(){
    if(this.userPayload)
    return this.userPayload.name.asObservable;
  }

  getRoleFromToken(){
    if(this.userPayload)
    return this.userPayload.role;
  }
}
