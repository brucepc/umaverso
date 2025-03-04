/**
 * Medusa Storefront API
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { WorkflowExecutionContextData } from './workflow-execution-context-data';
import { WorkflowExecutionContextErrorsInner } from './workflow-execution-context-errors-inner';


/**
 * The workflow execution\'s context.
 */
export interface WorkflowExecutionContext { 
    data?: WorkflowExecutionContextData;
    /**
     * The context\'s compensate.
     */
    compensate: object;
    /**
     * The context\'s errors.
     */
    errors: Array<WorkflowExecutionContextErrorsInner>;
}

