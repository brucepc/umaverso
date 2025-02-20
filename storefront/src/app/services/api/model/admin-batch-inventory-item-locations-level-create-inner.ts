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
 * The inventory level\'s details.
 */
export interface AdminBatchInventoryItemLocationsLevelCreateInner { 
    /**
     * The ID of the associated location.
     */
    location_id: string;
    /**
     * The inventory level\'s stocked quantity.
     */
    stocked_quantity?: number;
    /**
     * The inventory level\'s incoming quantity.
     */
    incoming_quantity?: number;
}

