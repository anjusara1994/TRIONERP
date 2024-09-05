// // app.route.ts
// import { Routes } from '@angular/router';
// import { UserLoginComponent } from './User/Login/UserLogin.component';
// import { LeadAddComponent } from './Lead/Master/LeadAdd.component';
// import { LeadListComponent } from './Lead/Master/LeadList.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { ScreeningComponent } from './Lead/Screening.component';
// import { CreateELComponent } from './Lead/EngagementLetter/CreateEL.component';
// import { ViewEngagementLetter } from './Lead/EngagementLetter/ViewEngagementLetter.component';
// import { LayoutComponent } from './layout.component';

// export const routes: Routes = [
//   component: LayoutComponent,
//   { path: 'login', component: UserLoginComponent },
//   { path: 'Lead', component: LeadAddComponent },
//   { path: 'LeadList', component: LeadListComponent },
//   { path: 'Dashboard', component: DashboardComponent },
//   { path: 'Screening', component: ScreeningComponent },
//   { path: 'EL', component: CreateELComponent },
//   { path: 'ViewEL/:autoid/:clientid', component: ViewEngagementLetter },
//   { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default redirect to /login
//   { path: '**', redirectTo: '/login' } // Wildcard route for unknown paths
// ];

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
import { LayoutComponent } from './layout.component';

export const routes: Routes = [
  { path: 'login', component: UserLoginComponent },

  // Routes that use the LayoutComponent as the parent
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'Dashboard', component: DashboardComponent },
      { path: 'Lead', component: LeadAddComponent },
      { path: 'LeadList', component: LeadListComponent },
      { path: 'Screening', component: ScreeningComponent },
      { path: 'EL', component: CreateELComponent },
      { path: 'EL', component: CreateELComponent },
      { path: 'Services', component: ServiceListComponent },
      { path: 'AddServices', component: servicelistaddComponent },
      { path: 'ViewEL/:autoid/:clientid', component: ViewEngagementLetter },
    ]
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default redirect to /login
  { path: '**', redirectTo: '/login' } // Wildcard route for unknown paths
];
