import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dynamic-form-datatable',
  templateUrl: './dynamic-form-datatable.component.html',
  styleUrls: ['./dynamic-form-datatable.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DynamicFormDatatableComponent implements OnInit, OnChanges {


  @Input() tabledata: any[] = [];
  @Input() includeHeaders: any[] = [];
  @Input() excludeHeaders: any[] = [];
  @Input() editFunc?: Function;
  @Input() deleteFunc?: Function;
  public searchForm!: FormGroup;
  screenSize = 0;
  headers: any[] = [];
  rows: any[] = [];
  dataRows: any[] = [];
  pageNumber = 0;
  pageSize = 0;
  totalRows = 0;
  lastKey = 0;
  isLoading = false;
  pageWiseLastKeys: any[] = [0];
  headerHeight = 50;

  isSubmitted: boolean = false;

  constructor(
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    // private imageCompress: NgxImageCompressService,
    private route: ActivatedRoute,
  ) {
    this.pageNumber = 0;
    this.pageSize = 10;
    this.screenSize = window.innerWidth;

    // this.changeEvent = this.changeTextFromParent;
  }
  ngOnChanges(changes: SimpleChanges): void {
    // if (this.tabledata != null && this.tabledata[0] != null && this.tabledata[0] != undefined && this.headers.length == 0  && this.tabledata.length >= 1) {
    if(changes['tabledata'].currentValue != changes['tabledata'].previousValue){
      this.headers=[];
    }
    if (this.headers.length == 0 && this.tabledata.length >= 1) {
      this.createHeaders(this.tabledata[0]);
    }
    this.rows = this.tabledata;
    this.dataRows = this.tabledata;
    return;
  }



  ngOnInit(): void {
  }

  createHeaders(props: any) {
    if (props == null) {
      return;
    }
    let a = Object.keys(props)
    a.forEach((e) => {
      console.log('this.includeHeaders[0]', this.includeHeaders.length);
      if (this.includeHeaders.length != 0 && this.includeHeaders.includes(e) && !this.excludeHeaders.includes(e)) {
        let a = { 'name': e }
        this.headers.push(a);
      } else if (this.includeHeaders.length == 0 && !this.excludeHeaders.includes(e)) {
        let a = { 'name': e }
        this.headers.push(a);
      }
    })

  }
  setPage(event: any) {

  }

  onActivate(event: any) {

  }

  edit(val: any) {
    this.editFunc != null? this.editFunc(val): '';
  }
  delete(val: any) {
    this.deleteFunc != null? this.deleteFunc(val):'';
  }

}
