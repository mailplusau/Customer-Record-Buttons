/**
 *@NApiVersion 2.x
 *@NScriptType UserEventScript
 * Author:               Ankith Ravindran
 * Created on:           Fri Apr 21 2023
 * Modified on:          Fri Apr 21 2023 10:39:21
 * SuiteScript Version:  2.x 
 * Description:          User Event Script deployed on the Customer Product Stock record.
 *                       Buttons:
 *                       Barcode Sync - Ability to sync just a single barcode on click of the button.  
 *
 * Copyright (c) 2023 MailPlus Pty. Ltd.
 */


define(['N/record', 'N/task', 'N/redirect'], function (record, task, redirect) {
    var systemAdmin = [3, 1032];

    function beforeLoad(context) {
        if (context.type == context.UserEventType.VIEW) {
            var customerProductStockRecord = context.newRecord;
            var internalid = customerProductStockRecord.getValue({
                fieldId: 'internalid'
            });

            log.debug({
                title: 'internalid',
                details: internalid
            })

            var customerProductStockInternalId = context.request.parameters.id;
            
            // context.form.addButton({
            //     id: 'custpage_barcode_sync',
            //     label: 'Barcode Sync',
            //     functionName: getButtonScript('single_barcode_sync', customerProductStockInternalId, task)
            //     // functionName: 'single_barcode_sync'
            // });
        }
    }

    function getButtonScript(type, customerProductStockInternalId, task) {
        log.debug({
            title: 'On click of sync barcode button',
            details: customerProductStockInternalId
        })
        if (type == 'single_barcode_sync') {
            var scriptTask = task.create({ taskType: task.TaskType.SCHEDULED_SCRIPT });
            scriptTask.scriptId = 1725;
            scriptTask.deploymentId = 'customdeploy1';
            scriptTask.params = { custscript_barcode_internal_id: customerProductStockInternalId };
            var scriptTaskId = scriptTask.submit();
    
            // redirect.toRecord({
            //     type: 'customrecord_customer_product_stock',
            //     id: customerProductStockInternalId,
            // });
        }
    }

    return {
        beforeLoad: beforeLoad,
        // getButtonScript: getButtonScript
    };
});