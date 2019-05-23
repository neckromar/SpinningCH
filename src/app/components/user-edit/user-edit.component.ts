
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { HttpClient } from '@angular/common/http';
import { GLOBAL} from '../../services/global';
//subida de imagenes


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {
  public title: string;
  public user:User;
  public id;
  public token;
  public identity;
  public status;
  public selectedFile: File = null;
  public url;
 public afuConfig = {
  multiple: false,
  formatsAllowed: ".jpg,.png,.jpeg,.gif",
  maxSize: "50",
  uploadAPI:  {
    url:"http://spinningch.api.com/user/image-upload",
    headers: {
   "Authorization" : this._userService.getToken()
    }
  },
  theme: "attachPin",
  hideProgressBar: false,
  hideResetBtn: true,
  hideSelectBtn: false,
  attachPinText: 'Sube tu avatar de usuario'
};
  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private http: HttpClient
  ) {
    
    this.title= "Actualizar tu perfil"
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
   
    this.user= new User(this.identity.sub,
      3,
      this.identity.name,
      this.identity.surname,
      '',
      this.identity.image_path,
      this.identity.email,);

    this.url=GLOBAL.url;
  }

  ngOnInit() {
    if(this.identity== null ){
      this._router.navigate(["/login"]);
    }
   

  }
  
//avar upload
avatarUpload(datos){
  let data = JSON.parse(datos.response);
this.user.image_path =data.image;
}

 
  //funcion para modificar el propio usuario
  onSubmit(form,event) {
    this._userService.update(this.token, this.user, this.user.id).subscribe(
      
      response => {
        if (response.status == 'success' ) {
          this.status = 'success';
          this.identity = this.user;
          
         localStorage.setItem('identity',JSON.stringify(this.identity));
         
          this._router.navigate(['/update-user']);

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


}

