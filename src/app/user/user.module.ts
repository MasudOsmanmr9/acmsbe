import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DynamicTableModule } from '../dynamic-table/dynamic-table.module';

const routes: Routes = [
  {path:'create',component:UserCreateComponent},
  {path:'user-list',component:UserListComponent},
];


@NgModule({
  declarations: [
    UserCreateComponent,
    UserListComponent,
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicTableModule,
    RouterModule.forChild(routes),
  ]
})
export class UserModule { }
