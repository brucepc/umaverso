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
 * The details of the deleted claim.
 */
export interface AdminClaimDeleteResponse { 
    /**
     * The claim\'s ID.
     */
    id: string;
    /**
     * The name of the deleted object.
     */
    object: string;
    /**
     * Whether the claim was deleted.
     */
    deleted: boolean;
}

