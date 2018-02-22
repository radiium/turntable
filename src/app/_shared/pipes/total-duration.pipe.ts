import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';

@Pipe({ name: 'totalduration' })
export class TotalDurationPipe implements PipeTransform {

    transform(videolist: any, args?: any): any {
        if (!videolist) {
            return;
        }

        let totalDuration = 0
        _.each(videolist, (video) => {
            totalDuration += video.duration;
        });

        return totalDuration

/*
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

        return moment.utc(value).format(format);*/
    }
}
