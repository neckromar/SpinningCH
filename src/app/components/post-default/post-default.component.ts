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
import { CKEditorComponent } from 'ng2-ckeditor';
@Component({
  selector: 'app-post-default',
  templateUrl: './post-default.component.html',
  providers: [UserService,ImagenService,PostService]
})
export class PostDefaultComponent implements OnInit {
  public title: string;
  public token;
  public identity;
  public posts : Post;
  public status: string;
  public selectedFile: File = null;
  public url;
  public imagenes: Array<Imagen>;


  
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _postService: PostService,
    private _imagenService: ImagenService,
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
   
    this.posts= new Post(1,
      this.identity.sub,
      '',
     '',
     'ACTIVAR');

     this.getPosts();
    
  }
   
  }

getPosts() {
    this._postService.getPosts().subscribe(

      response => {
        if (response.status == 'success') {

          this.posts = response.posts;
       
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
