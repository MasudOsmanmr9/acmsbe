import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionsListsComponent } from './components/collections-lists/collections-lists.component';
import { CollectionCreateComponent } from './components/collection-create/collection-create.component';
import { FormsSchemaBuilderComponent } from './components/forms-schema-builder/forms-schema-builder.component';
import { RouterModule, Routes } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DynamicTableModule } from '../dynamic-table/dynamic-table.module';



// import { CreateColectionComponent } from './components/create-colection/create-colection.component';
// import { CollectionListsComponent } from './components/collection-lists/collection-lists.component';
// import { FormsSchemaBuilderComponent } from './components/forms-schema-builder/forms-schema-builder.component';






const routes: Routes = [

  { path: 'schema-builder', component: FormsSchemaBuilderComponent },
  { path: 'collection-create', component: CollectionCreateComponent },
  { path: 'collection-list', component: CollectionsListsComponent }

];


@NgModule({
  declarations: [
    CollectionsListsComponent,
    CollectionCreateComponent,
    FormsSchemaBuilderComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
ReactiveFormsModule,
NgbModule,
    RouterModule.forChild(routes),
  ]
})
export class CollectionModule { }

// CommonModule,
// CollectionsRoutingModule,
// NgSelectModule,
// FormsModule,
// ReactiveFormsModule,
// NgbModule,
// RouterModule,
// DynamicTableModule