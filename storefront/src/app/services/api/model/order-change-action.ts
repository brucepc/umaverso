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


/**
 * The order change action\'s details.
 */
export interface OrderChangeAction { 
    /**
     * The action\'s ID.
     */
    id: string;
    /**
     * The ID of the order change that the action belongs to.
     */
    order_change_id: string;
    order_change: object;
    /**
     * The ID of the order the associated change is for.
     */
    order_id: string;
    /**
     * The ID of the associated return.
     */
    return_id: string;
    /**
     * The ID of the associated claim.
     */
    claim_id: string;
    /**
     * The ID of the associated exchange.
     */
    exchange_id: string;
    order: Order;
    /**
     * The name of the table this action applies on.
     */
    reference: OrderChangeAction.ReferenceEnum;
    /**
     * The ID of the record in the referenced table.
     */
    reference_id: string;
    /**
     * The applied action.
     */
    action: OrderChangeAction.ActionEnum;
    /**
     * The action\'s details.
     */
    details: object;
    /**
     * A note that\'s viewed only by admin users.
     */
    internal_note: string;
    /**
     * The date the action was created.
     */
    created_at: string;
    /**
     * The date the action was updated.
     */
    updated_at: string;
}
export namespace OrderChangeAction {
    export type ReferenceEnum = 'claim' | 'exchange' | 'return' | 'order_shipping_method';
    export const ReferenceEnum = {
        Claim: 'claim' as ReferenceEnum,
        Exchange: 'exchange' as ReferenceEnum,
        Return: 'return' as ReferenceEnum,
        OrderShippingMethod: 'order_shipping_method' as ReferenceEnum
    };
    export type ActionEnum = 'CANCEL_RETURN_ITEM' | 'FULFILL_ITEM' | 'DELIVER_ITEM' | 'CANCEL_ITEM_FULFILLMENT' | 'ITEM_ADD' | 'ITEM_REMOVE' | 'ITEM_UPDATE' | 'RECEIVE_DAMAGED_RETURN_ITEM' | 'RECEIVE_RETURN_ITEM' | 'RETURN_ITEM' | 'SHIPPING_ADD' | 'SHIPPING_REMOVE' | 'SHIP_ITEM' | 'WRITE_OFF_ITEM' | 'REINSTATE_ITEM';
    export const ActionEnum = {
        CancelReturnItem: 'CANCEL_RETURN_ITEM' as ActionEnum,
        FulfillItem: 'FULFILL_ITEM' as ActionEnum,
        DeliverItem: 'DELIVER_ITEM' as ActionEnum,
        CancelItemFulfillment: 'CANCEL_ITEM_FULFILLMENT' as ActionEnum,
        ItemAdd: 'ITEM_ADD' as ActionEnum,
        ItemRemove: 'ITEM_REMOVE' as ActionEnum,
        ItemUpdate: 'ITEM_UPDATE' as ActionEnum,
        ReceiveDamagedReturnItem: 'RECEIVE_DAMAGED_RETURN_ITEM' as ActionEnum,
        ReceiveReturnItem: 'RECEIVE_RETURN_ITEM' as ActionEnum,
        ReturnItem: 'RETURN_ITEM' as ActionEnum,
        ShippingAdd: 'SHIPPING_ADD' as ActionEnum,
        ShippingRemove: 'SHIPPING_REMOVE' as ActionEnum,
        ShipItem: 'SHIP_ITEM' as ActionEnum,
        WriteOffItem: 'WRITE_OFF_ITEM' as ActionEnum,
        ReinstateItem: 'REINSTATE_ITEM' as ActionEnum
    };
}


