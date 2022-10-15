import { Injectable } from "@angular/core";
import { setCookie } from "../helpers/cookie-utils";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/internal/operators/map";
import * as crypto from "crypto-js";
import { StorageService } from "./storage.service";
import { environment } from "src/environments/environment";
import { ApiResponse } from "../models/apiResponse";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private storage: StorageService) { }

  async login(useremail: string, userpassword: string, remember: boolean) {
    let cred = { useremail: useremail, userpassword: userpassword, device: "WEB" };
    // console.log('credentiallllllllllllllllllllllllll :::',cred,`${environment.api + "/auth/login"}`)

    let res = await this.http.post<any>(environment.api + "/auth/login", cred).toPromise()
    if (res.Success) {
      let user: any = res.Data.user;
      let token = res.Data.accesstoken;
      setCookie("current_session", "slf_" + Date.now().toString(), remember ? 1440 : 59);
      this.storage.storeData("_c_u", user);
      setCookie("access_token", token, remember ? 1440 : 59);
    }
    console.log('auth data',res);
    return res as ApiResponse;
  }

}
