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
 * The details of the product export.
 */
export interface AdminExportProductResponse { 
    /**
     * The ID of the workflow execution\'s transaction. Use it to check the status of the export by sending a GET request to `/admin/workflows-executions/export-products/:transaction-id`
     */
    transaction_id: string;
}

