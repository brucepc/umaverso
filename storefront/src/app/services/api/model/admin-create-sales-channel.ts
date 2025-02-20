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
 * The sales channel\'s details.
 */
export interface AdminCreateSalesChannel { 
    /**
     * The sales channel\'s name.
     */
    name: string;
    /**
     * The sales channel\'s description.
     */
    description?: string;
    /**
     * Whether the sales channel is disabled.
     */
    is_disabled?: boolean;
    /**
     * The sales channel\'s metadata, used to store custom key-value pairs.
     */
    metadata?: object;
}

