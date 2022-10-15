import { Injectable } from "@angular/core";


@Injectable({ providedIn: 'root' })
export class Utils {
    constructor() { }

    /**
     * @param string
     * Capitalize only the first letter of the string.
     */
    public static capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    /**
     * @param string
     * Capitalize all words of a string.
     */
    public static capitalizeWords(string: string) {
        return string.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
    };

    /**
     * Capetalize First letter from all words of a string
     * @param str 
     */
    public static titleCase(str: string) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            // You do not need to check if i is larger than splitStr length, as your for does that for you
            // Assign it back to the array
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        // Directly return the joined string
        return splitStr.join(' ');
    }

    /**
     * Generate Array Object from enum.
     * result ex: [{code: 'abcd_abcd', name: 'Abcd Abcd'}]
     * @param obj - Parameter must be an enum
     */
    public static ListObjFromEnum(obj: any): any[] {
        const res = Object.keys(obj).map(key => ({ code: obj[key], name: this.titleCase(key.replace(/\_/gi, ' ')) }));
        return res;
    }

    /**
     * Generate String Array from Enum Keys.
     * @param obj - Parameter must be an enum
     */
    public static EnumKeyList(obj: any): any[] {
        const res = Object.keys(obj).map(key => key);
        return res;
    }

    /**
     * Generate String Array from Enum values
     * @param obj - Parameter must be an enum
     */
    public static EnumValueList(obj: any): any[] {
        const res = Object.values(obj).map(val => val);
        return res; 
    }

    public static ListFromEnum(obj: any): any[] {
        const res = Object.keys(obj).map(key => ({ value: obj[key], placeholder: key }));
        return res;
    }

    public static ListPlaceholderValueFromEnum(obj: any): any[] {
        const res = Object.keys(obj).map(key => ({ Code: obj[key], placeholder: this.titleCase(key.replace(/\_/gi, ' ')) }));
        return res;
    }

    public static toUnicode(str:string) {
        return str.split('').map(function (value, index, array) {
            var temp = value.charCodeAt(0).toString(16).toUpperCase();
            if (temp.length > 2) {
                return '\\u' + temp;
            }
            return value;
        }).join('');
    }

    public static toBase64(str:string){
      
      const converted = Utils.toBinary(str);
      return btoa(converted);

    }

    public static toBinary(str:string) {
        const codeUnits = new Uint16Array(str.length);
        for (let i = 0; i < codeUnits.length; i++) {
          codeUnits[i] = str.charCodeAt(i);
        }
        const charCodes = new Uint8Array(codeUnits.buffer);
        let result = '';
        for (let i = 0; i < charCodes.byteLength; i++) {
          result += String.fromCharCode(charCodes[i]);
        }
        return result;
      }
      
      public static fromBinary(binary:any) {
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < bytes.length; i++) {
          bytes[i] = binary.charCodeAt(i);
        }
        const charCodes = new Uint16Array(bytes.buffer);
        let result = '';
        for (let i = 0; i < charCodes.length; i++) {
          result += String.fromCharCode(charCodes[i]);
        }
        return result;
      }
      
      public static fromBase64(encoded:any){
        const decoded = atob(encoded);
        return  Utils.fromBinary(decoded);
      }
      

}

type Complete<T> = {
    [P in keyof Required<T>]: Pick<T, P> extends Required<Pick<T, P>> ? T[P] : (T[P] | undefined);
}