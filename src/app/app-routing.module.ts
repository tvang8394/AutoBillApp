import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './Components/main/main.component';
import { ResidentListComponent } from './Components/resident-list/resident-list.component';
import { ResidentDetailComponent } from './Components/resident-detail/resident-detail.component';
import { BillingDetailComponent } from './Components/billing-detail/billing-detail.component';
import { LoginComponent } from './Components/login/login.component';
import  { AuthGuard } from './Guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  { path: 'main', component: MainComponent, canActivate: [AuthGuard] },
  { path: 'resident-list', component: ResidentListComponent, canActivate: [AuthGuard] },
  { path: 'detail/:id', component: ResidentDetailComponent, canActivate: [AuthGuard] },
  { path: 'billing-detail/:id', component: BillingDetailComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }