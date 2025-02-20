/**
 * Medusa Storefront API
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { Order } from './order';
import { OrderTransaction } from './order-transaction';
import { OrderClaim } from './order-claim';
import { OrderReturnItem } from './order-return-item';
import { ReturnRawRefundAmount } from './return-raw-refund-amount';
import { OrderShippingMethod } from './order-shipping-method';


/**
 * The return\'s details.
 */
export interface Return { 
    /**
     * The return\'s ID.
     */
    id: string;
    /**
     * The return\'s status.
     */
    status: Return.StatusEnum;
    /**
     * The amount refunded by this return.
     */
    refund_amount?: number;
    /**
     * The ID of the associated order.
     */
    order_id: string;
    /**
     * The return\'s items.
     */
    items: Array<OrderReturnItem>;
    /**
     * The return\'s shipping methods.
     */
    shipping_methods?: Array<OrderShippingMethod>;
    /**
     * The return\'s transactions.
     */
    transactions?: Array<OrderTransaction>;
    /**
     * The return\'s metadata, can hold custom key-value pairs.
     */
    metadata: object;
    /**
     * The date the return was created.
     */
    created_at?: string;
    /**
     * The date the return was updated.
     */
    updated_at?: string;
    /**
     * The date the return was canceled.
     */
    canceled_at?: string;
    raw_refund_amount?: ReturnRawRefundAmount;
    order?: Order;
    /**
     * The ID of the exchange this return belongs to, if any.
     */
    exchange_id?: string;
    exchange?: object;
    /**
     * The ID of the claim this return belongs to, if any.
     */
    claim_id?: string;
    claim?: OrderClaim;
    /**
     * The return order\'s display ID.
     */
    display_id: number;
    /**
     * The ID of the stock location the items are returned to.
     */
    location_id?: string;
    /**
     * Whether to notify the customer about changes in the return.
     */
    no_notification?: boolean;
    /**
     * The ID of the user that created the return.
     */
    created_by?: string;
    /**
     * The date the return was deleted.
     */
    deleted_at?: string;
    /**
     * The date the return was requested.
     */
    requested_at?: string;
    /**
     * The date the return was received.
     */
    received_at?: string;
}
export namespace Return {
    export type StatusEnum = 'canceled' | 'requested' | 'received' | 'partially_received';
    export const StatusEnum = {
        Canceled: 'canceled' as StatusEnum,
        Requested: 'requested' as StatusEnum,
        Received: 'received' as StatusEnum,
        PartiallyReceived: 'partially_received' as StatusEnum
    };
}


