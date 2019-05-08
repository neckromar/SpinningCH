import { ModuleWithProviders } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

//componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/registro/registro.component';
import { DefaultComponent } from './components/default/default.component';
import { UserNewComponent } from './components/user-new/user-new.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { ImagenNewComponent } from './components/imagen-new/imagen-new.component';
import { ImagenDefaultComponent } from './components/imagen-default/imagen-default.component';
import { ImagenDetailComponent } from './components/imagen-detail/imagen-detail.component';
import { ComentarioNewComponent } from './components/comentario-new/comentario-new.component';
import { VideoNewComponent } from './components/video-new/video-new.component';

const appRoutes: Routes =[
    {path:'', component:DefaultComponent},
    {path:'login', component: LoginComponent},
    {path:'registro', component: RegisterComponent},
    {path:'*', component: DefaultComponent},
    {path:'logout/:sure', component: LoginComponent},
    {path:'home', component:DefaultComponent},
    {path:'update-user',component:UserEditComponent},
    {path:'imagenes', component: ImagenNewComponent},
    {path:'imagenes/listado', component: ImagenDefaultComponent},
    {path:'imagenes/:id', component: ImagenDetailComponent},
    {path:'videos', component: VideoNewComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);