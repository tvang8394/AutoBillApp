import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './Components/main/main.component';
import { ResidentListComponent } from './Components/resident-list/resident-list.component';
import { ResidentDetailComponent } from './Components/resident-detail/resident-detail.component';
import { BillingDetailComponent } from './Components/billing-detail/billing-detail.component';
import { LoginComponent } from './Components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  { path: 'main', component: MainComponent },
  { path: 'resident-list', component: ResidentListComponent },
  { path: 'detail/:id', component: ResidentDetailComponent },
  { path: 'billing-detail/:id', component: BillingDetailComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }