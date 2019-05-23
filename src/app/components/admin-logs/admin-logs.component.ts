import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { AdminService } from '../../services/admin.service';


import { Log} from '../../models/log';
import { LogService } from '../../services/log.service';
@Component({
  selector: 'app-admin-logs',
  templateUrl: './admin-logs.component.html',
  styleUrls: ['./admin-logs.component.css'],
  providers: [UserService,AdminService]
})
export class AdminLogsComponent implements OnInit {
  public title: string;
  public user: User;
  public token;
  public identity;
  public status:string;
  public logs: Log;
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
     

      this.getLogs();
    }

  }

  getLogs(){
    this._adminService.getLogs().subscribe(

      response => {
        if (response.status == 'success') {

          console.log(response);
          this.logs = response.logs;
        }
      },
      error => {
        console.log(error);
      }
    );
  }


}
