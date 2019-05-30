import { ModuleWithProviders } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

//componentes
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
import { PostDefaultComponent } from './components/post-default/post-default.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminLogsComponent } from './components/admin-logs/admin-logs.component';
import { AdminUsersInactivedComponent } from './components/admin-users-inactived/admin-users-inactived.component';
import { AdminUsersActivedComponent } from './components/admin-users-actived/admin-users-actived.component';
import { AdminUsersDeletedComponent } from './components/admin-users-deleted/admin-users-deleted.component';
import { AdminContenidoActivarComponent } from './components/admin-contenido-activar/admin-contenido-activar.component';
import { AdminAddUserComponent } from './components/admin-add-user/admin-add-user.component';

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

    {path:'videos', component: VideoNewComponent},
    {path:'videos/listado', component: VideoDefaultComponent},
    {path:'videos/:id', component: VideoDetailComponent},

    {path:'posts', component: PostNewComponent},
    {path:'posts/listado', component: PostDefaultComponent},
    {path:'posts/:id', component: PostDetailComponent},

    {path:'admin',  component: AdminLoginComponent},
    {path:'admin/dashboard',  component: AdminDashboardComponent},
    {path:'admin/dashboard/logs',  component: AdminLogsComponent},
    {path:'admin/dashboard/users/inactived',  component: AdminUsersInactivedComponent},
    {path:'admin/dashboard/users/actived',  component: AdminUsersActivedComponent},
    {path:'admin/dashboard/users/deleted',  component: AdminUsersDeletedComponent},
    {path:'admin/dashboard/contenidos/activar',  component: AdminContenidoActivarComponent},
    {path:'admin/dashboard/users/add',  component: AdminAddUserComponent},
    
    
    
    
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);