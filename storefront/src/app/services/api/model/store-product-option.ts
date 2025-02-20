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


/**
 * The product option\'s details.
 */
export interface StoreProductOption { 
    /**
     * The option\'s ID.
     */
    id: string;
    /**
     * The option\'s title.
     */
    title: string;
    product?: object;
    /**
     * The ID of the product this option belongs to.
     */
    product_id?: string;
    /**
     * The option\'s values.
     */
    values?: Array<StoreProductOptionValue>;
    /**
     * The option\'s metadata, can hold custom key-value pairs.
     */
    metadata?: object;
    /**
     * The date the product option was created.
     */
    created_at?: string;
    /**
     * The date the product option was updated.
     */
    updated_at?: string;
    /**
     * The date the product option was deleted.
     */
    deleted_at?: string;
}

