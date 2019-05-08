import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { Imagen} from '../../models/imagen';
import { Video} from '../../models/video';
import { UserService } from '../../services/user.service';
import { ImagenService } from '../../services/Imagen.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { GLOBAL} from '../../services/global';
import { HttpClient } from '@angular/common/http';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-video-new',
  templateUrl: './video-new.component.html',
  providers: [UserService,ImagenService,VideoService]
})
export class VideoNewComponent implements OnInit {
  public title: string;
  public token;
  public identity;
  public video : Video;
  public status: string;
  public selectedFile: File = null;
  public url;
  
  //para la miniatura
  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.jpeg",
    maxSize: "50",
    uploadAPI:  {
      url:"http://spinningch.api.com/videos/miniatura-upload",
      headers: {
     "Authorization" : this._userService.getToken()
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText: 'Sube tu miniatura'
  };
 //para el video
  public afuvConfig = {
    multiple: false,
    formatsAllowed: ".mp4",
    maxSize: "5000",
    uploadAPI:  {
      url:"http://spinningch.api.com/videos/video-upload",
      headers: {
     "Authorization" : this._userService.getToken()
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText: 'Sube tu Video'
  };



  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _imagenService: ImagenService,
    private _videoService: VideoService,
    private http: HttpClient
  ) {
    this.title = 'Añade tu video junto con la miniatura!';
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();

    
  }
  ngOnInit() {
    if(this.identity== null || this.identity =="" ){
      this._router.navigate(["/login"]);
    }
    else{
      this.video= new Video(1,
        this.identity.sub,
        '',
       '',
       'ACTIVAR',
        '',
        '');
    }
  }
//avar upload
miniaturaUpload(datos){

  let miniatura_data = JSON.parse(datos.response);
  this.video.miniatura =miniatura_data.miniatura;
}

videoUpload(datos){

  let video_data = JSON.parse(datos.response);
  this.video.video_path =video_data.video_path;
}

onSubmit(form){

this._videoService.store(this.video,this.token).subscribe(
response => {
  
    if(response.status == 'success')
        {
          this.status='success';
            this.status = response.status;
            //vaciar el formulario
            this.video= new Video(1, 1,'', '', 'ACTIVAR','', '');
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
