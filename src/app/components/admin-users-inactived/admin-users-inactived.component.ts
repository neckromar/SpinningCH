import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { AdminService } from '../../services/admin.service';

import { Log} from '../../models/log';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-admin-users-inactived',
  templateUrl: './admin-users-inactived.component.html',
  styleUrls: ['./admin-users-inactived.component.css'],
  providers: [UserService,AdminService]
})
export class AdminUsersInactivedComponent implements OnInit {

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
    if(this.identity.role_id != 1){
      this._router.navigate(['home']);
    }else if(this.identity.role_id == 1){
     

      this.getUsers_inactived();
    }
  }

  getUsers_inactived(){
    this._adminService.getUsers_inactived().subscribe(

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

  getUser(id){

    this._adminService.getUser(id).subscribe(
  
      response => {
        if (response.status == 'success') {

          this.user = response.user;
         
        }
      },
      error => {
        console.log(error);
       
      }
    );
  }

  onEdit() {
    
   //funcion para modificar el propio usuario
 this.user.role_id=4;
 console.log(this.user);
    this._userService.update(this.token, this.user, this.user.id).subscribe(
      
      response => {
        if (response.status == 'success' ) {
          this.status = 'success';

          this._router.navigate(['/admin/dashboard/users/actived']);

        } else {
          this.status = 'error';
        }

      },
      error => {
        console.log(<any>error);
        this.status = 'error';
      }
    );
  }

  deleteUser(id){
    this._userService.delete(this.token, id).subscribe(
      response => {
        if (response.status == 'success') {

          this.status = 'success';

          this._router.navigate(['/admin/dashboard/users/inactived']);
        }
        else {
          this.status = 'error';
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
