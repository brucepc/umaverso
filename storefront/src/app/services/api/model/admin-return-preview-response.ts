/**
 * Medusa Storefront API
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { AdminOrderPreview } from './admin-order-preview';
import { AdminReturn } from './admin-return';


/**
 * The details of a return and a preview of the order once the return is applied.
 */
export interface AdminReturnPreviewResponse { 
    order_preview: AdminOrderPreview;
    'return': AdminReturn;
}

