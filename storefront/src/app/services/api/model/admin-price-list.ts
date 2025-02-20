/**
 * Medusa Storefront API
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { AdminPriceListPrice } from './admin-price-list-price';


/**
 * The price list\'s details.
 */
export interface AdminPriceList { 
    /**
     * The price list\'s ID.
     */
    id: string;
    /**
     * The price list\'s title.
     */
    title: string;
    /**
     * The price list\'s description.
     */
    description: string;
    /**
     * The price list\'s rules.
     */
    rules: object;
    /**
     * The date the price list starts.
     */
    starts_at: string;
    /**
     * The date the price list ends.
     */
    ends_at: string;
    /**
     * The price list\'s status.
     */
    status: AdminPriceList.StatusEnum;
    /**
     * The price list\'s type.
     */
    type: AdminPriceList.TypeEnum;
    /**
     * The price list\'s prices.
     */
    prices: Array<AdminPriceListPrice>;
    /**
     * The date the price list was created.
     */
    created_at: string;
    /**
     * The date the price list was updated.
     */
    updated_at: string;
    /**
     * The date the price list was deleted.
     */
    deleted_at: string;
}
export namespace AdminPriceList {
    export type StatusEnum = 'draft' | 'active';
    export const StatusEnum = {
        Draft: 'draft' as StatusEnum,
        Active: 'active' as StatusEnum
    };
    export type TypeEnum = 'sale' | 'override';
    export const TypeEnum = {
        Sale: 'sale' as TypeEnum,
        Override: 'override' as TypeEnum
    };
}


