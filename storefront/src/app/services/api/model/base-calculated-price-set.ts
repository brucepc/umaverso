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
 * The calculated price\'s details.
 */
export interface BaseCalculatedPriceSet { 
    /**
     * The calculated price\'s ID.
     */
    id: string;
    /**
     * Whether the calculated price belongs to a price list.
     */
    is_calculated_price_price_list?: boolean;
    /**
     * Whether the calculated price is tax inclusive.
     */
    is_calculated_price_tax_inclusive?: boolean;
    /**
     * The amount of the calculated price, or `null` if there isn\'t a calculated price. This is the amount shown to the customer.
     */
    calculated_amount: number;
    /**
     * The calculated price\'s amount with taxes applied.
     */
    calculated_amount_with_tax?: number;
    /**
     * The calculated price\'s amount without taxes applied.
     */
    calculated_amount_without_tax?: number;
    /**
     * Whether the original price belongs to a price list.
     */
    is_original_price_price_list?: boolean;
    /**
     * Whether the original price is tax inclusive.
     */
    is_original_price_tax_inclusive?: boolean;
    /**
     * The amount of the original price, or `null` if there isn\'t an original price. This amount is useful to compare with the `calculated_amount`, such as to check for discounted value.
     */
    original_amount: number;
    /**
     * The calculated price\'s currency code.
     */
    currency_code: string;
    /**
     * The calculated price\'s details.
     */
    calculated_price?: object;
    /**
     * The original price\'s details.
     */
    original_price?: object;
}

