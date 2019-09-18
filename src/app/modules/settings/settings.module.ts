import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//Icons imports
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { NgxLoadingModule } from 'ngx-loading';
//App imports 
import { SettingsRoutingModule } from './settings-routing.module';
import { GlobalComponent } from './components/global/global.component';
import { EventTypesComponent } from './components/event-types/event-types.component';
import { CitiesComponent } from './components/cities/cities.component';
import { AccidentTypeComponent } from './components/accident-type/accident-type.component';

library.add(fas);

@NgModule({
  declarations: [
  	GlobalComponent,
  	EventTypesComponent,
  	CitiesComponent,
  	AccidentTypeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SettingsRoutingModule,
    FontAwesomeModule,
    NgxLoadingModule
  ]
})
export class SettingsModule { }
