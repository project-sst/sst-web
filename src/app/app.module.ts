//Angular imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//App imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//Icons imports
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
//Modules imports
import { SettingsModule } from './modules/settings/settings.module';
//Main components imports
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';

library.add(fas);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    SettingsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
