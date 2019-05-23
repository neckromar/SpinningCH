import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'adminlogin',
  templateUrl: './admin-login.component.html',
  providers: [UserService,AdminService]
})
export class AdminLoginComponent implements OnInit {
  public title: string;
  public user: User;
  public token;
  public identity;
  public status:string;

  constructor(
    private _userService: UserService,
    private _adminService: AdminService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.title = 'Identificate';
    this.user = new User(1, 1, '', '', '','', '');
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
  }
  ngOnInit() {
    this.logout();
    if(this.identity.role_id != 1){
      this._router.navigate(['home']);
    }else if(this.identity.role_id == 1){
      this._router.navigate(['admin/dashboard']);
    }
  }

  onSubmit(form) {
    this._adminService.signup(this.user).subscribe(
      response => {
        //token

        //probar si se ha identificado bien y dar un error
        if (response.status != 'error'  ) {
          this.status='success';
          this.token = response;
          localStorage.setItem('token', this.token);


          //objeto usuario identificado
          this._adminService.signup(this.user, true).subscribe(
            response => {
            
              this.identity = response;
            
                localStorage.setItem('identity', JSON.stringify(this.identity));

                // redireccion cuando el login termine
                this._router.navigate(['admin/dashboard']);
              
            
            },
            error => {
              console.log(<any>error);
            }
          );

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

  logout() {
    this._route.params.subscribe(
      params => {
        let logout = +params['sure'];

        if (logout == 1) {
          localStorage.removeItem('identity');
          localStorage.removeItem('token');

          this.identity = null;
          this.token = null;

          //redireccion
          this._router.navigate(['home']);
        }
      });
  }

}
