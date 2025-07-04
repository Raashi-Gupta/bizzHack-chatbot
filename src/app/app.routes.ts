import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { UploadComponent } from './upload/upload.component';

export const routes: Routes = [
  { path: '', component: ChatPageComponent },      
  { path: '**', redirectTo: '' },
  { path: 'upload', component: UploadComponent },                      
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
