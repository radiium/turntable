import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterPlaylistTitle',
    pure: false
})
export class FilterPlaylistTitlePipe implements PipeTransform {
    transform(items: any[], title: string): any {
        if (!items || !title) {
            return items;
        }
        return items.filter((item) => item.title.indexOf(title) !== -1);
    }
}
