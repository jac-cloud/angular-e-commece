/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { StrictHttpResponse } from '../strict-http-response';

import { OrderitemsGet$Params, orderitemsGet } from '../fn/order-item/orderitems-get';
import { OrderitemsIdDelete$Params, orderitemsIdDelete } from '../fn/order-item/orderitems-id-delete';
import { OrderitemsIdGet$Params, orderitemsIdGet } from '../fn/order-item/orderitems-id-get';
import { OrderitemsIdPut$Params, orderitemsIdPut } from '../fn/order-item/orderitems-id-put';
import { OrderitemsPost$Params, orderitemsPost } from '../fn/order-item/orderitems-post';

@Injectable({ providedIn: 'root' })
export class OrderItemService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `orderitemsIdGet()` */
  static readonly OrderitemsIdGetPath = '/orderitems/{id}';

  /**
   * Retrieve orderitem.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `orderitemsIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  orderitemsIdGet$Response(params: OrderitemsIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return orderitemsIdGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Retrieve orderitem.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `orderitemsIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  orderitemsIdGet(params: OrderitemsIdGet$Params, context?: HttpContext): Observable<any> {
    return this.orderitemsIdGet$Response(params, context).pipe(map((r: StrictHttpResponse<any>): any => r.body));
  }

  /** Path part for operation `orderitemsIdPut()` */
  static readonly OrderitemsIdPutPath = '/orderitems/{id}';

  /**
   * Update orderitem.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `orderitemsIdPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  orderitemsIdPut$Response(params: OrderitemsIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return orderitemsIdPut(this.http, this.rootUrl, params, context);
  }

  /**
   * Update orderitem.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `orderitemsIdPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  orderitemsIdPut(params: OrderitemsIdPut$Params, context?: HttpContext): Observable<any> {
    return this.orderitemsIdPut$Response(params, context).pipe(map((r: StrictHttpResponse<any>): any => r.body));
  }

  /** Path part for operation `orderitemsIdDelete()` */
  static readonly OrderitemsIdDeletePath = '/orderitems/{id}';

  /**
   * Delete orderitem.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `orderitemsIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  orderitemsIdDelete$Response(
    params: OrderitemsIdDelete$Params,
    context?: HttpContext,
  ): Observable<StrictHttpResponse<any>> {
    return orderitemsIdDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete orderitem.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `orderitemsIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  orderitemsIdDelete(params: OrderitemsIdDelete$Params, context?: HttpContext): Observable<any> {
    return this.orderitemsIdDelete$Response(params, context).pipe(map((r: StrictHttpResponse<any>): any => r.body));
  }

  /** Path part for operation `orderitemsGet()` */
  static readonly OrderitemsGetPath = '/orderitems';

  /**
   * List orderitems.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `orderitemsGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  orderitemsGet$Response(params?: OrderitemsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return orderitemsGet(this.http, this.rootUrl, params, context);
  }

  /**
   * List orderitems.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `orderitemsGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  orderitemsGet(params?: OrderitemsGet$Params, context?: HttpContext): Observable<any> {
    return this.orderitemsGet$Response(params, context).pipe(map((r: StrictHttpResponse<any>): any => r.body));
  }

  /** Path part for operation `orderitemsPost()` */
  static readonly OrderitemsPostPath = '/orderitems';

  /**
   * Create orderitem.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `orderitemsPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  orderitemsPost$Response(params?: OrderitemsPost$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return orderitemsPost(this.http, this.rootUrl, params, context);
  }

  /**
   * Create orderitem.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `orderitemsPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  orderitemsPost(params?: OrderitemsPost$Params, context?: HttpContext): Observable<any> {
    return this.orderitemsPost$Response(params, context).pipe(map((r: StrictHttpResponse<any>): any => r.body));
  }
}
