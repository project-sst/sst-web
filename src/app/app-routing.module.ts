import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { CompaniesComponent } from './modules/companies/components/companies/companies.component';

const routes: Routes = [
  { path: '' , component: HomeComponent, pathMatch: 'full'},  
  { path: 'home' , component: HomeComponent, pathMatch: 'full'},
  { path: 'companies', component: CompaniesComponent, pathMatch: 'full' },
  { path: 'settings', redirectTo: 'settings/global', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
