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
import { CKEditorComponent } from 'ng2-ckeditor';

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
  public contenidos;
  public posts: Array<Post>;
  public comentarios: Array<any>;
  public id;
  public verdadero:Boolean;
  public comments: Comentario;
  public contenido_post:string;
  public ckeditorContent;
  public ckeConfig;
  public angular;

  @ViewChild(CKEditorComponent) ckeditor: CKEditorComponent;
  
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
      
          this.ckeConfig = {
            allowedContent: false,
            extraPlugins: 'divarea',
            forcePasteAsPlainText: true,
            toolbar : [
              { name: 'document', groups: [ 'mode', 'document', 'doctools' ], items: [ 'Source', '-', 'Save', 'NewPage', 'Preview', 'Print', '-', 'Templates' ] },
              { name: 'clipboard', groups: [ 'clipboard', 'undo' ], items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
              { name: 'editing', groups: [ 'find', 'selection', 'spellchecker' ], items: [ 'Find', 'Replace', '-', 'SelectAll', '-', 'Scayt' ] },
              { name: 'forms', items: [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField' ] },
              '/',
              { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ], items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat' ] },
              { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ], items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language' ] },
              { name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
              { name: 'insert', items: [ 'Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe' ] },
              '/',
              { name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize' ] },
              { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
              { name: 'tools', items: [ 'Maximize', 'ShowBlocks' ] },
              { name: 'others', items: [ '-' ] },
              { name: 'about', items: [ 'About' ] }
            ],
            toolbarGroups : [
              { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
              { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
              { name: 'editing', groups: [ 'find', 'selection', 'spellchecker' ] },
              { name: 'forms' },
              '/',
              { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
              { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
              { name: 'links' },
              { name: 'insert' },
              '/',
              { name: 'styles' },
              { name: 'colors' },
              { name: 'tools' },
              { name: 'others' },
              { name: 'about' }
            ]
          };

        
      });

    

    }

  }
  
  

  onEditPost(myForm) {
   //funcion para modificar el propio usuario
 this.post.status='ACEPTADO';
 
this.post.description = myForm.value.description;
this.post.title = myForm.value.title;

    this._postService.update(this.token, this.post, this.post.id).subscribe(
      
      response => {
        if (response.status == 'success' ) {
          this.status = 'success';

          this._router.navigate(['/home']);

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

  getPost(id) {
    this._postService.getPost(id).subscribe(

      response => {
        if (response.status == 'success') {

          if(response.post.status != 'ACEPTADO' && this.identity.role_id != 1) {
            this._router.navigate(["posts/listado"]);
          }else{
            this.post = response.post;

            this.comentarios = response.comentarios;
            this.contenidos = this.post.description;
          }
        
         
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
