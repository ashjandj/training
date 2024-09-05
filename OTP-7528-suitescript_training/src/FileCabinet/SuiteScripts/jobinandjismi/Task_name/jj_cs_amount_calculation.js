/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/record'],
/**
 * @param{record} record
 */
function(record) {
    
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
        if(scriptContext.sublistId == "item")
            {
                try{
                    let activeAmountCalculation = scriptContext.currentRecord.getCurrentSublistValue({
                        sublistId: "item",
                        fieldId: "custcol_jj_amount_calc"
                    });
                    let rate = scriptContext.currentRecord.getCurrentSublistValue({
                        sublistId: "item",
                        fieldId: "rate"
                    });
                    let quantity = scriptContext.currentRecord.getCurrentSublistValue({
                        sublistId: "item",
                        fieldId: "quantity"
                    });
    
                    if(activeAmountCalculation)
                    {
                        
                        let amount = (parseInt(rate) * parseInt(quantity))/2;
                        scriptContext.currentRecord.setCurrentSublistValue({
                            sublistId: "item",
                            fieldId: "amount",
                            value : amount,
                            ignoreFieldChange: true
                        });
    
                    }
                    else
                    {
                        let amount = parseInt(rate) * parseInt(quantity);
                        scriptContext.currentRecord.setCurrentSublistValue({
                            sublistId: "item",
                            fieldId: "amount",
                            value : amount,
                            ignoreFieldChange: true
                        });
                        
                    }
    
                }
                catch(err)
                {
                    log.debug(err)
                }
            }
    
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
        if(scriptContext.sublistId == "item")
        {
            try{
                let activeAmountCalculation = scriptContext.currentRecord.getCurrentSublistValue({
                    sublistId: "item",
                    fieldId: "custcol_jj_amount_calc"
                });
                let rate = scriptContext.currentRecord.getCurrentSublistValue({
                    sublistId: "item",
                    fieldId: "rate"
                });
                let quantity = scriptContext.currentRecord.getCurrentSublistValue({
                    sublistId: "item",
                    fieldId: "quantity"
                });

                if(activeAmountCalculation)
                {
                    
                    let amount = (parseInt(rate) * parseInt(quantity))/2;
                    scriptContext.currentRecord.setCurrentSublistValue({
                        sublistId: "item",
                        fieldId: "amount",
                        value : amount
                    });

                }
                else
                {
                    let amount = parseInt(rate) * parseInt(quantity);
                    scriptContext.currentRecord.setCurrentSublistValue({
                        sublistId: "item",
                        fieldId: "amount",
                        value : amount
                    });
                    
                }

            }
            catch(err)
            {
                log.debug(err)
            }
        }
        return true;
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
         //pageInit: pageInit,
         fieldChanged: fieldChanged,
        // postSourcing: postSourcing,
        // sublistChanged: sublistChanged,
        // lineInit: lineInit,
        // validateField: validateField,
         validateLine: validateLine,
        // validateInsert: validateInsert,
        // validateDelete: validateDelete,
        // saveRecord: saveRecord
    };
    
});
