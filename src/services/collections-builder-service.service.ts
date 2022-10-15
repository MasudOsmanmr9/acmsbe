import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { map } from 'rxjs';
import { ApiResponse } from '../models/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class CollectionsBuilderService {


  collectionsSchemaJson: any[] = [];
  currentCollection: any;
  AuthenticatedCollectionList: any[] = [];
  public collectionChangeEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router, private http: HttpClient) {
    this.collectionsSchemaJson = JSON.parse(localStorage.getItem('collectionsList')!) ?? [];
    this.currentCollection = localStorage.getItem('currentCollection')!=null?JSON.parse(localStorage.getItem('currentCollection')!):'';
    // this.fetchAllCollection();

  }

  async addTocollectionsList(collection: any) {

    // let opt =  {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': '*',
    //   },
    // }

    let tempCollection = {
      ...collection,
      ___type: "collection"
    }
    return await this.http
      .post<any>('http://localhost:3000/collection/saveCollection', tempCollection)
      .subscribe((res) => {
        console.log('ressssssssssssssssssponseeeeee', res);
      })
  }

  clearcollectionsList() {
    this.collectionsSchemaJson = [];
    localStorage.removeItem('collectionsList')
  }

  getcollectionsList(): any {
    return this.collectionsSchemaJson;
  }

  async fetchAllCollection(): Promise<ApiResponse> {
    let collectionResult = await this.http.post<any>('http://localhost:3000/admin/listData', { type: "collection", lastKey: 0 }).toPromise();
    if (collectionResult != null && collectionResult.Success) {
      this.collectionsSchemaJson = collectionResult.Data;
    }
    return collectionResult;
  }

  setSelectedCollectionList(collection: any) {
    let scollection: any;
    // this.collectionsSchemaJson.forEach((collection) => {
    //   if (collection.id == schemaId) {
    //     this.currentCollection = collection;
    //     this.collectionChangeEvent.emit(collection);
    //   }
    // })
    this.currentCollection = collection;
    localStorage.setItem('currentCollection',JSON.stringify(this.currentCollection));
    console.log('collllllllleeeectioo',collection);
    this.collectionChangeEvent.emit(collection);
    // this.router.navigateByUrl('/formview/formgenerate');
    this.router.navigateByUrl('/formview/schemadata');
  }
  getSelectedCollection(): any {
    return this.currentCollection;
  }

  getCollectionById(id: number): any {
    let tmpCollection: any;
    this.collectionsSchemaJson.forEach((collection) => {
      if (collection.id == id) {
        tmpCollection = collection;
      }
    })
    return tmpCollection;
  }

  setAUthenticatedCollectionList(authenticatedList: any) {
    this.AuthenticatedCollectionList = authenticatedList;
  }
  getAUthenticatedCollectionList(): any {
    return this.AuthenticatedCollectionList;
  }
}
