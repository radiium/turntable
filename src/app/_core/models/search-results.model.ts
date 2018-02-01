import { Video } from 'core/models';

export interface SearchResults {
    query: string;
    results: Array<Array<Video>>;
    prevPageToken: string;
    nextPageToken: string;
}
