import { Router } from "@angular/router";

export const regExpMobileno = new RegExp("^(([+][8]{2}|0088)?(01)[3-9]\\d{8})$");

const regExp2Decimal = new RegExp("^[0-9]+(.(1)?[0-9])?$");

export const Crypto_Sec_Key = "374D619041254DE89B9BB7E42A52A5CD";

export class CommonMethods {
  compareTwoDates() {}

  static getFormattedDate(date: Date) {
    let d = new Date(date);
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let year = d.getFullYear();
    return year + "-" + (month.toString().length == 1 ? "0" : "") + month + "-" + ((day.toString().length == 1 ? "0" : "") + day);
  }
  static getFormattedDateWithTime(date: Date) {
    let d = new Date(date);
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let year = d.getFullYear();
    let hour = d.getHours();
    let minute = d.getMinutes();
    let second = d.getSeconds();
    return (
      year +
      "-" +
      (month.toString().length == 1 ? "0" : "") +
      month +
      "-" +
      ((day.toString().length == 1 ? "0" : "") + day) +
      " " +
      ((hour.toString().length == 1 ? "0" : "") + hour) +
      ":" +
      ((minute.toString().length == 1 ? "0" : "") + minute) +
      ":" +
      ((second.toString().length == 1 ? "0" : "") + second)
    );
  }

  static getDayEndDate(date: Date) {
    let d = new Date(date);
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let year = d.getFullYear();
    return year + "-" + (month.toString().length == 1 ? "0" : "") + month + "-" + ((day.toString().length == 1 ? "0" : "") + day) + " 23:59:59";
  }
  static getDayEndStart(date: Date) {
    let d = new Date(date);
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let year = d.getFullYear();
    return year + "-" + (month.toString().length == 1 ? "0" : "") + month + "-" + ((day.toString().length == 1 ? "0" : "") + day) + " 00:00:01";
  }

  static areDatesWithinMonths(date1: Date, date2: Date, range: number) {
    let d1 = new Date(date1);
    let d2 = new Date(date2);
    let diff = Math.abs(d1.getTime() - d2.getTime());
    let diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    return diffDays <= 30 * range;
  }
  static areDatesWithinDays(date1: Date, date2: Date, range: number) {
    let d1 = new Date(date1);
    let d2 = new Date(date2);
    let diff = Math.abs(d1.getTime() - d2.getTime());
    let diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    return diffDays <= range;
  }

  static navigateNewWindow(router: Router, path: string) {
    const url = router.serializeUrl(router.createUrlTree([path]));

    window.open(url, "_blank");
  }
}
