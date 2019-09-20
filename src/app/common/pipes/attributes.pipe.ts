import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: '_attributes'})
export class AttributesPipe implements PipeTransform {
  transform(object: any): any[] {
    const attributes = [];
    let key = 1;
    Object.keys(object).forEach(item => {
      attributes.push({
        key: key,
        name: item,
        value: object[item]
      });
      key++;
    });
    return attributes;
  }
}
