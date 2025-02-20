/**
 * Medusa Storefront API
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { AdminCustomerInGroupFiltersEmailOneOfEq } from './admin-customer-in-group-filters-email-one-of-eq';
import { AdminCustomerInGroupFiltersEmailOneOfNot } from './admin-customer-in-group-filters-email-one-of-not';


/**
 * Apply filters on the customer\'s email.
 */
export interface AdminCustomerInGroupFiltersEmailOneOf { 
    /**
     * Join query parameters with an AND condition. Each object\'s content is the same type as the expected query parameters.
     */
    $and?: Array<object>;
    /**
     * Join query parameters with an OR condition. Each object\'s content is the same type as the expected query parameters.
     */
    $or?: Array<object>;
    $eq?: AdminCustomerInGroupFiltersEmailOneOfEq;
    /**
     * Filter by values not equal to this parameter.
     */
    $ne?: string;
    /**
     * Filter by values in this array.
     */
    $in?: Array<string>;
    /**
     * Filter by values not in this array.
     */
    $nin?: Array<string>;
    $not?: AdminCustomerInGroupFiltersEmailOneOfNot;
    /**
     * Filter by values greater than this parameter. Useful for numbers and dates only.
     */
    $gt?: string;
    /**
     * Filter by values greater than or equal to this parameter. Useful for numbers and dates only.
     */
    $gte?: string;
    /**
     * Filter by values less than this parameter. Useful for numbers and dates only.
     */
    $lt?: string;
    /**
     * Filter by values less than or equal to this parameter. Useful for numbers and dates only.
     */
    $lte?: string;
    /**
     * Apply a `like` filter. Useful for strings only.
     */
    $like?: string;
    /**
     * Apply a regex filter. Useful for strings only.
     */
    $re?: string;
    /**
     * Apply a case-insensitive `like` filter. Useful for strings only.
     */
    $ilike?: string;
    /**
     * Filter to apply on full-text properties.
     */
    $fulltext?: string;
    /**
     * Filter arrays that have overlapping values with this parameter.
     */
    $overlap?: Array<string>;
    /**
     * Filter arrays that contain some of the values of this parameter.
     */
    $contains?: Array<string>;
    /**
     * Filter arrays that contain all values of this parameter.
     */
    $contained?: Array<string>;
    /**
     * Filter by whether a value for this parameter exists (not `null`).
     */
    $exists?: boolean;
}

