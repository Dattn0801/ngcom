import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
//App component
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';

//Primeng Component
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CategoriesService } from '@dcom/products';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { UserFormComponent } from './pages/users/user-form/user-form.component';
import { TagModule } from 'primeng/tag';

const UX_MODULE = [
    CardModule,
    ToolbarModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    ToastModule,
    ConfirmDialogModule,
    ColorPickerModule,
    InputNumberModule,
    InputTextareaModule,
    InputSwitchModule,
    DropdownModule,
    EditorModule,
    TagModule
];
const routes: Routes = [
    {
        path: '',
        component: ShellComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'categories', component: CategoriesListComponent },
            { path: 'categories/form', component: CategoriesFormComponent },
            { path: 'categories/form/:id', component: CategoriesFormComponent },
            { path: 'products', component: ProductsListComponent },
            { path: 'products/form', component: ProductsFormComponent },
            { path: 'products/form/:id', component: ProductsFormComponent },
            { path: 'users', component: UserListComponent },
            { path: 'users/form', component: UserFormComponent },
            { path: 'users/form/:id', component: UserFormComponent }
        ]
    }
];
@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        ShellComponent,
        SidebarComponent,
        CategoriesListComponent,
        CategoriesFormComponent,
        ProductsListComponent,
        ProductsFormComponent,
        UserListComponent,
        UserFormComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
        ...UX_MODULE
    ],
    providers: [CategoriesService, MessageService, ConfirmationService],
    bootstrap: [AppComponent]
})
export class AppModule {}
