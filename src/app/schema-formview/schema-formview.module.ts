import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DynamicTableModule } from '../dynamic-table/dynamic-table.module';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DynamicFormPageComponent } from './components/dynamic-form-page/dynamic-form-page.component';
import { DynamicFormDataPageComponent } from './components/dynamic-form-data-page/dynamic-form-data-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {path:'formgenerate',component:DynamicFormPageComponent},
  {path:'schemadata',component:DynamicFormDataPageComponent}


];



@NgModule({
  declarations: [
    DynamicFormComponent,
    DynamicFormPageComponent,
    DynamicFormDataPageComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    DynamicTableModule,
    RouterModule.forChild(routes),
  ]
})
export class SchemaFormviewModule { }
