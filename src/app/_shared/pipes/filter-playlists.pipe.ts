import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterPlaylists'
})
export class FilterPlaylistsPipe implements PipeTransform {
    transform(items: any[], title: string, isLocal: string): any {

        if (items && items.length) {

            if (title) {
                items = items.filter((item) => item.title.indexOf(title) !== -1);
            }

            if (isLocal && isLocal !== 'all') {
                items = items.filter((item) => item.isLocal.toString() === isLocal);
            }

            return items;

        } else {
            return items;
        }
    }
}
