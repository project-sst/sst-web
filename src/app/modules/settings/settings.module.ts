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

library.add(fas);

@NgModule({
  declarations: [
  	GlobalComponent,
  	EventTypesComponent,
  	CitiesComponent,
  	AccidentTypeComponent,
  	ContractTypeComponent,
  	SurveyQuestionsComponent,
  	EvaluationSystemComponent,
  	ComplianceEvidenceComponent,
  	DisabilityDiagnosisComponent,
  	FrecuencyComponent,
  	SourceInformationComponent,
  	DepartmentComponent,
  	InjuryTypeComponent,
  	IndicatorTypeComponent,
  	ResourceTypeComponent,
  	ResponsabilityTypeComponent,
  	BodyPartComponent,
  	ActivityTypeComponent,
  	InstructorSuitabilityComponent,
  	CompanyTypesComponent
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
