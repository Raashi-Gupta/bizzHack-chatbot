import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { UploadComponent } from './upload/upload.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { LoginComponent } from './login/login.component';
import { MainLayoutComponent } from './main-layout.component';
import { AuthLayoutComponent } from './auth-layout.component';
import { MostSearchedComponent } from './most-searched/most-searched.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [

      { path: 'upload', component: UploadComponent, canActivate: [authGuard]  },
      { path: 'chat', component: ChatPageComponent, canActivate: [authGuard]  },
      { path: 'home', component: HomeScreenComponent, canActivate: [authGuard]  },
      { path: 'most-searched', component: MostSearchedComponent, canActivate: [authGuard] },

      { path: 'login', component: LoginComponent },
      { path: '', component: HomeScreenComponent, canActivate: [authGuard] },
      { path: '**', redirectTo: '' }

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
