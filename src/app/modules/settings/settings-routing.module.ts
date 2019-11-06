import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Imports components
import { GlobalComponent } from './components/global/global.component';
import { EventTypesComponent } from './components/event-types/event-types.component';
import { AccidentTypeComponent } from './components/accident-type/accident-type.component';
import { CitiesComponent } from './components/cities/cities.component';
import { ContractTypeComponent } from './components/contract-type/contract-type.component';
import { SurveyQuestionsComponent } from './components/survey-questions/survey-questions.component';
import { EvaluationSystemComponent } from './components/evaluation-system/evaluation-system.component';
import { ComplianceEvidenceComponent } from './components/compliance-evidence/compliance-evidence.component';
import { DisabilityDiagnosisComponent } from './components/disability-diagnosis/disability-diagnosis.component';
import { FrecuencyComponent } from './components/frecuency/frecuency.component';
import { SourceInformationComponent } from './components/source-information/source-information.component';
import { DepartmentComponent } from './components/department/department.component';
import { InjuryTypeComponent } from './components/injury-type/injury-type.component';
import { IndicatorTypeComponent } from './components/indicator-type/indicator-type.component';
import { ResourceTypeComponent } from './components/resource-type/resource-type.component';
import { ResponsabilityTypeComponent } from './components/responsability-type/responsability-type.component';
import { BodyPartComponent } from './components/body-part/body-part.component';
import { ActivityTypeComponent } from './components/activity-type/activity-type.component';
import { InstructorSuitabilityComponent } from './components/instructor-suitability/instructor-suitability.component';
import { CompanyTypesComponent } from './components/company-types/company-types.component';

const routes: Routes = [
	{path: 'settings',
		children: [
			{ path: '', redirectTo: 'global', pathMatch:'full' },
			{ path: 'global', component: GlobalComponent },
			{ path: 'event-types', component: EventTypesComponent },			
			{ path: 'accident-types', component: AccidentTypeComponent },
			{ path: 'cities', component: CitiesComponent },
			{ path: 'contract-types', component: ContractTypeComponent },
			{ path: 'survey-questions', component: SurveyQuestionsComponent },
			{ path: 'evaluation-systems', component: EvaluationSystemComponent },
			{ path: 'compliance-evidences', component: ComplianceEvidenceComponent },
			{ path: 'disability-diagnosis', component: DisabilityDiagnosisComponent },
			{ path: 'frecuencys', component: FrecuencyComponent },
			{ path: 'source-information', component: SourceInformationComponent },
			{ path: 'departments', component: DepartmentComponent },
			{ path: 'injury-types', component: InjuryTypeComponent },
			{ path: 'indicator-types', component: IndicatorTypeComponent },
			{ path: 'resource-types', component: ResourceTypeComponent },
			{ path: 'responsability-types', component: ResponsabilityTypeComponent },
			{ path: 'body-parts', component: BodyPartComponent },
			{ path: 'activity-types', component: ActivityTypeComponent },
			{ path: 'instructor-suitability', component: InstructorSuitabilityComponent },
			{ path: 'company-types', component: CompanyTypesComponent }
		]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
