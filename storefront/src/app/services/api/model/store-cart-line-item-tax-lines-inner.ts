/**
 * Medusa Storefront API
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


/**
 * The tax line\'s details
 */
export interface StoreCartLineItemTaxLinesInner { 
    /**
     * The details of the item that the tax line belongs to.
     */
    item: object;
    /**
     * The ID of the line item this tax line belongs to.
     */
    item_id: string;
    /**
     * The item\'s total including taxes and promotions.
     */
    total: number;
    /**
     * The item\'s total excluding taxes, including promotions.
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
     * The ID of the applied tax rate.
     */
    tax_rate_id?: string;
    /**
     * The code that the tax rate is identified by.
     */
    code: string;
    /**
     * The charged rate.
     */
    rate: number;
    /**
     * The ID of the tax provider used to calculate the tax line.
     */
    provider_id?: string;
    /**
     * The date the tax line was created.
     */
    created_at: string;
    /**
     * The date the tax line was updated.
     */
    updated_at: string;
}

