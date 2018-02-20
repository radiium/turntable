import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'duration' })
export class DurationPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (!value && value !== 0) {
            return;
        }
        let format = 'mm:ss';
        if (args || value >= 3600000) {
            format = 'HH:mm:ss';
        }
        if (args || value >= 356400000) {
            format = 'HHH:mm:ss';
        }
        if (args || value >= 3596400000) {
            format = 'HHHH:mm:ss';
        }

        return moment.utc(value).format(format);
    }
}
