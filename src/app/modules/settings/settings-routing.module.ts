import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GlobalComponent } from './components/global/global.component';

const routes: Routes = [
	{path: 'settings',
		children: [
			{ path: '', redirectTo: 'global', pathMatch:'full' },
			{ path: 'global', component: GlobalComponent }
		]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
