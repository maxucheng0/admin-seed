import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: '_hotel'})
export class HotelPipe implements PipeTransform {
    transform(status): string {
        let result = '';
        switch (status) {
            case 'HOTEL':
                result = '酒店';
                break;
            case 'HOMESTAY':
                result = '民宿';
                break;
        }
        return result;
    }
}
