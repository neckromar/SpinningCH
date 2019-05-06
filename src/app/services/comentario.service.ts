import { Injectable } from '@angular/core';
import { HttpClientModule, HttpHeaders  } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { GLOBAL } from './global';
import { Imagen } from '../models/imagen';
import { User } from '../models/user';
import { Comentario } from '../models/comentario';

@Injectable()
export class ComentarioService{
    public url: string;
    public identity;
    public token;

    constructor(
         public _http: HttpClient
    ){
         this.url = GLOBAL.url;
         
    }

    store(comentario,token): Observable<any>{
        let json = JSON.stringify(comentario);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization',token);

        return this._http.post(this.url+'comentario',params, {headers: headers} );
    }

    delete(token,id): Observable<any>{
        let headers= new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
        .set('Authorization',token);

        return this._http.delete(this.url+'comentario/'+id,{headers:headers});
    }

    update(token, comentario, id): Observable<any>{

        let json= JSON.stringify(comentario);
        let params = "json="+json;

        
        let headers= new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
        .set('Authorization',token);

        return this._http.put(this.url+'comentario/'+id,params,{headers:headers});

    }
    getComentario(id): Observable<any>{
        let headers= new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.get(this.url+ 'comentario/'+id ,{headers: headers});   
   
    }
    
}
