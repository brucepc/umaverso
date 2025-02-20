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
 * The shipping option\'s details.
 */
export interface AdminShippingOptionType { 
    /**
     * The shipping option\'s ID.
     */
    id: string;
    /**
     * The date the shipping option was created.
     */
    created_at: string;
    /**
     * The date the shipping option was updated.
     */
    updated_at: string;
    /**
     * The date the shipping option was deleted.
     */
    deleted_at: string;
    /**
     * The type\'s label.
     */
    label: string;
    /**
     * The type\'s description.
     */
    description: string;
    /**
     * The type\'s code.
     */
    code: string;
    /**
     * The type\'s shipping option id.
     */
    shipping_option_id: string;
}

