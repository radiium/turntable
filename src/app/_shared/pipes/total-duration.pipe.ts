import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';

@Pipe({ name: 'totalduration' })
export class TotalDurationPipe implements PipeTransform {

    transform(videolist: any, args?: any): any {
        if (!videolist) {
            return;
        }

        let totalDuration = 0;
        _.each(videolist, (video) => totalDuration += video.duration);
        return totalDuration;
    }
}
