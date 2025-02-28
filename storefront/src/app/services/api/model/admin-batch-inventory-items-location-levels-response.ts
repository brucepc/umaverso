/**
 * Medusa Storefront API
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { InventoryLevel } from './inventory-level';


/**
 * The result of managing inventory levels.
 */
export interface AdminBatchInventoryItemsLocationLevelsResponse { 
    /**
     * The created inventory levels.
     */
    created?: Array<InventoryLevel>;
    /**
     * The updated inventory levels.
     */
    updated?: Array<InventoryLevel>;
    /**
     * The IDs of deleted inventory levels.
     */
    deleted?: Array<string>;
}

