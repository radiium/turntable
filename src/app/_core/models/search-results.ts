import { PlaylistItem } from './';

export interface SearchResults {
    query: string;
    results: PlaylistItem[][];
    prevPageToken: string;
    nextPageToken: string;
}
