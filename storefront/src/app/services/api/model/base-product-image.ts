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
 * The image\'s details.
 */
export interface BaseProductImage { 
    /**
     * The image\'s ID.
     */
    id: string;
    /**
     * The image\'s URL.
     */
    url: string;
    /**
     * The date the image was created.
     */
    created_at?: string;
    /**
     * The date the image was updated.
     */
    updated_at?: string;
    /**
     * The date the image was deleted.
     */
    deleted_at?: string;
    /**
     * The image\'s metadata, can hold custom key-value pairs.
     */
    metadata?: object;
    /**
     * The image\'s rank among its sibling images.
     */
    rank: number;
}

