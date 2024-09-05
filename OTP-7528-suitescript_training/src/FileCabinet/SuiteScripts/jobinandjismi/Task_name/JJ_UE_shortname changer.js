/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record', 'N/search'],
    /**
 * @param{record} record
 * @param{search} search
 */
    (record, search) => {
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
            try{
            var mySalesOrderSearch = search.create({
                type: search.Type.CUSTOMER,
                title: 'My customer',
                id: 'customsearch_my_customer',
                columns: [{
                    name: 'internalid'
                }]
                
            });

            mySalesOrderSearch.run().each(function(result) {
                let ids = result.getValue({ name: 'internalid' });

                let objRecord = record.load({
                    type: record.Type.CUSTOMER,
                    id: ids 
                });
                if (result === null || result === undefined) {
                    log.debug('The object is null or undefined.');
                }
                let name = objRecord.getValue("companyname");
                let dateValue = objRecord.getValue("datecreated");
                let date = new Date(dateValue);
                let month = date.getMonth() + 1;
                let shortName = `${name.slice(0,2)} : ${month}`
                log.debug(shortName);
                var id = record.submitFields({
                    type: record.Type.CUSTOMER,
                    id: ids,
                    values: {
                        custentity_jj_short_name: shortName
                    },
                    options: {
                        enableSourcing: false,
                        ignoreMandatoryFields : true
                    }
                });

                return true;
            });
        }
        catch(err)
        {
            log.debug(err)
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

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
