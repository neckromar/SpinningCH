
import { Component, OnInit,ViewChild, ElementRef  } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { AdminService } from '../../services/admin.service';
import * as jsPDF from 'jspdf';

import { Log} from '../../models/log';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-admin-users-actived',
  templateUrl: './admin-users-actived.component.html',
  styleUrls: ['./admin-users-actived.component.css'],
  providers: [UserService,AdminService]
})
export class AdminUsersActivedComponent implements OnInit {
  public title: string;
  public token;
  public identity;
  public status:string;
  public users: User;
  public user: User;

  constructor(
    private _userService: UserService,
    private _adminService: AdminService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
   
  }
  ngOnInit() {
    if(this.identity == null || this.identity.role_id != 1  ){
      this._router.navigate(['home']);
    }else if(this.identity.role_id == 1){
     

      this.getUsers_actived();
    }
  }

  @ViewChild('content') content: ElementRef;
  downloadPDF(){

      let doc = new jsPDF();

      let specialElementHandlers = {
      '#editor': function(element, renderer){
          return true;
      }};

      let content = this.content.nativeElement;

      doc.fromHTML(content.innerHTML, 10, 10, {
      'width': '350px',
      'elementHandlers': specialElementHandlers
      });

      doc.save('Usuarios ACTIVOS Club Pesca Huelva.pdf');
  }

 //funcion para modificar el propio usuario
 onEdit(form,event) {
   console.log(form);
   this.user.name=form.value.name;
   this.user.surname=form.value.surname;
   this.user.email=form.value.email;
   this.user.role_id=form.value.role_id;

  this._adminService.update(this.token, this.user, this.user.id).subscribe(
    
    response => {
      if (response.status == 'success' ) {
        this.status = 'success';
       
        this._router.navigate(['/admin/dashboard/users/actived']);

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

getUser(id) {
    
  this._adminService.getUser(id).subscribe(

    response => {
      if (response.status == 'success') {

        this.user = response.user;
       
      }
    },
    error => {
      console.log(error);
     
    }
  );

}
  
  getUsers_actived(){
    this._adminService.getUsers_actived().subscribe(

      response => {
        if (response.status == 'success') {

          console.log(response);
          this.users = response.users;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  
  deleteUser(id){
    this._userService.delete(this.token, id).subscribe(
      response => {
        if (response.status == 'success') {

          this.status = 'success';

          this._router.navigate(['/admin/dashboard/users/inactived']);
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
