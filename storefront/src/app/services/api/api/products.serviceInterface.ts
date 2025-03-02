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

import { GetProducts200Response } from '../model/models';
import { GetProductsCategoryIdParameter } from '../model/models';
import { GetProductsCreatedAtParameter } from '../model/models';
import { GetProductsHandleParameter } from '../model/models';
import { GetProductsIdParameter } from '../model/models';
import { GetProductsSalesChannelIdParameter } from '../model/models';
import { GetProductsTagIdParameter } from '../model/models';
import { GetProductsTitleParameter } from '../model/models';
import { GetProductsTypeIdParameter } from '../model/models';
import { GetProductsUpdatedAtParameter } from '../model/models';
import { GetProductsVariantsParameter } from '../model/models';
import { StoreProductResponse } from '../model/models';


import { Configuration }                                     from '../configuration';



export interface ProductsServiceInterface {
    defaultHeaders: HttpHeaders;
    configuration: Configuration;

    /**
     * List Products
     * Retrieve a list of products. The products can be filtered by fields such as &#x60;id&#x60;. The products can also be sorted or paginated.
     * @param xPublishableApiKey Publishable API Key created in the Medusa Admin.
     * @param fields Comma-separated fields that should be included in the returned data. if a field is prefixed with &#x60;+&#x60; it will be added to the default fields, using &#x60;-&#x60; will remove it from the default fields. without prefix it will replace the entire default fields.
     * @param offset The number of items to skip when retrieving a list.
     * @param limit Limit the number of items returned in the list.
     * @param order The field to sort the data by. By default, the sort order is ascending. To change the order to descending, prefix the field name with &#x60;-&#x60;.
     * @param $and Join query parameters with an AND condition. Each object\&#39;s content is the same type as the expected query parameters.
     * @param $or Join query parameters with an OR condition. Each object\&#39;s content is the same type as the expected query parameters.
     * @param q Search term to filter the product\&#39;s searchable properties.
     * @param id 
     * @param title Filter by product titles.
     * @param handle Filter by product handles.
     * @param isGiftcard Whether the product is a gift card.
     * @param collectionId Filter by a collection\&#39;s ID to retrieve the products in it.
     * @param tagId Filter by a tag\&#39;s ID to retrieve the products in it.
     * @param typeId Filter by a type\&#39;s ID to retrieve the products in it.
     * @param createdAt Filter by the product\&#39;s creation date.
     * @param updatedAt Filter by the product\&#39;s update date.
     * @param regionId The ID of the region the products are being viewed from. This is required if you\&#39;re retrieving product variant prices with taxes.
     * @param province The province the products are being viewed from. This is useful to narrow down the tax context when calculating product variant prices with taxes.
     * @param salesChannelId 
     * @param categoryId 
     * @param variants Filter the products\&#39; variants.
     * @param countryCode The product\&#39;s country code.
     * @param cartId The product\&#39;s cart id.
     */
    getProducts(xPublishableApiKey: string, fields?: string, offset?: number, limit?: number, order?: string, $and?: Array<object>, $or?: Array<object>, q?: string, id?: GetProductsIdParameter, title?: GetProductsTitleParameter, handle?: GetProductsHandleParameter, isGiftcard?: boolean, collectionId?: Array<string>, tagId?: GetProductsTagIdParameter, typeId?: GetProductsTypeIdParameter, createdAt?: GetProductsCreatedAtParameter, updatedAt?: GetProductsUpdatedAtParameter, regionId?: string, province?: string, salesChannelId?: GetProductsSalesChannelIdParameter, categoryId?: GetProductsCategoryIdParameter, variants?: GetProductsVariantsParameter, countryCode?: string, cartId?: string, extraHttpRequestParams?: any): Observable<GetProducts200Response>;

    /**
     * Get a Product
     * Retrieve a product by its ID. You can expand the product\&#39;s relations or select the fields that should be returned.
     * @param id The product\&#39;s ID.
     * @param xPublishableApiKey Publishable API Key created in the Medusa Admin.
     * @param fields Comma-separated fields that should be included in the returned data. if a field is prefixed with &#x60;+&#x60; it will be added to the default fields, using &#x60;-&#x60; will remove it from the default fields. without prefix it will replace the entire default fields.
     * @param regionId The ID of the region the product is being viewed from. This is required if you\&#39;re retrieving product variant prices with taxes.
     * @param countryCode The country code the product is being viewed from. This is required if you\&#39;re retrieving product variant prices with taxes.
     * @param province The province the product is being viewed from. This is useful to narrow down the tax context when calculating product variant prices with taxes.
     * @param cartId The ID of the customer\&#39;s cart. If set, the cart\&#39;s region and shipping address\&#39;s country code and province are used instead of the &#x60;region_id&#x60;, &#x60;country_code&#x60;, and &#x60;province&#x60; properties.
     * @param limit Limit the number of items returned in the list.
     * @param offset The number of items to skip when retrieving a list.
     * @param order The field to sort the data by. By default, the sort order is ascending. To change the order to descending, prefix the field name with &#x60;-&#x60;.
     */
    getProductsId(id: string, xPublishableApiKey: string, fields?: string, regionId?: string, countryCode?: string, province?: string, cartId?: string, limit?: number, offset?: number, order?: string, extraHttpRequestParams?: any): Observable<StoreProductResponse>;

}
