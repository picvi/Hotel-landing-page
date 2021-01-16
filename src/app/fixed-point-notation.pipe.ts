import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fixedPointNotation'
})
export class FixedPointNotationPipe implements PipeTransform {

  transform(value: string, numberOfDigits?: number): unknown {
    return Number.parseFloat(value).toFixed(numberOfDigits);
  }

}
