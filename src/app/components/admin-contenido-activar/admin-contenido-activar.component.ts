import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { AdminService } from '../../services/admin.service';
import { ImagenService } from '../../services/Imagen.service';
import { PostService } from '../../services/post.service';
import { VideoService } from 'src/app/services/video.service';

import { ComentarioService } from '../../services/comentario.service';
@Component({
  selector: 'app-admin-contenido-activar',
  templateUrl: './admin-contenido-activar.component.html',
  styleUrls: ['./admin-contenido-activar.component.css'],
  providers: [UserService,AdminService,PostService,ImagenService,VideoService,ComentarioService]
})
export class AdminContenidoActivarComponent implements OnInit {

  public title: string;
  public token;
  public identity;
  public status:string;
  public users: User;
  public post;
  public imagen;
  public comments;
  public video;
public user: User;
public contenidos;
  constructor(
    private _userService: UserService,
    private _adminService: AdminService,
    private _imagenService: ImagenService,
    private _videoService: VideoService,
    private _postService: PostService,
    private _comentarioService: ComentarioService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
   
  }
  ngOnInit() {
    if(this.identity == null || this.identity.role_id != 1  ){
      this._router.navigate(['home']);
    }else if(this.identity.role_id == 1){
      this.getContenido_Activar();
     
    }
  }

  getContenido_Activar(){
    this._adminService.getContenido_Activar().subscribe(

      response => {
        if (response.status == 'success') {

          console.log(response);
          this.contenidos = response.contenidos;
        }
      },
      error => {
        console.log(error);
      }
    );
  }


  getPost(id){

    this._postService.getPost(id).subscribe(
  
      response => {
        if (response.status == 'success') {
         this.post =  response.post;
        }
      },
      error => {
        console.log(error);
       
      }
    );
  }

  onEditPost() {
   //funcion para modificar el propio usuario
 this.post.status='ACEPTADO';
    this._postService.update(this.token, this.post, this.post.id).subscribe(
      
      response => {
        if (response.status == 'success' ) {
          this.status = 'success';

          this._router.navigate(['/admin/dashboard/contenidos/activar']);

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

  onEditImagen() {
   //funcion para modificar el propio usuario
 this.imagen.status='ACEPTADO';
    this._imagenService.update(this.token, this.imagen, this.imagen.id).subscribe(
      
      response => {
        if (response.status == 'success' ) {
          this.status = 'success';

          this._router.navigate(['/admin/dashboard/contenidos/activar']);

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

  getVideo(id){

    this._videoService.getVideo(id).subscribe(
  
      response => {
        if (response.status == 'success') {
         this.video =  response.videos;
        }
      },
      error => {
        console.log(error);
       
      }
    );
  }

  onEditVideo() {
   //funcion para modificar el propio usuario
 this.video.status='ACEPTADO';
    this._videoService.update(this.token, this.video, this.video.id).subscribe(
      
      response => {
        if (response.status == 'success' ) {
          this.status = 'success';

          this._router.navigate(['/admin/dashboard/contenidos/activar']);

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

  deleteVideo(id) {
    this._videoService.delete(this.token, id).subscribe(
      response => {
        if (response.status == 'success') {

          this.status = 'success';
          this._router.navigate(["/admin/dashboard"]);
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

  deleteImagen(id) {
    this._imagenService.delete(this.token, id).subscribe(
      response => {
        if (response.status == 'success') {

          this.status = 'success';
          this._router.navigate(["/admin/dashboard/"]);
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

  deletePost(id) {
    this._postService.delete(this.token, id).subscribe(
      response => {
        if (response.status == 'success') {

          this.status = 'success';
          this._router.navigate(["/admin/dashboard/"]);
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

  getComentario(id) {
    
    this._comentarioService.getComentario(id).subscribe(

      response => {
        if (response.status == 'success') {

          this.comments = response.comentario;
         
        }
      },
      error => {
        console.log(error);
       
      }
    );
  
  }

  onEditComentario() {
    console.log(this.comments);
    this.comments.status="ACTIVADO";
    this._comentarioService.update(this.token,this.comments,this.comments.id).subscribe(
      response => {
        if (response.status == 'success') {

          this.status = response.status;
       
          this._router.navigate(['/admin/dashboard/contenidos/activar']);
          //vaciar el formulario
        }
        else {
          this.status = 'error';
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }


 

  deleteComentario(id) {
    this._videoService.delete(this.token, id).subscribe(
      response => {
        if (response.status == 'success') {

          this.status = 'success';
          this._router.navigate(["/admin/dashboard"]);
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
