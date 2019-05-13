import { Injectable } from '@angular/core';
import { HttpClientModule, HttpHeaders  } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { GLOBAL } from './global';
import { Imagen } from '../models/imagen';
import { User } from '../models/user';

@Injectable()
export class PostService{
    public url: string;
    public identity;
    public token;

    constructor(
         public _http: HttpClient
    ){
         this.url = GLOBAL.url;
         
    }

    store(post,token): Observable<any>{
        let json = JSON.stringify(post);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization',token);

        return this._http.post(this.url+'posts',params, {headers: headers} );
    }
   
}
