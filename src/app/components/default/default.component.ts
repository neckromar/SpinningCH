import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'default',
  templateUrl: './default.component.html',
  providers: [UserService]
})
export class DefaultComponent implements OnInit {
  public title: string;
  public token;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.title = 'Inicio';
    this.token = this._userService.getToken();

  }
  ngOnInit() {

   
  }

}
