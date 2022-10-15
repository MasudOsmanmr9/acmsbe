import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SchemaBuilderService {

  formSchemaJson:any[] = []
  currentSchemaJson:any;

  constructor() { 
    this.formSchemaJson = JSON.parse(localStorage.getItem('formSchema')!)?? [];
  }

  addToformSchemaCollection(schema:any){
    console.log('schemaaaaaaaaaaaaaaaaaaa',schema)
    if(!schema){
      return;
    }
    this.formSchemaJson.push(schema);
    this.currentSchemaJson = schema;
    console.log(this.formSchemaJson);
    localStorage.setItem("formSchema", JSON.stringify(this.formSchemaJson));
  }

  clearformSchemaCollection(){
    this.formSchemaJson = [];
    localStorage.removeItem('formSchema')
  }
  getformSchemaCollection():any{
    return this.formSchemaJson;
  }

}
