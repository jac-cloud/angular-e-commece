/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RequestBuilder } from '../../request-builder';
import { StrictHttpResponse } from '../../strict-http-response';

export interface UsersIdPasswordPut$Params {
  'Content-Type'?: string;
  id: string;
  body?: {};
}

export function usersIdPasswordPut(
  http: HttpClient,
  rootUrl: string,
  params: UsersIdPasswordPut$Params,
  context?: HttpContext,
): Observable<StrictHttpResponse<any>> {
  const rb = new RequestBuilder(rootUrl, usersIdPasswordPut.PATH, 'put');
  if (params) {
    rb.header('Content-Type', params['Content-Type'], {});
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(rb.build({ responseType: 'json', accept: 'application/json', context })).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<any>;
    }),
  );
}

usersIdPasswordPut.PATH = '/users/{id}/password';
