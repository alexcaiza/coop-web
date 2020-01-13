import { SiblingService } from './modules/services-sibling/sibling.service';

import { AppRoutingModule } from './app-routing.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainComponent } from './main/main.component';
import { DepositosMainComponent } from './modules/depositos/depositos-main/depositos-main.component';
import { DepositosNavbarComponent } from './modules/depositos/depositos-navbar/depositos-navbar.component';
import { PagosMainComponent } from './modules/pagos/pagos-main/pagos-main.component';
import { PagosNavbarComponent } from './modules/pagos/pagos-navbar/pagos-navbar.component';
import { ReportesNavbarComponent } from './modules/reportes/reportes-navbar/reportes-navbar.component';
import { ReportesMainComponent } from './modules/reportes/reportes-main/reportes-main.component';
import { DepositosListComponent } from './modules/depositos/depositos-list/depositos-list.component';
import { DepositosSearchComponent } from './modules/depositos/depositos-search/depositos-search.component';
import { DepositosListSearchComponent } from './modules/depositos/depositos-list-search/depositos-list-search.component';
import { DepositosListContentComponent } from './modules/depositos/depositos-list-content/depositos-list-content.component';
import { DepositosSociosComponent } from './modules/depositos/depositos-socios/depositos-socios.component';
import { DepositosSociosSearchComponent } from './modules/depositos/depositos-socios-search/depositos-socios-search.component';
import { DepositosSociosContentComponent } from './modules/depositos/depositos-socios-content/depositos-socios-content.component';
import { PagosListComponent } from './modules/pagos/pagos-list/pagos-list.component';
import { PagosSearchComponent } from './modules/pagos/pagos-search/pagos-search.component';
import { PagosListSearchComponent } from './modules/pagos/pagos-list-search/pagos-list-search.component';
import { PagosListContentComponent } from './modules/pagos/pagos-list-content/pagos-list-content.component';
import { PagosModalComponent } from './modules/pagos/pagos-modal/pagos-modal.component';
import { DepositosCreateComponent } from './modules/depositos/depositos-create/depositos-create.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    MainComponent,
    DepositosMainComponent,
    DepositosNavbarComponent,
    PagosMainComponent,
    PagosNavbarComponent,
    ReportesNavbarComponent,
    ReportesMainComponent,
    DepositosListComponent,
    DepositosSearchComponent,
    DepositosListSearchComponent,
    DepositosListContentComponent,
    DepositosSociosComponent,
    DepositosSociosSearchComponent,
    DepositosSociosContentComponent,
    PagosListComponent,
    PagosSearchComponent,
    PagosListSearchComponent,
    PagosListContentComponent,
    PagosModalComponent,
    DepositosCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [SiblingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
