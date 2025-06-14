/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RequestBuilder } from '../../request-builder';
import { StrictHttpResponse } from '../../strict-http-response';

export interface CategoriesGet$Params {
  page?: number;
  limit?: number;
  sort?: string;
}

export function categoriesGet(
  http: HttpClient,
  rootUrl: string,
  params?: CategoriesGet$Params,
  context?: HttpContext,
): Observable<StrictHttpResponse<any>> {
  const rb = new RequestBuilder(rootUrl, categoriesGet.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('limit', params.limit, {});
    rb.query('sort', params.sort, {});
  }

  rb.query('count', 'true');

  return http.request(rb.build({ responseType: 'json', accept: 'application/json', context })).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<any>;
    }),
  );
}

categoriesGet.PATH = '/categories';
