import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//Icons imports
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
//App imports 
import { SettingsRoutingModule } from './settings-routing.module';
import { GlobalComponent } from './components/global/global.component';
import { EventTypesComponent } from './components/event-types/event-types.component';
import { CitiesComponent } from './components/cities/cities.component';

library.add(fas);

@NgModule({
  declarations: [
  	GlobalComponent,
  	EventTypesComponent,
  	CitiesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SettingsRoutingModule,
    FontAwesomeModule
  ]
})
export class SettingsModule { }
