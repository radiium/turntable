import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'duration' })
export class DurationPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        let format = 'mm:ss';
        if (args) { format = 'HH:mm:ss'; }
        return moment.utc(value).format(format);
    }

}
