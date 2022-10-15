// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-dynamic-form-data-page',
//   templateUrl: './dynamic-form-data-page.component.html',
//   styleUrls: ['./dynamic-form-data-page.component.css']
// })
// export class DynamicFormDataPageComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }


import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CollectionsBuilderService } from 'src/services/collections-builder-service.service';
//import { Console } from 'console';
import { FormBuilderService } from 'src/services/form-builder.service';


export interface FormSchema {
  name: string
  label: string
  value: string | boolean | null
  type: string
  validatopt: any
  selectOptions?: any[]
  // selectOptions?: string[]
}

@Component({
  selector: 'app-form-data-page',
  templateUrl: './dynamic-form-data-page.component.html',
  styleUrls: ['./dynamic-form-data-page.component.css']
})
export class DynamicFormDataPageComponent implements OnInit {

  constructor(private fbs: FormBuilderService, private cs: CollectionsBuilderService, private router:Router ) { }

  // form's collections data
  formSchemas: FormSchema[] = []

  // table components data
  storedTableData: any[] = [];
  tableFields: any[] = [];
  currentCollection: any;
  editCollectionInfo: any;
  editCollectionSchema: any;
  editDataShow: any;
  storedTableChangedSubscription:any;
  collectionchangeeventsubscription:any;
  @ViewChild('actionModalButton', { static: true }) actionModalButton !: ElementRef;

  ngOnInit(): void {
    this.storedTableChangedSubscription = this.fbs.storedTableDataChangeEvent.subscribe((storedData: any[]) => {
      this.storedTableData = storedData;
      this.tableFields = this.fbs.getTableFields();
    })

    this.collectionchangeeventsubscription = this.cs.collectionChangeEvent.subscribe((collection: any) => {
      this.fbs.setTableFields(collection?.table_fields ?? []);
      this.fbs.setCurrentCollectionInfo(collection);

      // if (localStorage.getItem(collection?.id) != null && this.currentCollection?.id !== collection.id) {
      //   this.storedTableData = [];
      //   this.fbs.newlyAssignStoredTableData(JSON.parse(localStorage.getItem(collection.id)!));
      // }
      // else {
      //   this.storedTableData = [];
      //   this.fbs.newlyAssignStoredTableData([]);
      // }
      this.storedTableData = [];
      this.fbs.newlyAssignStoredTableData([]);

      this.currentCollection = collection;

    })

    this.cs.collectionChangeEvent.emit(this.cs.getSelectedCollection());

  }

  ngOnDestroy(){
    this.collectionchangeeventsubscription.unsubscribe();
    this.storedTableChangedSubscription.unsubscribe();
  }
  editf: Function = (value: any) => {
    this.editDataShow = value;
    this.fbs.setEditData(value);
    this.editCollectionInfo = this.cs.getCollectionById(value.schemaId);
    this.editCollectionSchema = this.editCollectionInfo.schema;
   // this.actionModalButton.nativeElement.click();
    this.router.navigateByUrl('/formview/formgenerate');

  }
  deletef: Function = (value: any) => {
    this.fbs.deleteData(value);
  }
  goTopage(path: string) {
    this.router.navigateByUrl(path);
  }
}
