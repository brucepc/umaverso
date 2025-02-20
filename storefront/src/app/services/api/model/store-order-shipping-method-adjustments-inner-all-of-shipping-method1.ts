/**
 * Medusa Storefront API
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { StoreOrderShippingMethodTaxLinesInnerAllOfShippingMethod1AdjustmentsInner } from './store-order-shipping-method-tax-lines-inner-all-of-shipping-method1-adjustments-inner';
import { StoreOrderShippingMethodTaxLinesInnerAllOfShippingMethod1TaxLinesInner } from './store-order-shipping-method-tax-lines-inner-all-of-shipping-method1-tax-lines-inner';
import { StoreOrderShippingMethodTaxLinesInnerAllOfShippingMethod1Detail } from './store-order-shipping-method-tax-lines-inner-all-of-shipping-method1-detail';


/**
 * The adjustment\'s shipping method.
 */
export interface StoreOrderShippingMethodAdjustmentsInnerAllOfShippingMethod1 { 
    /**
     * The shipping method\'s tax lines.
     */
    tax_lines?: Array<StoreOrderShippingMethodTaxLinesInnerAllOfShippingMethod1TaxLinesInner>;
    /**
     * The shipping method\'s adjustments.
     */
    adjustments?: Array<StoreOrderShippingMethodTaxLinesInnerAllOfShippingMethod1AdjustmentsInner>;
    detail?: StoreOrderShippingMethodTaxLinesInnerAllOfShippingMethod1Detail;
    /**
     * The shipping method\'s ID.
     */
    id: string;
    /**
     * The shipping method\'s order id.
     */
    order_id: string;
    /**
     * The shipping method\'s name.
     */
    name: string;
    /**
     * The shipping method\'s description.
     */
    description?: string;
    /**
     * The shipping method\'s amount.
     */
    amount: number;
    /**
     * The shipping method\'s is tax inclusive.
     */
    is_tax_inclusive: boolean;
    /**
     * The shipping method\'s shipping option id.
     */
    shipping_option_id: string;
    /**
     * The shipping method\'s data.
     */
    data: object;
    /**
     * The shipping method\'s metadata.
     */
    metadata: object;
    /**
     * The shipping method\'s original total.
     */
    original_total: number;
    /**
     * The shipping method\'s original subtotal.
     */
    original_subtotal: number;
    /**
     * The shipping method\'s original tax total.
     */
    original_tax_total: number;
    /**
     * The shipping method\'s total.
     */
    total: number;
    /**
     * The shipping method\'s subtotal.
     */
    subtotal: number;
    /**
     * The shipping method\'s tax total.
     */
    tax_total: number;
    /**
     * The shipping method\'s discount total.
     */
    discount_total: number;
    /**
     * The shipping method\'s discount tax total.
     */
    discount_tax_total: number;
    /**
     * The shipping method\'s created at.
     */
    created_at: string;
    /**
     * The shipping method\'s updated at.
     */
    updated_at: string;
}

