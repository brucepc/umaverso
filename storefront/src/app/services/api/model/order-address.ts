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
export interface OrderAddress { 
    /**
     * The address\'s ID.
     */
    id: string;
    /**
     * The ID of the customer the address belongs to.
     */
    customer_id?: string;
    /**
     * The address\'s first name.
     */
    first_name?: string;
    /**
     * The address\'s last name.
     */
    last_name?: string;
    /**
     * The address\'s phone.
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
     * The address\'s metadata, can hold custom key-value pairs.
     */
    metadata?: object;
    /**
     * The date the address was created.
     */
    created_at: string;
    /**
     * The date the address was updated.
     */
    updated_at: string;
}

