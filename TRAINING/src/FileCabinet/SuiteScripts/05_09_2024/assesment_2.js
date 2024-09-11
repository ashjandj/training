/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/email', 'N/record', 'N/search'],
    /**
 * @param{email} email
 * @param{record} record
 * @param{search} search
 */
    (email, record, search) => {
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
            try {
                if (scriptContext.type == "create") {
                    let openSalesOrder = scriptContext.newRecord.getValue({
                        fieldId: "custbody1"
                    })
                    if (openSalesOrder > 5) {
                        let entity = scriptContext.newRecord.getValue({
                            fieldId: "entity"
                        })
                        sendMailToSalesRep(scriptContext, entity)
                    }
                }
            } catch (err) {
                log.debug(err)
            }
        }
        function sendMailToSalesRep(scriptContextForFunction, entity) {
            let fieldLookUp = search.lookupFields({
                type: search.Type.CUSTOMER,
                id: entity,
                columns: ["salesrep"]
            });

            let salesRepId = fieldLookUp.salesrep[0].value;
            email.send({
                author: 2053,
                recipients: salesRepId,
                subject: 'Customer Create a sales order',
                body: `Hi , One of your customer with ID ${entity} has created a sales order. The customer have more than 5 sales order`,

            });
            return true;

        }
        return { beforeLoad, beforeSubmit, afterSubmit }

    });
