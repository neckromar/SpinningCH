import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing,appRoutingProviders } from './app.routing';

//subir imagenes
import { AngularFileUploaderModule } from "angular-file-uploader";
//componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/registro/registro.component';
import { DefaultComponent } from './components/default/default.component';
import { UserNewComponent } from './components/user-new/user-new.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { ImagenNewComponent } from './components/imagen-new/imagen-new.component';
import { ImagenDefaultComponent } from './components/imagen-default/imagen-default.component';
import { ImagenDetailComponent } from './components/imagen-detail/imagen-detail.component';
import { ComentarioNewComponent } from './components/comentario-new/comentario-new.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DefaultComponent,
    UserNewComponent,
    UserEditComponent,
    ImagenNewComponent,
    ImagenDefaultComponent,
    ImagenDetailComponent,
    ComentarioNewComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    AngularFileUploaderModule
  ],
  providers: [
    appRoutingProviders
],
  bootstrap: [AppComponent]
})
export class AppModule { }
