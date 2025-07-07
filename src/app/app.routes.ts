import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { UploadComponent } from './upload/upload.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { LoginComponent } from './login/login.component';
import { MainLayoutComponent } from './main-layout.component';
import { AuthLayoutComponent } from './auth-layout.component';

export const routes: Routes = [
  // { path: 'upload', component: UploadComponent },   
  // { path: 'chat', component: ChatPageComponent},
  // { path: 'login', component: LoginComponent},
  // { path: 'home', component: HomeScreenComponent},
  // { path: '', component: HomeScreenComponent },      
  // { path: '**', redirectTo: '' }, 
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'upload', component: UploadComponent },
      { path: 'chat', component: ChatPageComponent },
      { path: 'home', component: HomeScreenComponent },
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: '', component: HomeScreenComponent },
      { path: '**', redirectTo: '' },
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
