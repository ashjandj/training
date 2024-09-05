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
                let salesRecord = scriptContext.newRecord;
                let entity = salesRecord.getText({
                    fieldId: "entity"
                })
                let entityID = salesRecord.getValue({
                    fieldId: "entity"
                })

                log.debug(checkOverDue(entity))
                if (checkOverDue(entity)) {
                    log.debug("Found Overdue");
                    let objRecord = record.load({
                        type: record.Type.CUSTOMER,
                        id: entityID,
                        isDynamic: true,
                    });
                    let sales_rep = objRecord.getValue({
                        fieldId: 'salesrep'
                    });
                    let empObjRecord = record.load({
                        type: record.Type.EMPLOYEE,
                        id: sales_rep,
                        isDynamic: true,
                    });

                    let supervisor = empObjRecord.getValue({
                        fieldId: 'supervisor'
                    });
                    log.debug(supervisor);
                    let supObjRecord = record.load({
                        type: record.Type.EMPLOYEE,
                        id: supervisor,
                        isDynamic: true,
                    });

                    let supervisoremail = supObjRecord.getValue({
                        fieldId: 'email'
                    });
                    log.debug(supervisoremail);
                    body_of_mail = `Hi, A sales order has been created by ${entity} who have the sales rep ${sales_rep}`;
                    log.debug({
                        title: "Preparing to send email",
                        details: {
                            author: 1852,
                            recipients: supervisoremail,
                            subject: scriptContext.type,
                            body: body_of_mail
                        }
                    });
                    
                    email.send({
                        author: 1852,
                        recipients: supervisoremail,
                        subject: scriptContext.type,
                        body: body_of_mail
                    });

                }
            } catch (err) {

            }
            function checkOverDue(companyName) {
                let isOverDue = false;
                try {
                    let mySearch = search.load({
                        id: 'customsearch_atlas_ar_aging_rpt'
                    });
                    mySearch.run().each(function (result) {

                        var entityName = result.getText({
                            name: 'entity',
                            summary: 'GROUP'
                        });
                        if (entityName === companyName) {

                            isOverDue = true;
                        }
                        return true;
                    });

                } catch (err) {
                    log.debug("error2", err);
                }
                return isOverDue;
            }


        }

        return { beforeLoad, beforeSubmit, afterSubmit }

    });

