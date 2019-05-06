import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css'],
  providers: [UserService]
})
export class UserNewComponent implements OnInit {
  public title:string;
  public token;
  public user;
  public status_user:string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
    ) {
    this.title ="Mi perfil";
    this.user=this._userService.getIdentity();
    this.token=this._userService.getToken();
   }

  ngOnInit() {
    if(this.user == null ){
      this._router.navigate(["/login"]);
    }
   
  }
  
  
}
 