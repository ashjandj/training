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
            function createSearchForSalesRecord()
            {
                try{
                let mySalesOrderSearch = search.create({
                    
                    type: search.Type.CREDIT_MEMO,
                    title: 'JJ CREADIT MEMO demo',
                    id: 'customsearch_jj_my_second_cm_demo',
                    columns: [{
                        name: 'tranid'
                    }, {
                        name: 'trandate'
                    }, {
                        name: 'entity'
                    }, {
                        name: 'total'
                    },{
                        name: 'status'
                    }],
                    filters: [{
                        name: 'entity',
                        operator: 'anyof',
                        values: ['410']
                    },{
                        name: 'mainline',
                        operator: 'is',
                        values: ['T']
                    }
                ],
                    settings: [{
                        name: 'consolidationtype',
                        value: 'AVERAGE'
                    }]
                });

                mySalesOrderSearch.save();}
                catch(err)
                {
                    log.debug(err);
                }
            }
            createSearchForSalesRecord();
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
