/**
 * Medusa Storefront API
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { CampaignResponseBudget } from './campaign-response-budget';


/**
 * The campaign\'s details.
 */
export interface CampaignResponse { 
    /**
     * The campaign\'s ID.
     */
    id: string;
    /**
     * The campaign\'s name.
     */
    name: string;
    /**
     * The campaign\'s description.
     */
    description: string;
    /**
     * The campaign\'s currency.
     */
    currency: string;
    /**
     * The campaign\'s campaign identifier.
     */
    campaign_identifier: string;
    /**
     * The campaign\'s starts at.
     */
    starts_at: string;
    /**
     * The campaign\'s ends at.
     */
    ends_at: string;
    budget: CampaignResponseBudget;
}

