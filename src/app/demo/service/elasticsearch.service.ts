// import{Client} from 'elasticsearch-browser'




// export class ElasticsearchService {
//     search(arg0: { index: string; body: { query: { match: { name: any; }; }; }; }) {
//         throw new Error('Method not implemented.');
//     }


//     private client:Client;

    
//     private connect() {
//         this.client=new Client({
//             host:'http://localhost:9200',
//             log:'trace'
//         });
//        }
// }

import { Injectable } from '@angular/core';

import { EMPTY, from, Observable, of } from 'rxjs';
import { expand, last, map, switchMap, tap } from 'rxjs/operators';

import { Client, CountResponse, SearchResponse } from 'elasticsearch';
import { Client as ClientJs } from 'elasticsearch-browser';

@Injectable({
    providedIn: 'root'
})
export class ElasticsearchService {
    private static readonly NB_RESULTS_PAGE: number = 1000;
    private static readonly SCROLL_API_SEARCH_CONTEXT_DURATION: string = '1m';

    private client: ClientJs;

    constructor() {
        this.client = new ClientJs({
            host: 'localhost:9200',
            log: 'trace'
        });
        this.client.ping({
            requestTimeout: 3000,
        }, function (error) {
            if (error) {
                console.error('Elasticsearch cluster is down!');
            } else {
                console.log('Elasticsearch is connected');
            }
        });
    }

    search(index: string, query: any): Observable<SearchResponse<any>> {
        return from(this.client.search({
            index: index,
            body: query
        })).pipe(
            map(response => response as SearchResponse<any>)
        );
    }

    getAllResults(index: string, query: any): Observable<any[]> {
        return this.search(index, {
            ...query,
            size: ElasticsearchService.NB_RESULTS_PAGE,
            scroll: ElasticsearchService.SCROLL_API_SEARCH_CONTEXT_DURATION
        }).pipe(
            expand(response => {
                if (response.hits.hits.length < ElasticsearchService.NB_RESULTS_PAGE) {
                    return EMPTY;
                }

                return from(this.client.scroll({
                    scrollId: response._scroll_id!,
                    scroll: ElasticsearchService.SCROLL_API_SEARCH_CONTEXT_DURATION
                })).pipe(
                    map(scrollResponse => scrollResponse as SearchResponse<any>)
                );
            }),
            map(response => response.hits.hits),
            tap(hits => {
                if (hits.length < ElasticsearchService.NB_RESULTS_PAGE) {
                 // this.clearScroll(response._scroll_id!);
                }
            }),
            last(),
            map(results => results.flat())
        );
    }

    private clearScroll(scrollId: string): void {
        this.client.clearScroll({
            scrollId: scrollId
        }, (error, response) => {
            if (error) {
                console.error('Error clearing scroll:', error);
            }
        });
    }
}
