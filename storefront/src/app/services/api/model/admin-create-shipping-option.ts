/**
 * Medusa Storefront API
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { AdminCreateShippingOptionType } from './admin-create-shipping-option-type';
import { AdminCreateShippingOptionRule } from './admin-create-shipping-option-rule';
import { AdminCreateShippingOptionPricesInner } from './admin-create-shipping-option-prices-inner';


/**
 * The shipping option\'s details.
 */
export interface AdminCreateShippingOption { 
    /**
     * The shipping option\'s name.
     */
    name: string;
    /**
     * The ID of the associated service zone.
     */
    service_zone_id: string;
    /**
     * The ID of the associated shipping profile.
     */
    shipping_profile_id: string;
    /**
     * The shipping option\'s data, useful for the fulfillment provider handling its processing.
     */
    data?: object;
    /**
     * The shipping option\'s price type. If `flat`, the shipping option has a fixed price set in `prices`. Otherwise, the shipping option\'s price is calculated by the fulfillment provider.
     */
    price_type: AdminCreateShippingOption.PriceTypeEnum;
    /**
     * The ID of the fulfillment provider handling this shipping option.
     */
    provider_id: string;
    type: AdminCreateShippingOptionType;
    /**
     * The shipping option\'s prices.
     */
    prices: Array<AdminCreateShippingOptionPricesInner>;
    /**
     * The shipping option\'s rules.
     */
    rules?: Array<AdminCreateShippingOptionRule>;
}
export namespace AdminCreateShippingOption {
    export type PriceTypeEnum = 'flat' | 'calculated';
    export const PriceTypeEnum = {
        Flat: 'flat' as PriceTypeEnum,
        Calculated: 'calculated' as PriceTypeEnum
    };
}


