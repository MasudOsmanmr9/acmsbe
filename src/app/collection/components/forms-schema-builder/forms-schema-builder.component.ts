import { Component, ElementRef, Injectable, OnInit, ViewChild,  Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { SchemaBuilderService} from 'src/services/schema-builder.service';

export interface FormSchema {
  name: string
  label: string
  value: any
  type: string
  validatopt: any
  selectOptions: any
  // selectOptions?: string[]
}

interface ValidateOptions {
  required?: abc
  minLength?: abc
  maxLength?: abc
}

interface abc {
  show: boolean
  type: string
}

export interface selectFormSchema {
  name: string;
  label: string;
  type: string;
  validatopt: any;
  value: any;
  // options?: Options
  selectOptions?: any[]
  multiple: boolean
}

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'forms-schema-builder',
  templateUrl: './forms-schema-builder.component.html',
  styleUrls: ['./forms-schema-builder.component.css']
})
export class FormsSchemaBuilderComponent implements OnInit { 

  @ViewChild('schemaModalButton',{static:true}) schemaModalButton !:ElementRef;
  @Output() newItemEvent = new EventEmitter<any>();
  errorShowOnSubmit:boolean = false;
  formGroupHolder!: FormGroup;
  schemaType: string = '';
  buttonList: string[] = [
    'text',
    'password',
    'email',
    'number',
    'textarea',
    'checkbox',
    'radio',
    'toogle',
    'select'
  ];

  buttonConfigSchema: FormSchema = {
    'name': '',
    'label': '',
    'value': '',
    'type': '',
    'validatopt': [

      { key: 'required', value: { show: false, type: 'checkbox' } },
      { key: 'minLength', value: { show: false, type: 'checkbox' }, inputOpt: { type: 'number', placeholder: 'give minimum length for validation' } },
      { key: 'maxLength', value: { show: false, type: 'checkbox' }, inputOpt: { type: 'number', placeholder: 'give maximum length for validation' } },

    ],
    'selectOptions':''
  }

  public buttonConfigBuilderGroup = {
    'name': ['',[Validators.required]],
    'label': ['',[Validators.required]],
    'value': [],
    'type': [],
    'validatopt': this.fb.group({
      'required': [''],
      'minLength': [],
      'maxLength': []
    }) as FormGroup,
    'selectOptions':[]

  }


  // buttonConfigSchema1 = [
  //   {key:'name',value:'username'},
  //   {key:'label',value:'User Name'},
  //   {key:'value',value:''},
  //   {key:'type',value:'text'},
  //   {key:'validatopt',value:[
  //     {key:'required',value:{show:false,type:'checkbox'}},
  //     {key:'minLength',value:{show:false,type:'checkbox'}},
  //     {key:'maxLength',value:{show:false,type:'checkbox'}},

  //   ]},

  // ]

  constructor(private fb: FormBuilder, private ss:SchemaBuilderService,  private router :Router) { }

  ngOnInit(): void {
    this.buttonConfigBuilderGroupInitialize();
    console.log('this.formGroupHolder', this.formGroupHolder)
  }

  buttonConfigBuilderGroupInitialize() {
    this.formGroupHolder = this.fb.group(this.buttonConfigBuilderGroup);
    console.log(this.formGroupHolder);
  }


  logvalue(val: any) {
    console.log(val);
  }

  showSchemaModal(type: string) {
    this.buttonConfigSchema['type'] = type;
    this.schemaType = type;
    let abc = {
      'type': type,
    }
    this.formGroupHolder.patchValue(abc);
    console.log('this.formGroupHolder', this.formGroupHolder)
    this.schemaModalButton.nativeElement.click();
  }

  submitForm() {

    this.errorShowOnSubmit = true
    if(this.formGroupHolder.valid){
      console.log('access');
      console.log(this.formGroupHolder, this.formGroupHolder.value, this.formGroupHolder.valid);
      this.ss.addToformSchemaCollection(this.formGroupHolder.value);
      console.log('emitting event')
      this.newItemEvent.emit(this.formGroupHolder.value);
      this.formGroupHolder.reset();
      this.schemaModalButton.nativeElement.click();
    }
    

  }

  clearCollection(){
    this.ss.clearformSchemaCollection();
  }

  showNewForm(){
    this.router.navigateByUrl('/formview/formgenerate');
  }

  controlName(val: any): string {
    return val.toString();
  }


  controlType(val: any): string {
    return val.type.toString();
  }

}
