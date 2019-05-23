import { Injectable } from '@angular/core';
import { HttpClientModule, HttpHeaders  } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { GLOBAL } from './global';
import { User } from '../models/user';

@Injectable()
export class AdminService{
    public url: string;
    public identity;
    public token;

    constructor(
         public _http: HttpClient,
    ){
         this.url = GLOBAL.url;
    }

   

    signup(user,gettoken =null): Observable<any>{
        if(gettoken !=null){
            user.gettoken='true';
        }
        let json = JSON.stringify(user);
        let params = 'json='+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url+'admin/login',params, {headers: headers} );
    }

    getIdentity(){
        let identity =JSON.parse(localStorage.getItem('identity'));

        if(identity != "undefined"){
            this.identity = identity;
        }
        else{
            this.identity = null;
        }
        return  this.identity
    }

    getToken(){
        let token = localStorage.getItem('token');

        if(token != "undefined"){
            this.token = token;
        }else{
            this.token =null;
        }
        return this.token
    }

    getLogs(): Observable<any>{
        let headers= new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.get(this.url+ 'admin/dashboard/logs',{headers: headers});   
    }
    getUsers_inactived(): Observable<any>{
        let headers= new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.get(this.url+ 'admin/dashboard/users_inactived',{headers: headers});   
    }
    getUsers_actived(): Observable<any>{
        let headers= new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.get(this.url+ 'admin/dashboard/users_actived',{headers: headers});   
    }
    getUser(id): Observable<any>{
        let headers= new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.get(this.url+ 'admin/dashboard/user/'+id ,{headers: headers});   
    }
  
    update(token, identity, id): Observable<any>{

        let json= JSON.stringify(identity);
        let params = "json="+json;

        
        let headers= new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
        .set('Authorization',token);

        return this._http.put(this.url+'admin/dashboard/user/update/'+id,params,{headers:headers});

    }

    getUsers_deleted(): Observable<any>{
        let headers= new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.get(this.url+ 'admin/dashboard/users_deleted',{headers: headers});   
    }
}
