/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * Author:               Ankith Ravindran
 * Created on:           Wed Apr 26 2023
 * Modified on:          Wed Apr 26 2023 13:16:37
 * SuiteScript Version:  2.1 
 * Description:          Client script for the User Event script for the Barcode record 
 *
 * Copyright (c) 2023 MailPlus Pty. Ltd.
 */

define(['N/currentRecord', 'N/task', 'N/redirect'],
    function (currentRecord, task, redirect) {

    function single_barcode_sync() {
        // Get a reference to the currently active record
        let myRecord = currentRecord.get();

        let barcodeInternalId = myRecord.getValue({
            fieldId: 'custpage_barcode_id'
        });

        var scriptTask = task.create({ taskType: task.TaskType.SCHEDULED_SCRIPT });
        scriptTask.scriptId = 1725;
        scriptTask.deploymentId = 'customdeploy1';
        scriptTask.params = { custscript_barcode_internal_id: barcodeInternalId };
        var scriptTaskId = scriptTask.submit();
    }

    return {
        pageInit: single_barcode_sync
    }
});
