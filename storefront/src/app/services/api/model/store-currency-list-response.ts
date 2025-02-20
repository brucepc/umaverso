/**
 * Medusa Storefront API
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { StoreCurrency } from './store-currency';


/**
 * The paginated list of currencies.
 */
export interface StoreCurrencyListResponse { 
    /**
     * The maximum number of items returned.
     */
    limit: number;
    /**
     * The number of items skipped before retrieving the returned items.
     */
    offset: number;
    /**
     * The total count of items.
     */
    count: number;
    /**
     * The list of currencies.
     */
    currencies: Array<StoreCurrency>;
}

