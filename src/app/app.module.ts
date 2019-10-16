//Angular imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//App imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
//Icons imports
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { NgxLoadingModule } from 'ngx-loading';
//Modules imports
import { SettingsModule } from './modules/settings/settings.module';
//Api imports
import { ApiModule, BASE_PATH } from '@project-sst/sst-api';
//Main components imports
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ContainerComponent } from './components/container/container.component';

library.add(fas);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    ApiModule,
    SettingsModule,
    NgxLoadingModule.forRoot({})    
  ],
  providers: [{provide: BASE_PATH, useValue: environment.API_BASE_PATH}],
  bootstrap: [AppComponent]
})
export class AppModule { }
