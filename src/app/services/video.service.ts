import { Injectable } from '@angular/core';
import { HttpClientModule, HttpHeaders  } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { GLOBAL } from './global';
import { Imagen } from '../models/imagen';
import { User } from '../models/user';
import { Comentario } from '../models/comentario';
import { Video } from '../models/video';

@Injectable()
export class VideoService{
    public url: string;
    public identity;
    public token;

    constructor(
         public _http: HttpClient
    ){
         this.url = GLOBAL.url;
         
    }

    store(video,token): Observable<any>{
        let json = JSON.stringify(video);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization',token);

        return this._http.post(this.url+'videos',params, {headers: headers} );
    }
    getVideos(): Observable<any>{
        let headers= new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.get(this.url+ 'videos',{headers: headers});   
    }

    getVideo(id): Observable<any>{
        let headers= new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.get(this.url+ 'videos/'+id ,{headers: headers});   
   
    }
    delete(token,id): Observable<any>{
        let headers= new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
        .set('Authorization',token);

        return this._http.delete(this.url+'videos/'+id,{headers:headers});
    }
    update(token, identity, id): Observable<any>{

        let json= JSON.stringify(identity);
        let params = "json="+json;

        
        let headers= new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
        .set('Authorization',token);

        return this._http.put(this.url+'videos/'+id,params,{headers:headers});

    }
}