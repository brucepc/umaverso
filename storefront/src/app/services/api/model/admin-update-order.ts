/**
 * Medusa Storefront API
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { AdminUpdateOrderBillingAddress } from './admin-update-order-billing-address';
import { AdminUpdateOrderShippingAddress } from './admin-update-order-shipping-address';


/**
 * The details to update in the order.
 */
export interface AdminUpdateOrder { 
    /**
     * The order\'s email.
     */
    email?: string;
    shipping_address?: AdminUpdateOrderShippingAddress;
    billing_address?: AdminUpdateOrderBillingAddress;
}

