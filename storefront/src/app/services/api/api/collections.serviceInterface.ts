/**
 * Medusa Storefront API
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { HttpHeaders }                                       from '@angular/common/http';

import { Observable }                                        from 'rxjs';

import { GetCollections200Response } from '../model/models';
import { GetCollectionsCreatedAtParameter } from '../model/models';
import { GetCollectionsHandleParameter } from '../model/models';
import { GetCollectionsTitleParameter } from '../model/models';
import { GetCollectionsUpdatedAtParameter } from '../model/models';
import { StoreCollectionResponse } from '../model/models';


import { Configuration }                                     from '../configuration';



export interface CollectionsServiceInterface {
    defaultHeaders: HttpHeaders;
    configuration: Configuration;

    /**
     * List Collections
     * Retrieve a list of collections. The collections can be filtered by fields such as &#x60;handle&#x60;. The collections can also be sorted or paginated.
     * @param xPublishableApiKey Publishable API Key created in the Medusa Admin.
     * @param fields Comma-separated fields that should be included in the returned data. if a field is prefixed with &#x60;+&#x60; it will be added to the default fields, using &#x60;-&#x60; will remove it from the default fields. without prefix it will replace the entire default fields.
     * @param offset The number of items to skip when retrieving a list.
     * @param limit Limit the number of items returned in the list.
     * @param order The field to sort the data by. By default, the sort order is ascending. To change the order to descending, prefix the field name with &#x60;-&#x60;.
     * @param title 
     * @param createdAt Filter by the collection\&#39;s creation date.
     * @param updatedAt Filter by the collection\&#39;s update date.
     * @param handle 
     * @param q Search term to filter the collection\&#39;s searchable properties.
     * @param $and Join query parameters with an AND condition. Each object\&#39;s content is the same type as the expected query parameters.
     * @param $or Join query parameters with an OR condition. Each object\&#39;s content is the same type as the expected query parameters.
     */
    getCollections(xPublishableApiKey: string, fields?: string, offset?: number, limit?: number, order?: string, title?: GetCollectionsTitleParameter, createdAt?: GetCollectionsCreatedAtParameter, updatedAt?: GetCollectionsUpdatedAtParameter, handle?: GetCollectionsHandleParameter, q?: string, $and?: Array<object>, $or?: Array<object>, extraHttpRequestParams?: any): Observable<GetCollections200Response>;

    /**
     * Get a Collection
     * Retrieve a collection by its ID. You can expand the collection\&#39;s relations or select the fields that should be returned.
     * @param id The collection\&#39;s ID.
     * @param xPublishableApiKey Publishable API Key created in the Medusa Admin.
     * @param fields Comma-separated fields that should be included in the returned data. if a field is prefixed with &#x60;+&#x60; it will be added to the default fields, using &#x60;-&#x60; will remove it from the default fields. without prefix it will replace the entire default fields.
     */
    getCollectionsId(id: string, xPublishableApiKey: string, fields?: string, extraHttpRequestParams?: any): Observable<StoreCollectionResponse>;

}
