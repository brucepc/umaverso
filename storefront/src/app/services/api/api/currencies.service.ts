/**
 * Medusa Storefront API
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent, HttpParameterCodec, HttpContext 
        }       from '@angular/common/http';
import { CustomHttpParameterCodec }                          from '../encoder';
import { Observable }                                        from 'rxjs';

// @ts-ignore
import { GetCurrenciesCodeParameter } from '../model/get-currencies-code-parameter';
// @ts-ignore
import { StoreCurrencyListResponse } from '../model/store-currency-list-response';
// @ts-ignore
import { StoreCurrencyResponse } from '../model/store-currency-response';

// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';
import {
    CurrenciesServiceInterface
} from './currencies.serviceInterface';



@Injectable({
  providedIn: 'root'
})
export class CurrenciesService implements CurrenciesServiceInterface {

    protected basePath = 'http://localhost:9000';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();
    public encoder: HttpParameterCodec;

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string|string[], @Optional() configuration: Configuration) {
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            const firstBasePath = Array.isArray(basePath) ? basePath[0] : undefined;
            if (firstBasePath != undefined) {
                basePath = firstBasePath;
            }

            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }


    // @ts-ignore
    private addToHttpParams(httpParams: HttpParams, value: any, key?: string): HttpParams {
        if (typeof value === "object" && value instanceof Date === false) {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        } else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    }

    private addToHttpParamsRecursive(httpParams: HttpParams, value?: any, key?: string): HttpParams {
        if (value == null) {
            return httpParams;
        }

        if (typeof value === "object") {
            if (Array.isArray(value)) {
                (value as any[]).forEach( elem => httpParams = this.addToHttpParamsRecursive(httpParams, elem, key));
            } else if (value instanceof Date) {
                if (key != null) {
                    httpParams = httpParams.append(key, (value as Date).toISOString().substring(0, 10));
                } else {
                   throw Error("key may not be null if value is Date");
                }
            } else {
                Object.keys(value).forEach( k => httpParams = this.addToHttpParamsRecursive(
                    httpParams, value[k], key != null ? `${key}.${k}` : k));
            }
        } else if (key != null) {
            httpParams = httpParams.append(key, value);
        } else {
            throw Error("key may not be null if value is not object or array");
        }
        return httpParams;
    }

    /**
     * List Currencies
     * Retrieve a list of currencies. The currencies can be filtered by fields such as &#x60;code&#x60;. The currencies can also be sorted or paginated.
     * @param xPublishableApiKey Publishable API Key created in the Medusa Admin.
     * @param fields Comma-separated fields that should be included in the returned data. if a field is prefixed with &#x60;+&#x60; it will be added to the default fields, using &#x60;-&#x60; will remove it from the default fields. without prefix it will replace the entire default fields.
     * @param offset The number of items to skip when retrieving a list.
     * @param limit Limit the number of items returned in the list.
     * @param order The field to sort the data by. By default, the sort order is ascending. To change the order to descending, prefix the field name with &#x60;-&#x60;.
     * @param q Search term to filter the currency\&#39;s searchable properties.
     * @param code 
     * @param $and Join query parameters with an AND condition. Each object\&#39;s content is the same type as the expected query parameters.
     * @param $or Join query parameters with an OR condition. Each object\&#39;s content is the same type as the expected query parameters.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getCurrencies(xPublishableApiKey: string, fields?: string, offset?: number, limit?: number, order?: string, q?: string, code?: GetCurrenciesCodeParameter, $and?: Array<object>, $or?: Array<object>, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'text/plain', context?: HttpContext, transferCache?: boolean}): Observable<StoreCurrencyListResponse>;
    public getCurrencies(xPublishableApiKey: string, fields?: string, offset?: number, limit?: number, order?: string, q?: string, code?: GetCurrenciesCodeParameter, $and?: Array<object>, $or?: Array<object>, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'text/plain', context?: HttpContext, transferCache?: boolean}): Observable<HttpResponse<StoreCurrencyListResponse>>;
    public getCurrencies(xPublishableApiKey: string, fields?: string, offset?: number, limit?: number, order?: string, q?: string, code?: GetCurrenciesCodeParameter, $and?: Array<object>, $or?: Array<object>, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'text/plain', context?: HttpContext, transferCache?: boolean}): Observable<HttpEvent<StoreCurrencyListResponse>>;
    public getCurrencies(xPublishableApiKey: string, fields?: string, offset?: number, limit?: number, order?: string, q?: string, code?: GetCurrenciesCodeParameter, $and?: Array<object>, $or?: Array<object>, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json' | 'text/plain', context?: HttpContext, transferCache?: boolean}): Observable<any> {
        if (xPublishableApiKey === null || xPublishableApiKey === undefined) {
            throw new Error('Required parameter xPublishableApiKey was null or undefined when calling getCurrencies.');
        }

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        if (fields !== undefined && fields !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>fields, 'fields');
        }
        if (offset !== undefined && offset !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>offset, 'offset');
        }
        if (limit !== undefined && limit !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>limit, 'limit');
        }
        if (order !== undefined && order !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>order, 'order');
        }
        if (q !== undefined && q !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>q, 'q');
        }
        if (code !== undefined && code !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>code, 'code');
        }
        if ($and) {
            $and.forEach((element) => {
                localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
                  <any>element, '$and');
            })
        }
        if ($or) {
            $or.forEach((element) => {
                localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
                  <any>element, '$or');
            })
        }

        let localVarHeaders = this.defaultHeaders;
        if (xPublishableApiKey !== undefined && xPublishableApiKey !== null) {
            localVarHeaders = localVarHeaders.set('x-publishable-api-key', String(xPublishableApiKey));
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json',
                'text/plain'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }

        let localVarTransferCache: boolean | undefined = options && options.transferCache;
        if (localVarTransferCache === undefined) {
            localVarTransferCache = true;
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        let localVarPath = `/store/currencies`;
        return this.httpClient.request<StoreCurrencyListResponse>('get', `${this.configuration.basePath}${localVarPath}`,
            {
                context: localVarHttpContext,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                transferCache: localVarTransferCache,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get a Currency
     * Retrieve a currency by its code. You can expand the currency\&#39;s relations or select the fields that should be returned.
     * @param code The currency\&#39;s code.
     * @param xPublishableApiKey Publishable API Key created in the Medusa Admin.
     * @param fields Comma-separated fields that should be included in the returned data. if a field is prefixed with &#x60;+&#x60; it will be added to the default fields, using &#x60;-&#x60; will remove it from the default fields. without prefix it will replace the entire default fields.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getCurrenciesCode(code: string, xPublishableApiKey: string, fields?: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'text/plain', context?: HttpContext, transferCache?: boolean}): Observable<StoreCurrencyResponse>;
    public getCurrenciesCode(code: string, xPublishableApiKey: string, fields?: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'text/plain', context?: HttpContext, transferCache?: boolean}): Observable<HttpResponse<StoreCurrencyResponse>>;
    public getCurrenciesCode(code: string, xPublishableApiKey: string, fields?: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'text/plain', context?: HttpContext, transferCache?: boolean}): Observable<HttpEvent<StoreCurrencyResponse>>;
    public getCurrenciesCode(code: string, xPublishableApiKey: string, fields?: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json' | 'text/plain', context?: HttpContext, transferCache?: boolean}): Observable<any> {
        if (code === null || code === undefined) {
            throw new Error('Required parameter code was null or undefined when calling getCurrenciesCode.');
        }
        if (xPublishableApiKey === null || xPublishableApiKey === undefined) {
            throw new Error('Required parameter xPublishableApiKey was null or undefined when calling getCurrenciesCode.');
        }

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        if (fields !== undefined && fields !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>fields, 'fields');
        }

        let localVarHeaders = this.defaultHeaders;
        if (xPublishableApiKey !== undefined && xPublishableApiKey !== null) {
            localVarHeaders = localVarHeaders.set('x-publishable-api-key', String(xPublishableApiKey));
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json',
                'text/plain'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }

        let localVarTransferCache: boolean | undefined = options && options.transferCache;
        if (localVarTransferCache === undefined) {
            localVarTransferCache = true;
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        let localVarPath = `/store/currencies/${this.configuration.encodeParam({name: "code", value: code, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: undefined})}`;
        return this.httpClient.request<StoreCurrencyResponse>('get', `${this.configuration.basePath}${localVarPath}`,
            {
                context: localVarHttpContext,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                transferCache: localVarTransferCache,
                reportProgress: reportProgress
            }
        );
    }

}
