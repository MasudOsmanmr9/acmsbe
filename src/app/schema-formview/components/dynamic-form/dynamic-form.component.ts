import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { forEachChild } from 'typescript';
import { SchemaBuilderService } from 'src/services/schema-builder.service';
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

interface ValidateOptions {
  required?: boolean
  minLength?: number
  min: string
  max: string
}

interface Options {
  min: string
  max: string
  step: string
  icon: string
}
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit, OnChanges {

  @Input() dynamicformSchema: FormSchema[] = [];
  @Input() currentCollection: any;
  @Input() editData?: any;
  formGroupHolder!: FormGroup;
  date!: Date;
  formSchemas: FormSchema[] = []
  // formSchemas: (FormSchema | selectFormSchema)[] = []
  // formSchemas: (FormSchema | selectFormSchema)[] = [
  //   // formSchemas: FormSchema[] = [
  //   {
  //     "name": "firstName",
  //     "label": "First name:",
  //     "value": "",
  //     "type": "text",
  //     "validatopt": {
  //       "required": true,
  //       "minLength": 10,
  //       "maxLength": 15,
  //     }
  //   },

  //   {
  //     "name": "comments",
  //     "label": "Comments",
  //     "value": "",
  //     "type": "textarea",
  //     "validatopt": {
  //       "required": true,
  //       "minLength": 8,
  //       "maxLength": 13,
  //     }
  //   },
  //   {
  //     "name": "agreeTerms",
  //     "label": "This is a checkbox?",
  //     "value": null,
  //     "type": "checkbox",
  //     "validatopt": {
  //       "required": true,
  //     }
  //   },
  //   {
  //     "name": "size",
  //     "label": "",
  //     "value": "",
  //     "type": "range",
  //     "validatopt": {}
  //   },
  //   {
  //     "name": "lightDark",
  //     "label": "Do you like toggles?",
  //     "value": true,
  //     "type": "toggle",
  //     "validatopt": {}
  //   },
  //   {
  //     "name": "select-field",
  //     "label": "select Country",
  //     "value":null,
  //     "multiple": false,
  //     "selectOptions": [],
  //     "validatopt": {},
  //     "type": "select",
  //   }

  // ];


  errorShowOnSubmit: boolean = false;
  validatorStore: any = {
    'required': Validators.required,
    'maxLength': (val: number) => Validators.maxLength(val),
    'minLength': (val: number) => Validators.minLength(val),
    'email': Validators.email
  }

  constructor(private fb: FormBuilder, private ss: SchemaBuilderService,
    private cs: CollectionsBuilderService, private router: Router,
    private fbs: FormBuilderService) { }


  ngOnInit(): void {
    // console.log('dynamic form ngoninit accessed');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.formSchemas = this.dynamicformSchema
    let obj: any = {
      label: "id",
      name: "id",
      selectOptions: null,
      type: "text",
      validatopt: { required: "", minLength: null, maxLength: null },
      value: null
    }

    let tempSchema:any[] = this.formSchemas
    const gneratedGroupOpt = this.groupOptionFactory(this.formSchemas);
    this.formGroupHolder = this.fb.group(gneratedGroupOpt);
    return;
  }

  validatorFactory(validateOpt: any): Validators[] | any {
    let vlds: Validators[] = [];
    for (const opt in validateOpt) {
      if (['min', 'max', 'minLength', 'maxLength'].includes(opt)) {
        validateOpt[opt] == null ? '' : vlds.push(this.validatorStore[opt](validateOpt[opt]))
      } else if (validateOpt[opt]) {
        vlds.push(this.validatorStore[opt]);
      }
    }
    return vlds;
  }

  groupOptionFactory(formConfig: (FormSchema | selectFormSchema)[]): any {
    let tempGroup: any = {}
    formConfig?.forEach((element: FormSchema | selectFormSchema) => {
      if (this.editData != null || this.editData != undefined) {
        tempGroup[element.name] = [this.editData[element.name] ?? '', this.validatorFactory(element.validatopt)];
      } else {
        tempGroup[element.name] = [element.value ?? '', this.validatorFactory(element.validatopt)];
      }
    });
    return tempGroup;
  }


  goTopage(path: string) {
    this.router.navigateByUrl(path);
  }
  submitForm() {
    this.errorShowOnSubmit = true;
    if (this.formGroupHolder.valid) {
      let date = new Date();
      let newRow = { ...this.formGroupHolder.value }
      newRow['id'] = this.editData!=null?this.editData.id: date.getTime();
      newRow['schemaId'] = this.fbs.getCurrentCollectionInfo()['id'];
      this.fbs.setStoredTableData(newRow);
      this.formGroupHolder.reset();
      this.fbs.setEditData(null);
      this.router.navigateByUrl('/formview/schemadata');
    }
  }
  // getLoanType() {
  //   this.formGroupHolder.get('loanType')?.value;
  // }
  // setLoanTypeValue() {
  //   let abc = {
  //     'loanName': [null, [Validators.required]],
  //     'loanType': [],
  //     'loanDescription': [],
  //   }

  //   // have to pass all property in abc obj
  //   this.formGroupHolder.setValue(abc);
  //   // dont have to pass all property in abc obj
  //   this.formGroupHolder.patchValue(abc);
  // }
}
