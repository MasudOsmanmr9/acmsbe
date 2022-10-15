import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormDatatableComponent } from './components/dynamic-form-datatable/dynamic-form-datatable.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  declarations: [
    DynamicFormDatatableComponent
  ],
  imports: [
    CommonModule,
    NgxDatatableModule
  ],
  exports:[DynamicFormDatatableComponent],
})
export class DynamicTableModule { }


