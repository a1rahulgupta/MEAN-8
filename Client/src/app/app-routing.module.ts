import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent, homeChildRoutes } from './components/home/home.component';


// Parent Routes
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: homeChildRoutes,
    canActivate: []
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
