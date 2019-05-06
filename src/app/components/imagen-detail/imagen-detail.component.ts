import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { Imagen } from '../../models/imagen';
import { UserService } from '../../services/user.service';
import { ImagenService } from '../../services/Imagen.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { GLOBAL } from '../../services/global';
import { HttpClient } from '@angular/common/http';
import { Comentario } from '../../models/comentario';
import { ComentarioService } from '../../services/comentario.service';

@Component({
  selector: 'app-imagen-detail',
  templateUrl: './imagen-detail.component.html',
  providers: [UserService, ImagenService, ComentarioService]
})
export class ImagenDetailComponent implements OnInit {
  public title: string;
  public token;
  public identity;
  public imagen: Imagen;
  public status: string;
  public selectedFile: File = null;
  public url;
  public imagenes: Array<Imagen>;
  public comentarios: Array<any>;
  public comments: Comentario;
  public id;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _imagenService: ImagenService,
    private _comentarioService: ComentarioService,
    private http: HttpClient
  ) {

    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.url = GLOBAL.url;

  }
  ngOnInit() {
    console.log("se ha cargado el componente de detail");
    if (this.identity == null) {
      this._router.navigate(["login"]);
    } else {

      this.imagen = new Imagen(1,
        this.identity.sub,
        '',
        'ACTIVAR',
        '');

      this._route.params.subscribe(params => {
        this.id = +params['id'];


        this.getImagen(this.id);


      });

      this.comments = new Comentario(1,
        this.identity.sub,
        '',
        "ACTIVAR",
        1,
        null,
        null);

    }

  }

  getImagen(id) {
    this._imagenService.getImagen(id).subscribe(

      response => {
        if (response.status == 'success') {

          console.log(response);
          this.imagenes = response.imagenes;
          this.comentarios = response.comentarios;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  //para subir el comentario

  onSubmit(form) {

    this.comments.comentario = form.value.comentario;
    this.comments.imagen_id = this.id;
    this._comentarioService.store(this.comments, this.token).subscribe(
      response => {
        if (response.status == 'success') {

          this.status = 'success';
          this.status = response.status;
          //vaciar el formulario
          this.comments = new Comentario(1, this.identity.sub, '', 'ACTIVAR', 1, 1, 1);
          this.getImagen(this.id);
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
    this._comentarioService.delete(this.token, id).subscribe(
      response => {
        if (response.status == 'success') {

          this.status = 'success';
          this.getImagen(this.id);
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
