import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  providers: [UserService,AdminService]
})
export class AdminDashboardComponent implements OnInit {


  public token;
  public identity;
public status;
  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _adminService: AdminService,
    private _router: Router
  ) { 
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    }

  ngOnInit() {
    if(this.identity == null || this.identity.role_id != 1  ){
      this._router.navigate(['home']);
    }
  }
 
}
