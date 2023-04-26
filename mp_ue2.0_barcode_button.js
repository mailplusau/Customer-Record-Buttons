/**
 *@NApiVersion 2.x
 *@NScriptType UserEventScript
 * Author:               Ankith Ravindran
 * Created on:           Fri Apr 21 2023
 * Modified on:          Fri Apr 21 2023 10:39:21
 * SuiteScript Version:   
 * Description:           
 *
 * Copyright (c) 2023 MailPlus Pty. Ltd.
 */


define(['N/record', 'N/task', 'N/redirect'], function (record, task, redirect) {
    var systemAdmin = [3, 1032];

    function beforeLoad(context) {
        if (context.type == context.UserEventType.VIEW) {
            log.debug({
                title: 'context',
                details: context
            });
            // var parsedContext = JSON.parse(context);
            var customerProductStockInternalId = context.request.parameters.id;
            log.debug({
                title: 'customerProductStockInternalId',
                details: customerProductStockInternalId
            })
            context.form.addButton({
                id: 'custpage_barcode_sync',
                label: 'Barcode Sync',
                functionName: getButtonScript('single_barcode_sync', customerProductStockInternalId)
            });
        }
    }

    function getButtonScript(type, customerProductStockInternalId) {
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
        getButtonScript: getButtonScript
    };
});