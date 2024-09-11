/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/record', 'N/ui/serverWidget', 'N/search'],
    /**
 * @param{record} record
 * @param{serverWidget} serverWidget
 */
    (record, serverWidget, search) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {
            if (scriptContext.request.method === 'GET') {
                let form = createForm();
                scriptContext.response.writePage(form);
            }
            else if (scriptContext.request.method === 'POST') {
                let name = scriptContext.request.parameters.custpage_jjq2_name;
                let email = scriptContext.request.parameters.custpage_jjq2_email;
                let phone_number = scriptContext.request.parameters.custpage_jjq2_phone;
                let fathername = scriptContext.request.parameters.custpage_jjq2_fathername;
                let subsidiary = scriptContext.request.parameters.custpage_subsidiary;
                let salesrep = scriptContext.request.parameters.custpage_jjq2_salesrep;
                var newRecord = record.create({
                    type: record.Type.CUSTOMER,  // Creating a customer record
                    isDynamic: true   
                    
                               // Using dynamic mode
                });
                
                // Set the fields after creation
                newRecord.setValue({
                    fieldId: 'companyname',
                    value: name
                });
                newRecord.setValue({
                    fieldId: 'email',
                    value: email
                });
                
                newRecord.setValue({
                    fieldId: 'phone',
                    value: phone_number
                });
                
                newRecord.setValue({
                    fieldId: 'subsidiary',
                    value: subsidiary   // Make sure this is a valid subsidiary ID
                });
                
                newRecord.setValue({
                    fieldId: 'salesrep',
                    value: salesrep     // Make sure this is a valid sales rep ID
                });
                
                // Save the record
                let idOfRecord = newRecord.save({
                    enableSourcing: true,
                    ignoreMandatoryFields: true
                });
                let html = `
                <html>
                <head>
                <title>
                Form Values 
                </title>
                </head>
                <body>
                <h3>Record has been created with id : ${idOfRecord}
                </h3>`
                scriptContext.response.write(html)
            }
        }

        function createForm() {
            let form = serverWidget.createForm({
                title: 'Customer Information Form'
            });

            let name = form.addField({
                id: 'custpage_jjq2_name',
                type: serverWidget.FieldType.TEXT,
                label: 'Name'
            });

            let email = form.addField({
                id: 'custpage_jjq2_email',
                type: serverWidget.FieldType.EMAIL,
                label: 'Email'
            });

            let phone_number = form.addField({
                id: 'custpage_jjq2_phone',
                type: serverWidget.FieldType.PHONE,
                label: 'Phone Number'
            });

            

            let father_name = form.addField({
                id: 'custpage_jjq2_fathername',
                type: serverWidget.FieldType.TEXT,
                label: "Father's Name"
            });
            let subsidiary = form.addField({
                id: 'custpage_subsidiary',
                type: serverWidget.FieldType.SELECT,
                label: 'Subsidiary'
            });

            let mySalesOrderSearch = search.create({
                type: search.Type.SUBSIDIARY,
                title: 'My subsidiary list',
                id: 'customsearch_jjq2_sublist',
                columns: [{
                    name: 'name'
                },{
                    name: "internalid"
                    
                }]
            });

            mySalesOrderSearch.run().each(function (result) {
                let id = result.getValue({
                    name: 'internalid'
                });
                let name = result.getValue({
                    name: 'name'
                });
                subsidiary.addSelectOption({
                    value: id,
                    text: name
                });
                return true;
            });

            let salesRep = form.addField({
                id: 'custpage_jjq2_salesrep',
                type: serverWidget.FieldType.SELECT,
                label: 'Sales Rep'
            });

            let mySalesOrderSearchForSalesRep = search.create({
                type: search.Type.EMPLOYEE,
                title: 'My employee list',
                id: 'customsearch_jjq2_employee_list',
                columns: [{
                    name: 'entityid'
                },
                {
                    name: "internalid"
                    
                }],
                filters: [["salesrep", "is", "T"]]
            });

            mySalesOrderSearchForSalesRep.run().each(function (result) {
                let id = result.getValue({
                    name: 'internalid'
                });
                let name = result.getValue({
                    name: 'entityid'
                });
                salesRep.addSelectOption({
                    value: id,
                    text: name
                });
                return true;
            });
            form.addSubmitButton({
                label: 'Submit Button'
            });
            

            return form;
        }

        return { onRequest }
    });
