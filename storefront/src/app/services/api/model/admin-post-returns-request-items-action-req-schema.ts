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
 * The details to update in the item.
 */
export interface AdminPostReturnsRequestItemsActionReqSchema { 
    /**
     * The item\'s quantity.
     */
    quantity?: number;
    /**
     * A note viewed only by admin users.
     */
    internal_note?: string;
    /**
     * The ID of the associated return reason.
     */
    reason_id?: string;
    /**
     * The claim\'s metadata, can hold custom key-value pairs.
     */
    metadata?: object;
}

