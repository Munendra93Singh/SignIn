import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl:string ="https://localhost:7052/api/User/"
  constructor(private http: HttpClient) { }

  getusers(){
    return this.http.get<any>(this.baseUrl);
  }
}
