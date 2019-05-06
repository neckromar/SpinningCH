import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { Imagen } from '../../models/imagen';
import { UserService } from '../../services/user.service';
import { ImagenService } from '../../services/Imagen.service';
import { ComentarioService } from '../../services/comentario.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { GLOBAL } from '../../services/global';
import { HttpClient } from '@angular/common/http';
import { Comentario } from '../../models/comentario';

@Component({
  selector: 'app-comentario-new',
  templateUrl: './comentario-new.component.html',
  styleUrls: ['./comentario-new.component.css'],
  providers: [UserService, ImagenService, ComentarioService]
})
export class ComentarioNewComponent implements OnInit {
  public comentario: Comentario;
  public token;
  public identity;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _imagenService: ImagenService,
    private _comentarioService: ComentarioService,
    private http: HttpClient
  ) {

    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
  }

  ngOnInit() {

    if (this.identity == null || this.identity == "") {
      this._router.navigate(["/login"]);
    }
    else {
      this.comentario = new Comentario(1,
        this.identity.sub,
        '',
        "ACTIVAR",
        1,
        1,
        1);
    }
  }

  onSubmit(form) {
    this.comentario.comentario = form.value.comentario;
    this.comentario.imagen_id = form.value.imagen_id;
    console.log(form);
    console.log(this.comentario);
    this._comentarioService.store(this.comentario, this.token).subscribe(
    
      response => {
        console.log(this.comentario);
        if (response.status == 'success') {

          this.status = 'success';
          this.status = response.status;
          //vaciar el formulario
          this.comentario = new Comentario(1, this.identity.sub, '', 'ACTIVAR', 1, 1, 1);


        }
        else {
          this.status = 'error';
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }


}
