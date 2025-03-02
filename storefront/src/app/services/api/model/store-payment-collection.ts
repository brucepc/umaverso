/**
 * Medusa Storefront API
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { StorePaymentSession } from './store-payment-session';
import { StorePaymentProvider } from './store-payment-provider';
import { BasePayment } from './base-payment';


/**
 * The payment collection\'s details.
 */
export interface StorePaymentCollection { 
    /**
     * The payment collection\'s ID.
     */
    id: string;
    /**
     * The payment collection\'s currency code.
     */
    currency_code: string;
    /**
     * The total amount to be paid.
     */
    amount: number;
    /**
     * The total authorized amount of the collection\'s payments.
     */
    authorized_amount?: number;
    /**
     * The total captured amount of the collection\'s payments.
     */
    captured_amount?: number;
    /**
     * The total refunded amount of the collection\'s payments.
     */
    refunded_amount?: number;
    /**
     * The date the payment collection was completed.
     */
    completed_at?: string;
    /**
     * The date the payment collection was created.
     */
    created_at?: string;
    /**
     * The date the payment collection was updated.
     */
    updated_at?: string;
    /**
     * The payment collection\'s metadata, can hold custom key-value pairs.
     */
    metadata?: object;
    /**
     * The payment collection\'s status.
     */
    status: StorePaymentCollection.StatusEnum;
    /**
     * The payment provider used to process the collection\'s payments and sessions.
     */
    payment_providers: Array<StorePaymentProvider>;
    /**
     * The payment collection\'s payment sessions.
     */
    payment_sessions?: Array<StorePaymentSession>;
    /**
     * The payment collection\'s payments.
     */
    payments?: Array<BasePayment>;
}
export namespace StorePaymentCollection {
    export type StatusEnum = 'canceled' | 'not_paid' | 'awaiting' | 'authorized' | 'partially_authorized';
    export const StatusEnum = {
        Canceled: 'canceled' as StatusEnum,
        NotPaid: 'not_paid' as StatusEnum,
        Awaiting: 'awaiting' as StatusEnum,
        Authorized: 'authorized' as StatusEnum,
        PartiallyAuthorized: 'partially_authorized' as StatusEnum
    };
}


