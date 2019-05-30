import { Injectable } from '@angular/core';
import { HttpClientModule, HttpHeaders  } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { GLOBAL } from './global';
import { Imagen } from '../models/imagen';
import { User } from '../models/user';

@Injectable()
export class ImagenService{
    public url: string;
    public identity;
    public token;

    constructor(
         public _http: HttpClient
    ){
         this.url = GLOBAL.url;
         
    }

    store(imagen,token): Observable<any>{
        let json = JSON.stringify(imagen);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization',token);

        return this._http.post(this.url+'imagenes',params, {headers: headers} );
    }
    getImagenes(): Observable<any>{
        let headers= new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.get(this.url+ 'imagenes',{headers: headers});   
    }

    getImagen(id): Observable<any>{
        let headers= new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.get(this.url+ 'imagenes/'+id ,{headers: headers});   
   
    }
    delete(token,id): Observable<any>{
        let headers= new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
        .set('Authorization',token);

        return this._http.delete(this.url+'imagenes/'+id,{headers:headers});
    }

    update(token, identity, id): Observable<any>{

        let json= JSON.stringify(identity);
        let params = "json="+json;

        
        let headers= new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
        .set('Authorization',token);

        return this._http.put(this.url+'imagenes/'+id,params,{headers:headers});

    }
}
