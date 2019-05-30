import { Component, OnInit,ViewChild, ElementRef  } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { AdminService } from '../../services/admin.service';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-admin-add-user',
  templateUrl: './admin-add-user.component.html',
  styleUrls: ['./admin-add-user.component.css'],
  providers: [UserService,AdminService]
})
export class AdminAddUserComponent implements OnInit {

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
      this.title = 'Registrate';
      this.user= new User(1,4,'','','','','');
    }
  }

  onSubmit(form){
    this.user.role_id=4;
    this._userService.register(this.user).subscribe(
    response => {
      
        if(response.status == 'success')
            {
                this.status = response.status;
                //vaciar el formulario
                this.user= new User(1,4,'','','','','');
                form.reset();
            }   
            else{
                    this.status='error';
                }
    },
    error => {
        console.log(<any>error);
    }
);
}
}
