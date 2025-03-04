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
 * The invite\'s details.
 */
export interface AdminInvite { 
    /**
     * The invite\'s ID.
     */
    id: string;
    /**
     * The invite\'s email.
     */
    email: string;
    /**
     * Whether the invite has been accepted.
     */
    accepted: boolean;
    /**
     * The invite\'s token.
     */
    token: string;
    /**
     * The invite\'s expiry date.
     */
    expires_at: string;
    /**
     * The invite\'s metadata, can hold custom key-value pairs.
     */
    metadata?: object;
    /**
     * The date the invite was created.
     */
    created_at: string;
    /**
     * The date the invite was updated.
     */
    updated_at: string;
}

