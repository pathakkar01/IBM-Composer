import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RESTUIComponent } from './restui/restui.component';

const routes: Routes = [
  { path: 'RESTUI', component: RESTUIComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
