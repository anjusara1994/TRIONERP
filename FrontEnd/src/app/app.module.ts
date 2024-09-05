import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes'; 
import { AppComponent } from './app.component';
import { UserLoginComponent } from './User/Login/UserLogin.component';
import { LeadAddComponent } from './Lead/Master/LeadAdd.component';
import { LeadListComponent } from './Lead/Master/LeadList.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms'; 
import { DropdownModule } from 'primeng/dropdown';
import { provideHttpClient, HttpClient } from '@angular/common/http'; 
import { DataTablesModule } from "angular-datatables";
import { ScreeningComponent } from './Lead/Screening.component';
import { CreateELComponent } from './Lead/EngagementLetter/CreateEL.component';
import { ViewEngagementLetter } from './Lead/EngagementLetter/ViewEngagementLetter.component';
import { LayoutComponent } from './layout.component';
import { NumberToWordsPipe } from './number-to-words.pipe'; 
import { ServiceListComponent } from './DataMaster/service-list/service-list.component';
import { servicelistaddComponent } from './DataMaster/service-list/service-listadd.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    LeadAddComponent,
    LeadListComponent,
    DashboardComponent,
    ScreeningComponent,
    CreateELComponent,
    ViewEngagementLetter,
    NumberToWordsPipe,
    LayoutComponent,
    ServiceListComponent,
    servicelistaddComponent
    
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    DropdownModule,
    NgSelectModule,
    BrowserAnimationsModule,
    CKEditorModule,
    RouterModule.forRoot(routes) // Configure RouterModule with routes
  ],
  providers: [provideHttpClient(),],
  bootstrap: [ AppComponent]
})
export class AppModule { }
