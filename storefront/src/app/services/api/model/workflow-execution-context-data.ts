/**
 * Medusa Storefront API
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { WorkflowExecutionContextDataInvokeValue } from './workflow-execution-context-data-invoke-value';


/**
 * The context\'s data.
 */
export interface WorkflowExecutionContextData { 
    /**
     * The step\'s invokation details.
     */
    invoke: { [key: string]: WorkflowExecutionContextDataInvokeValue; };
    /**
     * the payload of the transaction.
     */
    payload?: any | null;
}

