/**
 * Medusa Storefront API
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { AdminStore } from './admin-store';


/**
 * The paginated list of stores.
 */
export interface AdminStoreListResponse { 
    /**
     * The maximum number of items returned.
     */
    limit: number;
    /**
     * The number of items skipped before retrieving the returned items.
     */
    offset: number;
    /**
     * The total number of items.
     */
    count: number;
    /**
     * The list of stores.
     */
    stores: Array<AdminStore>;
}

