import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//Icons imports
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { NgxLoadingModule } from 'ngx-loading';
//App imports 
import { EmpresasService } from '@project-sst/sst-api';
import { CompaniesRoutingModule } from './companies-routing.module';
import { CompaniesComponent } from './components/companies/companies.component';

library.add(fas);

@NgModule({
  declarations: [CompaniesComponent],
  imports: [
    CommonModule,
    FormsModule,
    CompaniesRoutingModule,
    FontAwesomeModule,
    NgxLoadingModule    
  ],
  providers: [
  	EmpresasService
  ]
})
export class CompaniesModule { }
