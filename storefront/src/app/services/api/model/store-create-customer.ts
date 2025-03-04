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
 * The details of the customer to create.
 */
export interface StoreCreateCustomer { 
    /**
     * The customer\'s email.
     */
    email: string;
    /**
     * The customer\'s company name.
     */
    company_name?: string;
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
     * The customer\'s metadata, can hold custom key-value pairs.
     */
    metadata?: object;
}

