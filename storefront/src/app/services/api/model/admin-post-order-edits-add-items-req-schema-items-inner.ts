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
 * An item\'s details.
 */
export interface AdminPostOrderEditsAddItemsReqSchemaItemsInner { 
    /**
     * The ID of the associated product variant.
     */
    variant_id: string;
    /**
     * The item\'s quantity.
     */
    quantity: number;
    /**
     * The item\'s unit price.
     */
    unit_price?: number;
    /**
     * A note viewed only by admin users.
     */
    internal_note?: string;
    /**
     * Whether the item can be added even if there\'s no available invenotory quantity of the variant.
     */
    allow_backorder?: boolean;
    /**
     * The item\'s metadata, can hold custom key-value pairs.
     */
    metadata?: object;
    /**
     * The original price of the item before a promotion or sale.
     */
    compare_at_unit_price?: number;
}

