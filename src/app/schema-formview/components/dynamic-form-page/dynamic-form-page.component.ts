import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollectionsBuilderService } from 'src/services/collections-builder-service.service';
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
  selector: 'app-dynamic-form-page',
  templateUrl: './dynamic-form-page.component.html',
  styleUrls: ['./dynamic-form-page.component.css']
})
export class DynamicFormPageComponent implements OnInit {

  // storedTableData: any[] = [];
  // tableFields: any[] = [];
  currentCollection: any;
  // editCollectionInfo: any;
  // editCollectionSchema: any;
  // editDataShow: any;

  formSchemas: FormSchema[] = []
  
  editDataShow: any;

  constructor(private fbs: FormBuilderService, private cs: CollectionsBuilderService,private router:Router) { }

  ngOnInit(): void {
    this.currentCollection = this.fbs.getCurrentCollectionInfo();
    console.log('current collection info from dynamic form page',this.currentCollection);
    this.formSchemas = this.currentCollection?.schema;
      this.editDataShow = this.fbs.getEditData();
  }

  

}
