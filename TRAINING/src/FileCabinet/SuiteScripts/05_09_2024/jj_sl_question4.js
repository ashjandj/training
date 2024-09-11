/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/record'],
    /**
 * @param{record} record
 */
    (record) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {
            if (scriptContext.request.method === 'GET') {
                let form = formCreaterForPatientForm(scriptContext);
                scriptContext.response.writePage(form);
            }
            

        }
       function formCreaterForPatientForm(scriptContext)
       {
        try{
            let form = serverWidget.createForm({
                title: 'Customer Information Form'
            });
    
            let name = form.addField({
                id: 'custpage_jjq4_name',
                type: serverWidget.FieldType.TEXT,
                label: 'Name'
            });
    
            let age = form.addField({
                id: 'custpage_jjq4_age',
                type: serverWidget.FieldType.INTEGER,
                label: 'Age'
            });
    
            let address = form.addField({
                id: 'custpage_jjq4_address',
                type: serverWidget.FieldType.LONGTEXT,
                label: 'Address'
            });
    
            let sex = form.addField({
                id: 'custpage_sex',
                type: serverWidget.FieldType.SELECT,
                label: 'Sex'
            });
    
            sex.addSelectOption({
                value: 1,
                text: "Female"
            });
            sex.addSelectOption({
                value: 2,
                text: "Male"
            });
            sex.addSelectOption({
                value: 3,
                text: "Others"
            });
            form.addSubmitButton({
                label: 'Submit Button'
            });
            return form;
        }
        catch(err)
        {
            log.error(err);
        }
       }

        return {onRequest}

    });
