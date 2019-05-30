import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params} from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'register',
  templateUrl: './registro.component.html',
  providers: [UserService]
})
export class RegisterComponent implements OnInit{
  public title: string;
  public user: User;
  public status: string;
  public identity;
constructor(
    private _route: ActivatedRoute,
    private _router: Router, 
    private _userService: UserService
){
    this.title = 'Registrate';
    this.user= new User(1,3,'','','','','');
    this.identity = this._userService.getIdentity();
}

ngOnInit(){
    if(this.identity != null  ){
        this._router.navigate(['home']);
      }
}

onSubmit(form){
    this._userService.register(this.user).subscribe(
    response => {
      
        if(response.status == 'success')
            {
                this.status = response.status;
                //vaciar el formulario
                this.user= new User(1,3,'','','','','');
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
