import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { Imagen } from '../../models/imagen';
import { Video } from '../../models/video';
import { UserService } from '../../services/user.service';
import { ImagenService } from '../../services/Imagen.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { GLOBAL } from '../../services/global';
import { HttpClient } from '@angular/common/http';
import { VideoService } from 'src/app/services/video.service';


@Component({
  selector: 'app-video-default',
  templateUrl: './video-default.component.html',
  providers: [UserService, ImagenService, VideoService]
})
export class VideoDefaultComponent implements OnInit {
  public title: string;
  public token;
  public identity;
  public imagen: Imagen;
  public video: Video;
  public status: string;
  public selectedFile: File = null;
  public url;
  public imagenes: Array<Imagen>;
  public videos: Array<Video>;



  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _imagenService: ImagenService,
    private _videoService: VideoService,
    private http: HttpClient
  ) {

    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.url = GLOBAL.url;

  }
  ngOnInit() {

    if (this.identity == null) {
      this._router.navigate(["login"]);
    } else {

      this.getVideos();
    }

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

  onEditVideo(editarVideoForm) {
   //funcion para modificar el propio usuario
 this.video.status='ACEPTADO';
this.video.description = editarVideoForm.value.description;
this.video.title = editarVideoForm.value.title;

    this._videoService.update(this.token, this.video, this.video.id).subscribe(
      
      response => {
        if (response.status == 'success' ) {
          this.status = 'success';

          this._router.navigate(['/videos/listado']);

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

  getVideos() {
    this._videoService.getVideos().subscribe(

      response => {
        if (response.status == 'success') {

          this.videos = response.videos;
          console.log(this.videos);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteVideo(id) {
    this._videoService.delete(this.token, id).subscribe(
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
