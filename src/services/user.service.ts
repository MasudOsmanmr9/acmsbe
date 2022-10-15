import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from "../models/apiResponse";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userInfo: any;
  allUserData: any[] = [];
  constructor(private http: HttpClient) {
    //this.fetchAllUsers();
    this.allUserData = JSON.parse(localStorage.getItem('users')!) ?? [];
  }

  async saveUser(userData: any) {
    let tempUser = {
      data:userData, 
      type: "users"
    }
    console.log('tempoooooooooooooooooooo', tempUser);
    //this.allUserData.push(tempUser);
   // localStorage.setItem('users', JSON.stringify(this.allUserData));
    // let userCreatedData = await this.http
    //   .post<any>('http://localhost:3000/users/createUsers', tempUser).toPromise()
    let userCreatedData = await this.http
    .post<any>('http://localhost:3000/admin/saveOrUpdateData', tempUser).toPromise();
    // console.log('userCreatedData response ::',userCreatedData);
    //   if(userCreatedData != null && userCreatedData.Success){
    //     this.allUserData.push(userCreatedData.Data);
    //   }
      return userCreatedData;
  }

  async fetchUsersList(): Promise<ApiResponse>{
    // let allUsers = await this.http.get<any>('http://localhost:3000/users/getUsers').toPromise();
    let allUsers = await this.http.post<any>('http://localhost:3000/admin/listData', { type: "users", lastKey: 0 }).toPromise();
    if(allUsers != null && allUsers.Success){
      this.allUserData = allUsers.Data;
    }
    return allUsers;
  }

  getUsers(): any {
    return this.allUserData;
  }

  getSingleUser(id: number): any {

  }
}



// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { map } from 'rxjs/operators';
// import { ApiResponse } from 'src/app/models/api-response-model';
// import { environment } from 'src/environments/environment';


// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {

//   constructor(private http: HttpClient) { }

//   getToken() {
//     return localStorage.getItem('access_token');
//   }

//   async getList(): Promise<ApiResponse> {
//     let temp =  await this.http.get<any>('http://localhost:3000/users/getUsers').toPromise();
//     console.log('temmmmmmmmmmmmmmmmmmmmp',temp);
//     return temp;
//   }

//   // getDetails(
//   //   id:string
//   // ) {
//   //   return this.http
//   //     .get<any>(environment.api + '/user/details/' + id)
//   //     .pipe(
//   //       map((res) => {
//   //         return res as ApiResponse;
//   //       })
//   //     );
//   // }
//   // checkLoginIdExist(
//   //   id:string
//   // ) {
//   //   return this.http
//   //     .get<any>(environment.api + '/user/loginIdExist/' + id)
//   //     .pipe(
//   //       map((res) => {
//   //         return res as ApiResponse;
//   //       })
//   //     );
//   // }


//   // saveOrUpdate(
//   //   data:any
//   // ) {
//   //   return this.http
//   //     .post<any>(environment.api + '/user/saveOrUpdate', data)
//   //     .pipe(
//   //       map((res) => {
//   //         return res as ApiResponse;
//   //       })
//   //     );
//   // }


// }