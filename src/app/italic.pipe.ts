import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'italic'
})
export class ItalicPipe implements PipeTransform {
  transform(value: string): unknown {
    return value.toUpperCase();
  }

}
