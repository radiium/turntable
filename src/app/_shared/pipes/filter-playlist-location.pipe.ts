import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterPlaylistLocation'
})
export class FilterPlaylistLocationPipe implements PipeTransform {
    transform(items: any[], isLocal: string): any {
        if (!items || !isLocal || isLocal === 'all') {
            return items;
        }
        return items.filter((item) => item.isLocal.toString() === isLocal);
    }
}
