import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

@Injectable()
export class MovieService {
    /*
    ef9b35ee
    86301b7
    */
    apiKey = '86301b7';
    apiUrl = 'http://www.omdbapi.com'

    constructor(
        private http: HttpClient
    ) { }

    getMovies(params):any {
        let url = this.apiUrl + '?apikey=' + this.apiKey;

        let strParams = '';
        for (let i = 0; i < Object.keys(params).length; i++) {
            strParams = strParams + '&' + Object.keys(params)[i] + '=' + params[Object.keys(params)[i]];
        }
        url = url + strParams;

        return this.http.get(url, {});
    }
}
