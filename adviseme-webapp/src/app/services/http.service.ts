/*
 * http.service.ts
 * A custom http service that extends the default service by adding automatic
 * JWT token headers and prepending request urls with the api url in the
 * appConfig file
*/
import { Injectable } from '@angular/core';
import { ConnectionBackend, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers } from '@angular/http';
import { appConfig } from '../app.config';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class HttpService extends Http {

  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
  }
// Add the JWT token if the user is logged in to the http authorization header
  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.get(appConfig.apiUrl + url, this.addJwt(options)).catch(this.handleError);
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.post(appConfig.apiUrl + url, body, this.addJwt(options)).catch(this.handleError);
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.put(appConfig.apiUrl + url, body, this.addJwt(options)).catch(this.handleError);
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.delete(appConfig.apiUrl + url, this.addJwt(options)).catch(this.handleError);
  }

  // Private helper methods

  private addJwt(options?: RequestOptionsArgs): RequestOptionsArgs {
        // ensure request options and headers are not null
        options = options || new RequestOptions();
        options.headers = options.headers || new Headers();
        // add authorization header with jwt token
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            options.headers.append('Authorization', 'Bearer ' + currentUser.token);
        }
        return options;
    }

    private handleError(error: any) {
        if (error.status === 401) {
            // 401 unauthorized response so log user out of client
            window.location.href = '/login';
        }
        return Observable.throw(error._body);
    }
}

export function httpServiceFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
    return new HttpService(xhrBackend, requestOptions);
}

export let httpProvider = {
  provide: Http,
  useFactory: httpServiceFactory,
  deps: [XHRBackend, RequestOptions]
};
