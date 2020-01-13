import { DepositosCreateComponent } from './modules/depositos/depositos-create/depositos-create.component';
import { PagosListComponent } from './modules/pagos/pagos-list/pagos-list.component';
import { DepositosSociosComponent } from './modules/depositos/depositos-socios/depositos-socios.component';
import { DepositosListComponent } from './modules/depositos/depositos-list/depositos-list.component';
import { ReportesMainComponent } from './modules/reportes/reportes-main/reportes-main.component';
import { PagosMainComponent } from './modules/pagos/pagos-main/pagos-main.component';
import { DepositosMainComponent } from './modules/depositos/depositos-main/depositos-main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
//import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'home', component: MainComponent },
    { 
        path: 'depositos', 
        component: DepositosMainComponent,
        children: [
            {
              path: 'depositos-list',
              component: DepositosListComponent
            },
            {
                path: 'depositos-create',
                component: DepositosCreateComponent
            },
            {
                path: 'depositos-socios',
                component: DepositosSociosComponent
            },
        ]
    },
    { 
        path: 'pagos', 
        component: PagosMainComponent,
        children: [
            {
              path: 'pagos-list',
              component: PagosListComponent
            },
            {
                path: 'pagos-cuotas',
                component: DepositosListComponent
            },
            {
                path: 'depositos-socios',
                component: DepositosSociosComponent
            },
        ]
    },
    { path: 'reportes', component: ReportesMainComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }