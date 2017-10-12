import { FilterPlaylistTitlePipe } from './filter-playlist-title.pipe';

describe('FilterPlaylistPipe', () => {
    it('create an instance', () => {
        const pipe = new FilterPlaylistTitlePipe();
        expect(pipe).toBeTruthy();
    });
});
