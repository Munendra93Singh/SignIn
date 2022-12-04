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
  public role! : string;

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
      const fullNameFromToken = this.auth.getfullNameFromToken();
      this.fullName = val || fullNameFromToken
      // console.log(this.fullName);
    });
    this.userStore.getRoleFromStore().subscribe(val =>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken
    });
  }

  logOut(): void {
    this.auth.signOut();
  }

}
