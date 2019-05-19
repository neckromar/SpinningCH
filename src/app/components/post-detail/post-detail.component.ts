import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { Imagen} from '../../models/imagen';
import { Post} from '../../models/post';
import { UserService } from '../../services/user.service';
import { ImagenService } from '../../services/Imagen.service';
import { PostService } from '../../services/post.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { GLOBAL} from '../../services/global';
import { HttpClient } from '@angular/common/http';
import { Comentario } from '../../models/comentario';
import { ComentarioService } from '../../services/comentario.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  providers: [UserService,PostService,ComentarioService]
})
export class PostDetailComponent implements OnInit {
  public title: string;
  public token;
  public identity;
  public post: Post;
  public status: string;
  public selectedFile: File = null;
  public url;
  public posts: Array<Imagen>;
  public comentarios: Array<any>;
  public id;
  public verdadero:Boolean;
  public comments: Comentario;
  public contenido_post:string;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _comentarioService: ComentarioService,
    private _postService: PostService,
    private http: HttpClient
  ) {

    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.url = GLOBAL.url;
    this.verdadero =false;

  }
  ngOnInit() {
    console.log("se ha cargado el componente de detail");
    if (this.identity == null) {
      this._router.navigate(["login"]);
    } else {

      this.post= new Post(1,
        this.identity.sub,
        '',
       '',
       'ACTIVAR');
  

      this._route.params.subscribe(params => {
        this.id = +params['id'];


        this.getPost(this.id);
         this.contenido_post  =this.post.description;
      
         this.comments = new Comentario(1,
          this.identity.sub,
          '',
          "ACTIVAR",
          null,
          null,
          1);
      
        
      });

    

    }

  }

  getPost(id) {
    this._postService.getImagen(id).subscribe(

      response => {
        if (response.status == 'success') {

          console.log(response);
          this.post = response.post;
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
    this.comments.post_id = this.id;
    this._comentarioService.store(this.comments, this.token).subscribe(
      response => {
        if (response.status == 'success') {

          this.status = 'success';
          this.status = response.status;
          //vaciar el formulario
           this.getPost(this.id);
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
  onEdit(form) {
    
    this.comments.comentario = form.value.comentarioeditar;
    
    this.comments.post_id = this.id;
    this._comentarioService.update(this.token,this.comments,this.comments.id).subscribe(
      response => {
        if (response.status == 'success') {

          this.verdadero=true;
          this.status = response.status;
          //vaciar el formulario
          this.getPost(this.id);
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

    
  

  deleteComentario(id) {
    this._comentarioService.delete(this.token, id).subscribe(
      response => {
        if (response.status == 'success') {

          this.status = 'success';
          this.getPost(this.id);
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
