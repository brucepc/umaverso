/**
 * Medusa Storefront API
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { StoreOrderShippingMethodDetailAllOfShippingMethod } from './store-order-shipping-method-detail-all-of-shipping-method';


/**
 * Details of changes to a shipping method.
 */
export interface StoreOrderShippingMethodDetail { 
    /**
     * The ID of the new changes to the shipping method.
     */
    id: string;
    /**
     * The ID of the shipping method.
     */
    shipping_method_id: string;
    shipping_method: StoreOrderShippingMethodDetailAllOfShippingMethod;
    /**
     * The ID of the associated claim.
     */
    claim_id?: string;
    /**
     * The ID of the associated exchange.
     */
    exchange_id?: string;
    /**
     * The ID of the associated return.
     */
    return_id?: string;
    /**
     * The date the shipping method change was created.
     */
    created_at: string;
    /**
     * The date the shipping method change was updated.
     */
    updated_at: string;
}

