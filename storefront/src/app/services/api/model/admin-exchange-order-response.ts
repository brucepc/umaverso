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
import { AdminExchange } from './admin-exchange';


/**
 * The exchange\'s details.
 */
export interface AdminExchangeOrderResponse { 
    order: Order;
    exchange: AdminExchange;
}

