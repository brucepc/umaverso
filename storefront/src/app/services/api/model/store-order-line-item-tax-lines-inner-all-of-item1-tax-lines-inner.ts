/**
 * Medusa Storefront API
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface StoreOrderLineItemTaxLinesInnerAllOfItem1TaxLinesInner { 
    /**
     * The tax line\'s item.
     */
    item: object;
    /**
     * The tax line\'s item id.
     */
    item_id: string;
    /**
     * The tax line\'s total.
     */
    total: number;
    /**
     * The tax line\'s subtotal.
     */
    subtotal: number;
    /**
     * The tax line\'s ID.
     */
    id: string;
    /**
     * The tax line\'s description.
     */
    description?: string;
    /**
     * The tax line\'s tax rate id.
     */
    tax_rate_id?: string;
    /**
     * The tax line\'s code.
     */
    code: string;
    /**
     * The tax line\'s rate.
     */
    rate: number;
    /**
     * The tax line\'s provider id.
     */
    provider_id?: string;
    /**
     * The tax line\'s created at.
     */
    created_at: string;
    /**
     * The tax line\'s updated at.
     */
    updated_at: string;
}

