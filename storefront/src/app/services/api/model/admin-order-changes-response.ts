/**
 * Medusa Storefront API
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { AdminOrderChange } from './admin-order-change';


/**
 * The details of an order\'s changes.
 */
export interface AdminOrderChangesResponse { 
    /**
     * An order\'s changes.
     */
    order_changes: Array<AdminOrderChange>;
}

