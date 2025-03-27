/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RequestBuilder } from '../../request-builder';
import { StrictHttpResponse } from '../../strict-http-response';

export interface OrdersGet$Params {}

export function ordersGet(
  http: HttpClient,
  rootUrl: string,
  params?: OrdersGet$Params,
  context?: HttpContext,
): Observable<StrictHttpResponse<any>> {
  const rb = new RequestBuilder(rootUrl, ordersGet.PATH, 'get');
  if (params) {
  }

  return http.request(rb.build({ responseType: 'json', accept: 'application/json', context })).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<any>;
    }),
  );
}

ordersGet.PATH = '/orders';
