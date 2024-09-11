2/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget'],
    /**
 * @param{serverWidget} serverWidget
 */
    (serverWidget) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {
            if (scriptContext.request.method === 'GET')
            {
                let form = serverWidget.createForm({
                    title: 'Registration Form'
                });
                let Name = form.addField({
                    id: 'custpage_jj_name',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Name'
                });
                let Age = form.addField({
                    id: 'custpage_jj_age',
                    type: serverWidget.FieldType.INTEGER,
                    label: 'Age'
                });
                let PhoneNumber = form.addField({
                    id: 'custpage_jj_phone',
                    type: serverWidget.FieldType.PHONE,
                    label: 'Phone Number'
                });
                let email = form.addField({
                    id: 'custpage_jj_email',
                    type: serverWidget.FieldType.EMAIL,
                    label: 'Email'
                });
                let fatherName = form.addField({
                    id: 'custpage_jj_fathername',
                    type: serverWidget.FieldType.TEXT,
                    label: "Father's Name"
                });
                let address = form.addField({
                    id: 'custpage_jj_address',
                    type: serverWidget.FieldType.LONGTEXT,
                    label: 'Address'
                });
                form.addSubmitButton({
                    label: 'Submit Button'
                });
                scriptContext.response.writePage(form);

            }else{
                scriptContext.response.write(scriptContext.response)
            }
        }

        return {onRequest}

    });
