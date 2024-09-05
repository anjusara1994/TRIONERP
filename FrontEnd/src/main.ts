import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { AppModule } from './app/app.module'; 
import { LeadAddComponent } from './app/Lead/Master/LeadAdd.component';
import { UserLoginComponent } from './app/User/Login/UserLogin.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));