import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CollectionsBuilderService } from 'src/services/collections-builder-service.service';
import { SchemaBuilderService } from 'src/services/schema-builder.service';
import { FormsSchemaBuilderComponent } from '../forms-schema-builder/forms-schema-builder.component';


export interface FormSchema {
  id: string
  type: string
  name: string
  listApiUrl: string
  submitUrl: string
  schema: any
  table_actions:any
  table_fields: any
  // selectOptions?: string[]
}

export interface act{
  edit: boolean,
  delete: boolean
}

@Component({
  selector: 'app-create-colection',
  templateUrl: './collection-create.component.html',
  styleUrls: ['./collection-create.component.css']
})
export class CollectionCreateComponent implements OnInit {

  //@ViewChild('FormsSchemaBuilderComponent',{static:true}) FormsSchemaBuilderComponent!:FormsSchemaBuilderComponent ;
  // @ViewChild(FormsSchemaBuilderComponent) FormsSchemaBuilderComponent!:FormsSchemaBuilderComponent;

  constructor(private fb: FormBuilder, private ss: SchemaBuilderService, private router: Router,
    private fsbc: FormsSchemaBuilderComponent, private cs: CollectionsBuilderService) {
    console.log('FormsSchemaBuilderComponent', fsbc.buttonConfigSchema)
  }
  errorShowOnSubmit: boolean = false;
  collectionFormGroupHolder!: FormGroup;
  //FormsSchemaBuilderComponents! : FormsSchemaBuilderComponent;
  schematype = 'formschema'
  date = new Date();
  formSchema!: FormGroup;
  formSchemaJson:any[] = []
  createCollectionformschema: FormSchema = {
    'id': '',
    'type': '',
    'name': '',
    'listApiUrl': '',
    'submitUrl': '',
    'schema': '',
    'table_actions':[
      { key: 'edit', value: true },
      { key: 'delete', value: true},
    ],
    'table_fields':''
  }
  createCollectionBuilderGroup = {
    'id': [this.date.getTime().toString(), [Validators.required]],
    'type': [this.schematype],
    'name': ['', [Validators.required]],
    'listApiUrl': [`${this.schematype}/list`],
    'submitUrl': [`saveOrUpdate/:${this.schematype}`],
    'schema': [],
    'table_actions': this.fb.group({
      'edit':[],
      'delete':[]
    }),
    'table_fields':[]
  }
  selectTableFieldOpt:string[] = [];
  ngOnInit(): void {
    this.schemaImport();
    this.buttonConfigBuilderGroupInitialize();
    // console.log('yessssssssssssssssssssssssssss',this.cs.getSelectedCollectionList(1662352247095));
  }
  // ngAfterViewInit(): void {
  //   this.schemaImport();
  //   this.buttonConfigBuilderGroupInitialize();
  // }

  goTopage(path: string) {
    this.router.navigateByUrl(path);
  }

  schemaImport() {
    this.formSchema = this.fb.group(this.fsbc.buttonConfigBuilderGroup);
    //this.createCollectionBuilderGroup['schema'] = this.formSchema;
  }

  buttonConfigBuilderGroupInitialize() {
    this.collectionFormGroupHolder = this.fb.group(this.createCollectionBuilderGroup);
    console.log('collectionFormGroupHolder', this.collectionFormGroupHolder.value);
  }

  submitCollectionForm() {
   try {
    console.log(this.ss.formSchemaJson);
    let schemaField = {
      'schema': this.ss.formSchemaJson,
    }

    this.collectionFormGroupHolder.patchValue(schemaField);
    console.log(this.collectionFormGroupHolder.value);
    if (this.collectionFormGroupHolder.valid) {
      this.cs.addTocollectionsList(this.collectionFormGroupHolder.value);
       this.ss.clearformSchemaCollection();
      // this.collectionFormGroupHolder.reset();
      // this.goTopage('/collections/collection-list');

      //// this.createCollectionBuilderGroup = {...this.createCollectionBuilderGroup};
    }else{
      this.errorShowOnSubmit = true;
    }
   } catch (error) {
    console.error(error);
   }
  }
  tableFieldsList(newItem:any){
    this.selectTableFieldOpt = [...this.selectTableFieldOpt,newItem['name']];
    this.formSchemaJson = [...this.ss.getformSchemaCollection()];
    console.log('this.formSchemaJson this.formSchemaJson',this.formSchemaJson)

  }
}
