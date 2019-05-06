import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { Imagen} from '../../models/imagen';
import { UserService } from '../../services/user.service';
import { ImagenService } from '../../services/Imagen.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { GLOBAL} from '../../services/global';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-imagen-new',
  templateUrl: './imagen-new.component.html',
  providers: [UserService,ImagenService]
})
export class ImagenNewComponent implements OnInit {
  public title: string;
  public token;
  public identity;
  public imagen : Imagen;
  public status: string;
  public selectedFile: File = null;
  public url;
  
  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.jpeg",
    maxSize: "50",
    uploadAPI:  {
      url:"http://spinningch.api.com/imagenes/image-upload",
      headers: {
     "Authorization" : this._userService.getToken()
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText: 'Sube tu imagen'
  };

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _imagenService: ImagenService,
    private http: HttpClient
  ) {
    this.title = 'Añade una imagen!';
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();

    
  }
  ngOnInit() {
    if(this.identity== null || this.identity =="" ){
      this._router.navigate(["/login"]);
    }
    else{
      this.imagen= new Imagen(1,
        this.identity.sub,
       '',
       'ACTIVAR',
        '');
    }
  }
//avar upload
imagenUpload(datos){

  let image_data = JSON.parse(datos.response);
  this.imagen.imagen_path =image_data.imagen_path;
}

onSubmit(form){

this._imagenService.store(this.imagen,this.token).subscribe(
response => {
  
    if(response.status == 'success')
        {
          this.status='success';
            this.status = response.status;
            //vaciar el formulario
            this.imagen= new Imagen(1,1,'','','');
            
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
