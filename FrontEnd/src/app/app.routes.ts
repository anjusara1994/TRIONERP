import { Routes } from '@angular/router';
import { UserLoginComponent } from './User/Login/UserLogin.component';
import { LeadAddComponent } from './Lead/Master/LeadAdd.component';
import { LeadListComponent } from './Lead/Master/LeadList.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ScreeningComponent } from './Lead/Screening.component';
import { CreateELComponent } from './Lead/EngagementLetter/CreateEL.component';
import { ViewEngagementLetter } from './Lead/EngagementLetter/ViewEngagementLetter.component';
import { ServiceListComponent } from './DataMaster/service-list/service-list.component';
import { servicelistaddComponent } from './DataMaster/service-list/service-listadd.component';
import { LayoutComponent } from './Layout/layout.component';
import { ViewQuote } from './Lead/EngagementLetter/ViewQuote.component';
import { ELListComponent } from './Lead/EngagementLetter/ELList.component';
import { ReportListComponent } from './Lead/Master/ReportMaster.component';

export const routes: Routes = [
  { path: 'login', component: UserLoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'Dashboard', component: DashboardComponent },
      { path: 'Lead', component: LeadAddComponent },
      { path: 'LeadList', component: LeadListComponent },
      { path: 'Screening', component: ScreeningComponent },
      { path: 'EL', component: CreateELComponent },
      { path: 'Services', component: ServiceListComponent },
      { path: 'AddServices', component: servicelistaddComponent },
      { path: 'ELALL', component: ELListComponent },
      { path: 'Report', component: ReportListComponent },
      
    ]
  },
 { path: 'ViewQuote/:autoid/:clientid', component: ViewQuote },
 { path: 'ViewEL/:autoid/:clientid', component: ViewEngagementLetter },
  
  { path: '**', redirectTo: '/login' },
];
