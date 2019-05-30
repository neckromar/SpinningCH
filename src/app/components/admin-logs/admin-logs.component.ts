import { Component, OnInit,ViewChild, ElementRef  } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { AdminService } from '../../services/admin.service';
import * as jsPDF from 'jspdf';

import { Log} from '../../models/log';
@Component({
  selector: 'app-admin-logs',
  templateUrl: './admin-logs.component.html',
  styleUrls: ['./admin-logs.component.css'],
  providers: [UserService,AdminService]
})
export class AdminLogsComponent implements OnInit {
  public title: string;
  public user: User;
  public token;
  public identity;
  public status:string;
  public logs: Log;
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
     

      this.getLogs();
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
      'elementHandlers': specialElementHandlers
      });

      doc.save('LOGS Club Spinning Huelva.pdf');
  }

  getLogs(){
    this._adminService.getLogs().subscribe(

      response => {
        if (response.status == 'success') {

          console.log(response);
          this.logs = response.logs;
        }
      },
      error => {
        console.log(error);
      }
    );
  }


}
