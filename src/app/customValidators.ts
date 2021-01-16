import { ValidatorFn, FormControl } from '@angular/forms';

export class CustomValidators {
  static checkPhoneSpelling(): ValidatorFn {
    return (control: FormControl): { [s: string]: boolean } | null => {
      const regExWithPlus = /[+]{1}375(29|33|25)[0-9]*/.test(control.value);
      if (regExWithPlus && control.value.length === 13) {
        return null;
      } else {
        return { invalidPhoneSpelling: true };
      }
    };
  }

  static endsWithDot(): ValidatorFn {
    return (control: FormControl): { [s: string]: boolean } | null => {
      if (control.value.endsWith('.')) {
        return null;
      } else {
        return { noDot: true };
      }
    };
  }

  static dateInAdvanve(): ValidatorFn {
    return (control: FormControl): { [s: string]: boolean } | null => {
      const difference = Date.parse(control.value) - Date.now();
      const date = new Date(difference);
      if (date.getUTCDate() >= 3) {
        return null;
      } else {
        return { notInAdvance: true };
      }
    };
  }

  static checkLength(param: number): ValidatorFn {
    return (control: FormControl): { [s: string]: boolean } | null => {
      if (control.value?.length < param) {
        return { tooShort: true };
      } else {
        return null;
      }
    };
  }

  static checkIfIdentical(control2: any): ValidatorFn {
    return (control: FormControl): { [s: string]: boolean } | null => {
      if (control && control2) {
        return control2.value === control.value
          ? null
          : { notIdenticalValues: true };
      }
    };
  }
}
