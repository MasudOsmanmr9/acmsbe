import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {

  storedTableData: any[] = [];
  tableFields: any[] = [];
  currentCollectionInfo?: any;
  editdata?:any;
  public storedTableDataChangeEvent: EventEmitter<any[]> = new EventEmitter<any[]>();
  constructor() {
  }

  setStoredTableData(data: any) {
    if(localStorage.getItem(this.currentCollectionInfo.id) != null){
      this.storedTableData = JSON.parse(localStorage.getItem(this.currentCollectionInfo.id)!);
    }

    let index = this.storedTableData.findIndex((el: any) =>  el.id === data.id );
    if (index == -1) 
    { 
      let a = [...this.storedTableData]
      this.storedTableData.push(data); 
    }
    else { 
      this.storedTableData[index] = data;
    }
    this.currentCollectionInfo && data != null ? localStorage.setItem(this.currentCollectionInfo?.id, JSON.stringify(this.storedTableData)) : '';
    this.storedTableDataChangeEvent.emit(this.storedTableData);
  }

  newlyAssignStoredTableData(data: any) {
    this.storedTableData = data;
    console.log('newly assigned collection list',this.storedTableData)
    this.storedTableDataChangeEvent.emit(this.storedTableData);
  }
  getStoredTableData(): any[] {
    return this.storedTableData;
  }
  setTableFields(fields: any[]) {
    this.tableFields = fields
  }

  getTableFields(): any[] {
    return this.tableFields
  }

  setCurrentCollectionInfo(data: any) {
    this.currentCollectionInfo = data;
  }

  getCurrentCollectionInfo(): any {
    return this.currentCollectionInfo;
  }

  setEditData(editValue:any){
    this.editdata = editValue;
  }
  getEditData():any{
    return this.editdata;
  }
  deleteData(data:any){
    this.storedTableData = this.storedTableData.filter((fdata:any)=> fdata.id !== data.id);
    this.currentCollectionInfo && data != null ? localStorage.setItem(this.currentCollectionInfo?.id, JSON.stringify(this.storedTableData)) : '';
    this.storedTableDataChangeEvent.emit(this.storedTableData);
  }
}
