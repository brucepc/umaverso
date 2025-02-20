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
 * The currency\'s details.
 */
export interface StoreCurrency { 
    /**
     * The currency\'s code.
     */
    code: string;
    /**
     * The currency\'s symbol.
     */
    symbol: string;
    /**
     * The currency\'s symbol native.
     */
    symbol_native: string;
    /**
     * The currency\'s name.
     */
    name: string;
    /**
     * The currency\'s decimal digits.
     */
    decimal_digits: number;
    /**
     * The currency\'s rounding.
     */
    rounding: number;
    /**
     * The date the currency was created.
     */
    created_at: string;
    /**
     * The date the currency was updated.
     */
    updated_at: string;
    /**
     * The date the currency was deleted.
     */
    deleted_at: string;
}

