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
 * An item\'s details.
 */
export interface AdminPostClaimItemsReqSchemaItemsInner { 
    /**
     * The ID of the order\'s item.
     */
    id: string;
    /**
     * The quantity of the order\'s item to add to the claim.
     */
    quantity: number;
    /**
     * The reason the item is claimed.
     */
    reason?: AdminPostClaimItemsReqSchemaItemsInner.ReasonEnum;
    /**
     * The item\'s description.
     */
    description?: string;
    /**
     * A note that\'s only viewed by admin users.
     */
    internal_note?: string;
}
export namespace AdminPostClaimItemsReqSchemaItemsInner {
    export type ReasonEnum = 'missing_item' | 'wrong_item' | 'production_failure' | 'other';
    export const ReasonEnum = {
        MissingItem: 'missing_item' as ReasonEnum,
        WrongItem: 'wrong_item' as ReasonEnum,
        ProductionFailure: 'production_failure' as ReasonEnum,
        Other: 'other' as ReasonEnum
    };
}


