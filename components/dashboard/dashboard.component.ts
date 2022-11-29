import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public users: any=[];

  public fullName :string ="";  
  constructor(private api:ApiService,
              private auth: AuthService,              
              private userStore :UserServiceService) { }

  ngOnInit(){
    this.api.getusers()
    .subscribe(res=>{
      this.users = res;
    });

    this.userStore.getFullNameFromStore()
    .subscribe(val=>{
      let fullNameFromToken = this.auth.getfullNameFromToken();
      this.fullName = val || fullNameFromToken
      // console.log(this.fullName);
    })
  }

  logOut(): void {
    this.auth.signOut();
  }

}
