/**
 * Medusa Storefront API
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { AdminFulfillmentProviderOption } from './admin-fulfillment-provider-option';


/**
 * The paginated list of fulfillment options.
 */
export interface AdminFulfillmentProviderOptionsListResponse { 
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
     * The list of fulfillment options.
     */
    fulfillment_options: Array<AdminFulfillmentProviderOption>;
}

