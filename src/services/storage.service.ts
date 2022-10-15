import { Injectable } from '@angular/core';
import { EncryptStorage } from 'encrypt-storage';
import { getCookie } from '../helpers/cookie-utils';
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }

  deleteData(key: string) {

    let sk = getCookie('current_session')!;

    const encryptStorage1 = new EncryptStorage(sk, {
      prefix: '@instance1',
    });
    encryptStorage1.removeItem(key);
  }

  storeData(key: string, value: any) {
    try {
      let sk = getCookie('current_session')!;
      const encryptStorage1 = new EncryptStorage(sk, {
        prefix: '@instance1',
      });
      encryptStorage1.setItem(key, value);
      let d = this.getData(key);
      console.log(d);
    } catch (e: any) {
      console.error(e);
    }
  }

  getData(key: string) {
    try {
      let sk = getCookie('current_session')!;
      const encryptStorage1 = new EncryptStorage(sk, {
        prefix: '@instance1',
      });
      let obj = encryptStorage1.getItem(key);
      return obj;
    } catch (e: any) {
      console.error(e);
    }
  }
}
