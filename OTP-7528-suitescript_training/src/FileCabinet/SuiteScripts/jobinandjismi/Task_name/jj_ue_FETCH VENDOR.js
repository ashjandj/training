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
            function createSearchFoRVendor()
            {
                try{
                let myvendorSearch = search.create({
                    
                    type: search.Type.VENDOR,
                    title: 'VENDOR FETCH JJ',
                    id: 'customsearch_jj_vendor_fetch_demo',
                    columns: [{
                        name: 'companyname'
                    }, {
                        name: 'subsidiary'
                    }]
                
                    
                });
                myvendorSearch.run().each(function(result) {
                    var entity = result.getValue({
                        name: 'companyname'
                    });
                    var subsidiary = result.getText({
                        name: 'subsidiary'
                    });
                    log.debug(`Vendor: ${entity} , subsidiary : ${subsidiary}`);
                    return true;
                });
                }
                catch(err)
                {
                    log.debug(err);
                }
            }
            createSearchFoRVendor();
            
        }

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
