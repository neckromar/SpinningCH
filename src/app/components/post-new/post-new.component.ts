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
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  providers: [UserService,ImagenService,PostService]
})
export class PostNewComponent implements OnInit {
  public title: string;
  public token;
  public identity;
  public post : Post;
  public status: string;
  public selectedFile: File = null;
  public url;
  public ckeditorContent: string ="<b>Probando</b>"
  public ckeConfig;
  @ViewChild(CKEditorComponent) ckeditor: CKEditorComponent;

   

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _postService: PostService,
    private http: HttpClient
  ) {
    this.title = 'Añade un POST!';
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();

    
  }
  ngOnInit() {
    if(this.identity== null || this.identity =="" ){
      this._router.navigate(["/login"]);
    }
    else{
      this.post= new Post(1,
        this.identity.sub,
       '',
       'ACTIVAR');

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
       
      
    }
  }
  onChange($event: any): void {
    console.log("onChange");
    //this.log += new Date() + "<br />";
  }

onSubmit(form){

this._postService.store(this.post,this.token).subscribe(
response => {
  
    if(response.status == 'success')
        {
          this.status='success';
            this.status = response.status;
            //vaciar el formulario
            this.post= new Post(1,1,'','');
            this._router.navigate(["home"]);
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
