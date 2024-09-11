/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/search','N/url' ],
/**
 * @param{record} record
 * @param{search} search
 */
function(record, search, url) {
    
    /**
     * Function to be executed after page is initialized.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
     *
     * @since 2015.2
     */
    function pageInit(scriptContext) {
        
        alert("HI");
    }

    /**
     * Function to be executed when field is changed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
     * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
     *
     * @since 2015.2
     */
    function fieldChanged(scriptContext) {
        let subsidiary =  scriptContext.currentRecord.getValue({
            fieldId: "custpage_subsidiary"
        });
  
        let customer =  scriptContext.currentRecord.getValue({
            fieldId: "custpage_subsidiary"
        });
        let mySalesOrderSearch = search.create({
            type: search.Type.SALES_ORDER,
            title: 'My sales list',
            id: 'customsearch_jjq3_sublist',
            columns: [{
                name: 'tranid'
            },
        {
            name : "entity"
        },
        {
            name : "subsidiary"
        },
        {
            name : "trandate"
        }],filters:[{
            name: 'mainline',
            operator: 'is',
            values: ['T']
        },{
            name: 'status',
            operator: 'anyof',
            values: ['SalesOrd:H','SalesOrd:G','SalesOrd:C']
        }]
        });
        let i=0;
        mySalesOrderSearch.run().each(function (result) {
            let tranid = result.getValue({
                name: 'tranid'
            });
            let name = result.getText({
                name: 'entity'
            });
            let subsidiary = result.getText({
                name: 'subsidiary'
            });
            let createdDate = result.getValue({
                name: 'trandate'
            });
         
            let cur = scriptContext.currentRecord;
           
            try{
                log.debug("Writing")
                cur.selectLine({
                    sublistId: 'custpage_jj_sublist',
                    line: i
                });
    
                cur.setCurrentSublistValue({
                    sublistId: 'custpage_jj_sublist',
                    fieldId: 'custpage_jj_document_number',
                    value: 'hello',
                    ignoreFieldChange: true
                });
                cur.setCurrentSublistValue({
                    sublistId: 'custpage_jj_sublist',
                    fieldId: 'custpage_jj_document_number',
                    value: 'hello',
                    ignoreFieldChange: true
                });
    
                cur.commitLine({
                    sublistId: 'custpage_jj_sublist'
                });
                // let cur=scriptContext.currentRecord.setValue({
                //     sublistId: 'custpage_jj_sublist',
                //     fieldId: 'custpage_jj_document_number',
                //     line: i,
                //     value: "hello"
                // });
                
                // scriptContext.currentRecord.setSublistValue({
                //     id: 'custpage_jj_customer',
                //     line: i,
                //     value: name
                // });
                // scriptContext.currentRecord.setSublistValue({
                //     id: 'custpage_jj_subsidiary',
                //     line: i,
                //     value: subsidiary
                // });
                // scriptContext.currentRecord.setSublistValue({
                //     id: 'custpage_jj_order_date',
                //     line: i,
                //     value: createdDate
                // });
            }
            catch(err)
            {
                alert(err)
                // sublist.setSublistValue({
                //     id: 'custpage_jj_document_number',
                //     line: i,
                //     value: tranid
                // });
                // // sublist.setSublistValue({
                // //     id: 'custpage_jj_customer',
                // //     line: i,
                // //     value: name
                // // });
                // sublist.setSublistValue({
                //     id: 'custpage_jj_subsidiary',
                //     line: i,
                //     value: subsidiary
                // });
                // sublist.setSublistValue({
                //     id: 'custpage_jj_order_date',
                //     line: i,
                //     value: createdDate
                // });
            }
            i++;
            return true;
        });

    }

    /**
     * Function to be executed when field is slaved.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     *
     * @since 2015.2
     */
    function postSourcing(scriptContext) {

    }

    /**
     * Function to be executed after sublist is inserted, removed, or edited.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @since 2015.2
     */
    function sublistChanged(scriptContext) {

    }

    /**
     * Function to be executed after line is selected.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @since 2015.2
     */
    function lineInit(scriptContext) {

    }

    /**
     * Validation function to be executed when field is changed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
     * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
     *
     * @returns {boolean} Return true if field is valid
     *
     * @since 2015.2
     */
    function validateField(scriptContext) {

    }

    /**
     * Validation function to be executed when sublist line is committed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @returns {boolean} Return true if sublist line is valid
     *
     * @since 2015.2
     */
    function validateLine(scriptContext) {

    }

    /**
     * Validation function to be executed when sublist line is inserted.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @returns {boolean} Return true if sublist line is valid
     *
     * @since 2015.2
     */
    function validateInsert(scriptContext) {

    }

    /**
     * Validation function to be executed when record is deleted.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @returns {boolean} Return true if sublist line is valid
     *
     * @since 2015.2
     */
    function validateDelete(scriptContext) {

    }

    /**
     * Validation function to be executed when record is saved.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @returns {boolean} Return true if record is valid
     *
     * @since 2015.2
     */
    function saveRecord(scriptContext) {

    }

    return {
        pageInit: pageInit,
        fieldChanged: fieldChanged,
        // postSourcing: postSourcing,
        // sublistChanged: sublistChanged,
        // lineInit: lineInit,
        // validateField: validateField,
        // validateLine: validateLine,
        // validateInsert: validateInsert,
        // validateDelete: validateDelete,
        // saveRecord: saveRecord
    };
    
});
