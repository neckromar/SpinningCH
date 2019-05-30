import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { Imagen} from '../../models/imagen';
import { UserService } from '../../services/user.service';
import { ImagenService } from '../../services/Imagen.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { GLOBAL} from '../../services/global';
import { HttpClient } from '@angular/common/http';

import { Log} from '../../models/log';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-imagen-default',
  templateUrl: './imagen-default.component.html',
  providers: [UserService,ImagenService,LogService]
})
export class ImagenDefaultComponent implements OnInit {
  public title: string;
  public token;
  public identity;
  public imagen_editar : Imagen;
  public imagen : Imagen;
  public status: string;
  public selectedFile: File = null;
  public url;
  public imagenes: Array<Imagen>;
  public log: Log;

  
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _imagenService: ImagenService,
    private _logService: LogService,
    private http: HttpClient
  ) {
    this.title = 'Añade una imagen!';
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.url= GLOBAL.url;
   
  }
  ngOnInit() {
    
    if(this.identity== null ){
    this._router.navigate(["login"]);
  }else{
   
    this.imagen= new Imagen(1,
      this.identity.sub,
       '',
       'ACTIVAR',
        '');

    this.getImagenes();
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

getImagen(id){

  this._imagenService.getImagen(id).subscribe(

    response => {
      if (response.status == 'success') {
       this.imagen =  response.imagenes;
      }
    },
    error => {
      console.log(error);
     
    }
  );
}

onEditImagen(comenteditForm) {
 //funcion para modificar el propio usuario
this.imagen.status='ACEPTADO';
 
this.imagen.description = comenteditForm.value.description;
    
  this._imagenService.update(this.token, this.imagen, this.imagen.id).subscribe(
    
    response => {
      if (response.status == 'success' ) {
        this.status = 'success';

        this._router.navigate(['/imagenes/listado']);

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


getImagenes() {
    this._imagenService.getImagenes().subscribe(

      response => {
        if (response.status == 'success') {

          console.log( response.imagenes);
          this.imagenes = response.imagenes;
       
        }
      },
      error => {
        console.log(error);
      }
    );
  }


  deleteImagen(id) {
    this._imagenService.delete(this.token, id).subscribe(
      response => {
        if (response.status == 'success') {

          this.status = 'success';
          this._router.navigate(["/home"]);
        }
        else {
          this.status = 'error';
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
