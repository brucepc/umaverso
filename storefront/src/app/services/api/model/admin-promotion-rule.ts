/**
 * Medusa Storefront API
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { BasePromotionRuleValue } from './base-promotion-rule-value';


/**
 * The promotion rule\'s details.
 */
export interface AdminPromotionRule { 
    /**
     * The promotion rule\'s ID.
     */
    id: string;
    /**
     * The promotion rule\'s description.
     */
    description?: string;
    /**
     * The promotion rule\'s attribute.
     */
    attribute?: string;
    /**
     * The rule\'s operator.
     */
    operator?: AdminPromotionRule.OperatorEnum;
    /**
     * The rule\'s values.
     */
    values: Array<BasePromotionRuleValue>;
}
export namespace AdminPromotionRule {
    export type OperatorEnum = 'gt' | 'lt' | 'eq' | 'ne' | 'in' | 'lte' | 'gte';
    export const OperatorEnum = {
        Gt: 'gt' as OperatorEnum,
        Lt: 'lt' as OperatorEnum,
        Eq: 'eq' as OperatorEnum,
        Ne: 'ne' as OperatorEnum,
        In: 'in' as OperatorEnum,
        Lte: 'lte' as OperatorEnum,
        Gte: 'gte' as OperatorEnum
    };
}


