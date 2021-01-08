import { Injectable } from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  checkPhoneSpelling(): ValidatorFn {
    return (control: FormControl): { [s: string]: boolean } | null => {
      const regExWithPlus = /[+]{1}375(29|33|25)[0-9]*/.test(control.value);
      if (regExWithPlus && control.value.length === 13) {
        return null;
      } else {
        return { invalidPhoneSpelling: true };
      }
    };
  }

  endsWithDot(): ValidatorFn {
    return (control: FormControl): { [s: string]: boolean } | null => {
      if (control.value.endsWith('.')) {
        return null;
      } else {
        return { noDot: true };
      }
    };
  }

  dateInAdvanve(): ValidatorFn {
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
}
