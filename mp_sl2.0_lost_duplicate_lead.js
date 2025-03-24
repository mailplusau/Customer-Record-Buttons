/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @Author: Ankith Ravindran <ankithravindran>
 * @Last modified by:   ankithravindran
 * @Last modified time: 2022-03-18T14:46:10+11:00
 */


define(['N/runtime', 'N/http', 'N/https', 'N/log', 'N/url', 'N/email',
    'N/record', 'N/format', 'N/file', 'N/search', 'N/redirect'
], function (runtime, http, https, log,
    url, email, record, format, file, search, redirect) {
    function onRequest(context) {

        var role = runtime.getCurrentUser().role;
        var userId = runtime.getCurrentUser().id;

        var custmerInternalID = context.request.parameters.customerInternalId;

        var customerRecord = record.load({
            type: record.Type.CUSTOMER,
            id: custmerInternalID
        });

        customerRecord.setValue({
            fieldId: "entitystatus",
            value: 59,
        });
        customerRecord.setValue({
            fieldId: "custentity_service_cancellation_reason",
            value: 37,
        });
        customerRecord.setValue({
            fieldId: "custentity_service_cancelled_by",
            value: userId,
        });
        customerRecord.setValue({
            fieldId: "custentity13",
            value: getDateStoreNS(),
        });
        customerRecord.setValue({
            fieldId: "custentity_service_cancelled_on",
            value: getDateStoreNS(),
        });
        customerInternalId = customerRecord.save({
            ignoreMandatoryFields: true
        });

        redirect.toRecord({
            type: record.Type.CUSTOMER,
            id: custmerInternalID
        });

    }

    function isNullorEmpty(strVal) {
        return (strVal == null || strVal == '' || strVal == 'null' || strVal ==
            undefined || strVal == 'undefined' || strVal == '- None -' ||
            strVal ==
            '0');
    }

    function getDateStoreNS() {
        var date = new Date();
        if (date.getHours() > 6) {
            date.setDate(date.getDate() + 1);
        }

        format.format({
            value: date,
            type: format.Type.DATE,
            timezone: format.Timezone.AUSTRALIA_SYDNEY,
        });

        return date;
    }


    /**
     * retrieve date
     */
    function getDate() {
        var date = new Date();
        if (date.getHours() > 6) {
            date.setDate(date.getDate() + 1);
        }

        format.format({
            value: date,
            type: format.Type.DATE,
            timezone: format.Timezone.AUSTRALIA_SYDNEY
        })

        return date;
    }

    function _saveNewContact(customerId, firstName, lastName, email, phone) {

        var contactRecord = record.create({
            type: record.Type.CONTACT,
        });

        contactRecord.setValue({ fieldId: 'company', value: customerId });
        contactRecord.setValue({ fieldId: 'entityid', value: firstName + ' ' + lastName });
        contactRecord.setValue({ fieldId: 'firstname', value: firstName });
        contactRecord.setValue({ fieldId: 'lastname', value: lastName });
        contactRecord.setValue({ fieldId: 'email', value: email });
        contactRecord.setValue({ fieldId: 'phone', value: phone });
        contactRecord.setValue({ fieldId: 'contactrole', value: 8 });

        var contactId = contactRecord.save({ ignoreMandatoryFields: true });

        return contactId;
    }

    Date.prototype.addHours = function (h) {
        this.setHours(this.getHours() + h);
        return this;
    }

    return {
        onRequest: onRequest
    };
});

