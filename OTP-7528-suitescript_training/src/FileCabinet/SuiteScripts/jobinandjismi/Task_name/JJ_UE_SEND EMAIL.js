/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/email', 'N/record'],
    /**
 * @param{email} email
 * @param{record} record
 */
    (email, record) => {
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
                
                let myRecord = scriptContext.newRecord;
                let user_email = myRecord.getValue({
                    fieldId: "email"
                })
                let internId = myRecord.getValue({
                    fieldId: "id"
                })

                let recordTyoe = scriptContext.newRecord.type;
                let companyname;
                if (recordTyoe === "contact") {
                    companyname = myRecord.getValue({
                        fieldId: "entityid"
                    })
                } else {
                    companyname = myRecord.getValue({
                        fieldId: "companyname"
                    })

                }
                if (scriptContext.type === "create") {
                    body_of_mail = `HI Record created,
            Entity type:${recordTyoe} 
            Internal ID: ${internId} 
            company name: ${companyname}
            `;
                    log.debug(body_of_mail);
                    email.send({
                        author: 1852,
                        recipients: user_email,
                        subject: scriptContext.type,
                        body: body_of_mail

                    });
                };
                if (scriptContext.type === "delete") {
                    body_of_mail = `HI Record deletd,
           
            Internal ID: ${internId} 
            Entity type:${recordTyoe}`;
            log.debug(body_of_mail);
                    email.send({
                        author: 1852,
                        recipients: user_email,
                        subject: scriptContext.type,
                        body: body_of_mail

                    });
                };

            } catch (err) {
                log.debug(err);

            }

        }

        return { beforeLoad, beforeSubmit, afterSubmit }

    });
