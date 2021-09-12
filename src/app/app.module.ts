import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

// MDB Modules
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { CardsComponent } from './Components/cards/cards.component';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './Components/main/main.component';
import { ResidentListComponent } from './Components/resident-list/resident-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ResidentDetailComponent } from './Components/resident-detail/resident-detail.component';
import { BillingDetailComponent } from './Components/billing-detail/billing-detail.component';
import { ModalComponent } from './Components/modal/modal.component';
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from './Components/login/login.component';
import { AddResidentComponent } from './Components/add-resident/add-resident.component';
import { EditResidentModalComponent } from './Components/edit-resident-modal/edit-resident-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CardsComponent,
    MainComponent,
    ResidentListComponent,
    ResidentDetailComponent,
    BillingDetailComponent,
    ModalComponent,
    LoginComponent,
    AddResidentComponent,
    EditResidentModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
