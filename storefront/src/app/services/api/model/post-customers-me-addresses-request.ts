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
 * The address\'s details.
 */
export interface PostCustomersMeAddressesRequest {
    /**
     * The customer\'s first name.
     */
    first_name?: string;
    /**
     * The customer\'s last name.
     */
    last_name?: string;
    /**
     * The customer\'s phone.
     */
    phone?: string;
    /**
     * The address\'s company.
     */
    company?: string;
    /**
     * The address\'s first line.
     */
    address_1?: string;
    /**
     * The address\'s second line.
     */
    address_2?: string;
    /**
     * The address\'s city.
     */
    city?: string;
    /**
     * The address\'s country code.
     */
    country_code?: string;
    /**
     * The address\'s province.
     */
    province?: string;
    /**
     * The address\'s postal code.
     */
    postal_code?: string;
    /**
     * The address\'s name.
     */
    address_name?: string;
    /**
     * Whether the address is used by default for shipping during checkout-page.
     */
    is_default_shipping?: boolean;
    /**
     * Whether the address is used by default for billing during checkout-page.
     */
    is_default_billing?: boolean;
    /**
     * Holds custom key-value pairs.
     */
    metadata?: object;
}

