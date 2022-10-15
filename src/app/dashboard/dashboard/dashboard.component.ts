import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { deleteAllCookies } from 'src/helpers/cookie-utils';
import { CollectionsBuilderService } from 'src/services/collections-builder-service.service';

import { StorageService } from 'src/services/storage.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,AfterViewInit {
  collectionList:any[]=[];
  currentUser:any;
  constructor(
    private router:Router,
    private toast: ToastrService,
    private storage:StorageService,
    private cs:CollectionsBuilderService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.storage.getData("_c_u")!;
    console.log('currentuser data nginit',this.currentUser.accessCollectionList);
    this.collectionList = this.currentUser.accessCollectionList;
  }

  ngAfterViewInit(): void {
 
  }

  async logout(){
    localStorage.clear();
    deleteAllCookies();
    this.toast.success("Logged out");
    await this.router.navigateByUrl('/auth');
  }

  ///nav bar logic/

  gotoformBuilder(collection:any){
    console.log('selected collection',collection)
    this.cs.setSelectedCollectionList(collection);

  }
  
}
