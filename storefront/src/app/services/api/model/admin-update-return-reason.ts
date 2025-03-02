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
 * The details to update in a return reason.
 */
export interface AdminUpdateReturnReason { 
    /**
     * The return reason\'s label.
     */
    label: string;
    /**
     * The return reason\'s value.
     */
    value: string;
    /**
     * The return reason\'s description.
     */
    description?: string;
    /**
     * The return reason\'s metadata, can hold custom key-value pairs.
     */
    metadata?: object;
}

