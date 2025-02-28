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
 * The product option\'s details.
 */
export interface AdminProductOption { 
    /**
     * The product option\'s ID.
     */
    id: string;
    /**
     * The product option\'s title.
     */
    title: string;
    product?: object;
    /**
     * The ID of the product this option belongs to.
     */
    product_id?: string;
    /**
     * The product option\'s values.
     */
    values?: Array<object>;
    /**
     * The product option\'s metadata, can hold custom key-value pairs.
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

