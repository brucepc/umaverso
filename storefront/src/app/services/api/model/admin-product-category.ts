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
 * The product category\'s details.
 */
export interface AdminProductCategory { 
    /**
     * The category\'s children.
     */
    category_children: Array<object>;
    parent_category: object;
    /**
     * The category\'s products.
     */
    products?: Array<object>;
    /**
     * The category\'s name.
     */
    name: string;
    /**
     * The category\'s description.
     */
    description: string;
    /**
     * The category\'s ID.
     */
    id: string;
    /**
     * The category\'s metadata, can hold custom key-value pairs.
     */
    metadata?: object;
    /**
     * The date the category was created.
     */
    created_at: string;
    /**
     * The date the category was updated.
     */
    updated_at: string;
    /**
     * The category\'s unique handle.
     */
    handle: string;
    /**
     * The date the category was deleted.
     */
    deleted_at: string;
    /**
     * Whether the category is active. If disabled, the category isn\'t shown in the storefront.
     */
    is_active: boolean;
    /**
     * Whether the category is internal. If enabled, the category is only seen by admin users.
     */
    is_internal: boolean;
    /**
     * The category\'s rank among sibling categories.
     */
    rank: number;
    /**
     * The ID of the category\'s parent.
     */
    parent_category_id: string;
}

