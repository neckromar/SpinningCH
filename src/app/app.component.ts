import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { GLOBAL} from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck {
  public identity;
  public token;
  public url;
  title = 'cliente-angular';

  constructor(
    private _userService: UserService
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url=GLOBAL.url;
  }
  ngOnInit() {
   
  }
  // comprueba los cambios realizados y actualiza
  ngDoCheck() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }
}
