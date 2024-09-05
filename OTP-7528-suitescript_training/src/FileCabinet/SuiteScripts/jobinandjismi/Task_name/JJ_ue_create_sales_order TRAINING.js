/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record', 'N/log'],
    /**
     * @param{record} record
     * @param{log} log
     */
    (record, log) => {
        /**
         * Defines the function definition that is executed before record is loaded.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @param {Form} scriptContext.form - Current form
         * @param {ServletRequest} scriptContext.request - HTTP request information sent from the browser for a client action only.
         * @since 2015.2
         */
        const beforeLoad = (scriptContext) => {
            try {
                let objRecord = record.create({
                    type: record.Type.SALES_ORDER,
                    isDynamic: true
                });

                objRecord.setValue('entity', '3168');
                objRecord.selectNewLine({
                    sublistId: 'item'
                });

                objRecord.setCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'item',
                    value: '1136'
                });
                objRecord.setCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantity',
                    value: '1'
                });

                objRecord.commitLine({
                    sublistId: 'item'
                });

                let recordId = objRecord.save({
                    enableSourcing: false,
                    ignoreMandatoryFields: false
                });

                log.debug('Sales Order Created', 'Record ID: ' + recordId);
            } catch (e) {
                log.error('Error Creating Sales Order', e.message);
            }
        }

        /**
         * Defines the function definition that is executed before record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const beforeSubmit = (scriptContext) => {

        }

        /**
         * Defines the function definition that is executed after record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const afterSubmit = (scriptContext) => {

        }

        return { beforeLoad, beforeSubmit, afterSubmit }

    });
