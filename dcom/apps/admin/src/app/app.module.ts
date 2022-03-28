import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
//import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';
import { InputTextModule } from 'primeng/inputtext';

const routes: Routes = [
    {
        path: '',
        component: ShellComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent }
            //{ path: 'categories', component: CategoriesListComponent },
            //{ path: 'categories/form', component: CategoriesFormComponent }
        ]
    }
];
@NgModule({
    declarations: [AppComponent, DashboardComponent, ShellComponent, SidebarComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
