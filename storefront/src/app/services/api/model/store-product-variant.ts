/**
 * Medusa Storefront API
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { StoreProductOptionValue } from './store-product-option-value';
import { BaseCalculatedPriceSet } from './base-calculated-price-set';


/**
 * The variant\'s details.
 */
export interface StoreProductVariant { 
    /**
     * The variant\'s options.
     */
    options: Array<StoreProductOptionValue>;
    product?: object;
    /**
     * The variant\'s length.
     */
    length: number;
    /**
     * The variant\'s title.
     */
    title: string;
    /**
     * The variant\'s metadata, can hold custom key-value pairs.
     */
    metadata?: object;
    /**
     * The variant\'s ID.
     */
    id: string;
    /**
     * The variant\'s width.
     */
    width: number;
    /**
     * The variant\'s weight.
     */
    weight: number;
    /**
     * The variant\'s height.
     */
    height: number;
    /**
     * The variant\'s origin country.
     */
    origin_country: string;
    /**
     * The variant\'s HS code.
     */
    hs_code: string;
    /**
     * The variant\'s MID code.
     */
    mid_code: string;
    /**
     * The variant\'s material.
     */
    material: string;
    /**
     * The date the variant was created.
     */
    created_at: string;
    /**
     * The date the variant was updated.
     */
    updated_at: string;
    /**
     * The date the variant was deleted.
     */
    deleted_at: string;
    /**
     * The ID of the product this variant belongs to.
     */
    product_id?: string;
    /**
     * The variant\'s SKU.
     */
    sku: string;
    /**
     * The variant\'s barcode.
     */
    barcode: string;
    /**
     * The variant\'s EAN.
     */
    ean: string;
    /**
     * The variant\'s UPC.
     */
    upc: string;
    /**
     * Whether the variant can be ordered even if it\'s not in stock.
     */
    allow_backorder: boolean;
    /**
     * Whether Medusa manages the variant\'s inventory. If disabled, the variant is always considered in stock.
     */
    manage_inventory: boolean;
    /**
     * The variant\'s inventory quantity. This property is only available if you pass `+variants.inventory_quantity` in the `fields` query parameter.
     */
    inventory_quantity?: number;
    /**
     * The variant\'s rank among its siblings.
     */
    variant_rank?: number;
    calculated_price?: BaseCalculatedPriceSet;
}

