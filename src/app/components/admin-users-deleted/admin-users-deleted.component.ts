import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { AdminService } from '../../services/admin.service';

import { Log} from '../../models/log';
import { LogService } from '../../services/log.service';


@Component({
  selector: 'app-admin-users-deleted',
  templateUrl: './admin-users-deleted.component.html',
  styleUrls: ['./admin-users-deleted.component.css'],
  providers: [UserService,AdminService]
})
export class AdminUsersDeletedComponent implements OnInit {

  public title: string;
  public token;
  public identity;
  public status:string;
  public users: User;
  public user: User;

  constructor(
    private _userService: UserService,
    private _adminService: AdminService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
   
  }
  ngOnInit() {
    if(this.identity == null || this.identity.role_id != 1  ){
      this._router.navigate(['home']);
    }else if(this.identity.role_id == 1){
     
      this.getUsers_deleted();
    }
  }

  getUsers_deleted(){
    this._adminService.getUsers_deleted().subscribe(

      response => {
        if (response.status == 'success') {

          console.log(response);
          this.users = response.users;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
