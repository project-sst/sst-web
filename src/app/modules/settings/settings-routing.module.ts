import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Imports components
import { GlobalComponent } from './components/global/global.component';
import { EventTypesComponent } from './components/event-types/event-types.component';

const routes: Routes = [
	{path: 'settings',
		children: [
			{ path: '', redirectTo: 'global', pathMatch:'full' },
			{ path: 'global', component: GlobalComponent },
			{ path: 'event-types', component: EventTypesComponent }			
		]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
