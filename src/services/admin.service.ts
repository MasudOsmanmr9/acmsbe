import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/apiResponse';

@Injectable()
export class AdminService {
  constructor(private http: HttpClient) {}
        getListData(pageSize:number, lastKey:number, type:string, filter:any, whereObj:any,cols:any) {
    return this.http
      .post<any>(environment.api + '/admin/listData', {
        pageSize,
        lastKey,
        type,
        filter,
        whereObj,
        cols
      })
      .pipe(
        map((res) => {
          return res as ApiResponse;
        })
      );
  }

  getDataDetails(type: string, id: string) {
    return this.http
      .get<any>(environment.api + '/admin/details/' + type + '/' + id)
      .pipe(
        map((res) => {
          return res as ApiResponse;
        })
      );
  }
  
  updateData(data: any, type: string, id: string) {
    return this.http
      .post<any>(
        environment.api + '/admin/updateData',
        { data, type, id },
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
      .pipe(
        map((res) => {
          return res as ApiResponse;
        })
      );
  }
 
  deleteData(type:string,id:string) {
    return this.http
      .delete<any>(
        environment.api + '/admin/deleteData/'+type+"/"+id,
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
      .pipe(
        map((res) => {
          return res as ApiResponse;
        })
      );
  }
}

