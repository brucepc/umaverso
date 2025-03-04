/**
 * Medusa Storefront API
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { AdminInventoryItem } from './admin-inventory-item';


/**
 * The reservation\'s details.
 */
export interface AdminReservation { 
    /**
     * The reservation\'s ID.
     */
    id: string;
    /**
     * The ID of the line item this reservation is for.
     */
    line_item_id: string;
    /**
     * The ID of the location the quantity is reserved from.
     */
    location_id: string;
    /**
     * The reservation\'s quantity.
     */
    quantity: number;
    /**
     * An ID in an external system
     */
    external_id: string;
    /**
     * The reservation\'s description.
     */
    description: string;
    /**
     * The ID of the inventory item this reservation is associated with.
     */
    inventory_item_id: string;
    inventory_item?: AdminInventoryItem;
    /**
     * The reservation\'s metadata, can hold custom key-value pairs.
     */
    metadata?: object;
    /**
     * The ID of the user that created this reservation.
     */
    created_by?: string;
    /**
     * The date this reservation was deleted.
     */
    deleted_at?: string;
    /**
     * The date this reservation was created.
     */
    created_at?: string;
    /**
     * The date this reservation was updated.
     */
    updated_at?: string;
}

