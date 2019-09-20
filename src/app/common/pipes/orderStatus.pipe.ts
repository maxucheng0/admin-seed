import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: '_orderStatusConvert'})
export class OrderStatusPipe implements PipeTransform {
  transform(value: string): string {
    const convertMapping = {
      CREATED: '已创建',
      PAID: '已付款',
      CONFIRMED: '已确认',
      CHECKIN: '已入住',
      CHECKOUT: '已离店',
      CANCELED: '已取消'
    };
    return convertMapping[ value ];
  }
}
