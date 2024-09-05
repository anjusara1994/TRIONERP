import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './User/Login/UserLogin.component';
import { LeadAddComponent } from './Lead/Master/LeadAdd.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeadListComponent } from './Lead/Master/LeadList.component';
import { ScreeningComponent } from './Lead/Screening.component';

const routes: Routes = [
  { path: 'login', component: UserLoginComponent },
  { path: 'Lead', component: LeadAddComponent }, 
  { path: 'LeadList', component: LeadListComponent },
  { path: 'Screening', component: ScreeningComponent },
  { path: 'dashboard', component: DashboardComponent }, // Changed to 'dashboard' for consistency
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' } // Wildcard route for unknown paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
