import { PlaylistItem } from './';

export interface SearchResults {
    query: string;
    results: Array<Array<PlaylistItem>>;
    prevPageToken: string;
    nextPageToken: string;
}
