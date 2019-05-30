import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing,appRoutingProviders } from './app.routing';
import {NgxPaginationModule} from 'ngx-pagination'; //para la pagiancion

//subir imagenes
import { AngularFileUploaderModule } from "angular-file-uploader";
//componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/registro/registro.component';
import { DefaultComponent } from './components/default/default.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { ImagenNewComponent } from './components/imagen-new/imagen-new.component';
import { ImagenDefaultComponent } from './components/imagen-default/imagen-default.component';
import { ImagenDetailComponent } from './components/imagen-detail/imagen-detail.component';
import { ComentarioNewComponent } from './components/comentario-new/comentario-new.component';
import { VideoNewComponent } from './components/video-new/video-new.component';
import { VideoDefaultComponent } from './components/video-default/video-default.component';
import { VideoDetailComponent } from './components/video-detail/video-detail.component';
import { PostNewComponent } from './components/post-new/post-new.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { PostDefaultComponent } from './components/post-default/post-default.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';

//PARA ADMIN
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminLogsComponent } from './components/admin-logs/admin-logs.component';
import { AdminUsersInactivedComponent } from './components/admin-users-inactived/admin-users-inactived.component';
import { AdminUsersActivedComponent } from './components/admin-users-actived/admin-users-actived.component';
import { AdminUsersDeletedComponent } from './components/admin-users-deleted/admin-users-deleted.component';
import { AdminContenidoActivarComponent } from './components/admin-contenido-activar/admin-contenido-activar.component';

import { AdminAddUserComponent } from './components/admin-add-user/admin-add-user.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DefaultComponent,
    UserEditComponent,
    ImagenNewComponent,
    ImagenDefaultComponent,
    ImagenDetailComponent,
    ComentarioNewComponent,
    VideoNewComponent,
    VideoDefaultComponent,
    VideoDetailComponent,
    PostNewComponent,
    PostDefaultComponent,
    PostDetailComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    AdminLogsComponent,
    AdminUsersInactivedComponent,
    AdminUsersActivedComponent,
    AdminUsersDeletedComponent,

    AdminContenidoActivarComponent,
    AdminAddUserComponent

    AdminContenidoActivarComponent

    
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    AngularFileUploaderModule,
    CKEditorModule,
    NgxPaginationModule
  ],
  providers: [
    appRoutingProviders
],
  bootstrap: [AppComponent]
})
export class AppModule { }
