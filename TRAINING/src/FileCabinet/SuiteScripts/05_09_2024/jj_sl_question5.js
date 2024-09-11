/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/record', 'N/search', 'N/ui/serverWidget'],
    /**
 * @param{record} record
 * @param{search} search
 * @param{serverWidget} serverWidget
 */
    (record, search, serverWidget) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {
            if (scriptContext.request.method === 'GET') {
                let form = createForm(scriptContext);
                scriptContext.response.writePage(form);
            }
        }
        function createForm(scriptContext)
        {
            try{
                let form = serverWidget.createForm({
                    title: 'Sales Order Form'
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
                let customer = form.addField({
                    id: 'custpage_customer',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Customer'
                });
                let mySalesOrderSearchForSalesRep = search.create({
                    type: search.Type.CUSTOMER,
                    title: 'My customer list',
                    id: 'customsearch_jjq5_employee_list',
                    columns: [{
                        name: 'companyname'
                    },
                    {
                        name: "internalid"
                        
                    }],
                });
    
                mySalesOrderSearchForSalesRep.run().each(function (result) {
                    let id = result.getValue({
                        name: 'internalid'
                    });
                    let name = result.getValue({
                        name: 'companyname'
                    });
                    customer.addSelectOption({
                        value: id,
                        text: name
                    });
                    return true;
                });
                var sublist = form.addSublist({
                    id : 'custpage_jj_sublist',
                    type : serverWidget.SublistType.INLINEEDITOR,
                    label : 'Inline Editor Sublist'
                });
                sublist.addField({
                    id: 'custpage_jj_document_number',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Document Number'
                });
                sublist.addField({
                    id: 'custpage_jj_customer',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Customer Name'
                });
                sublist.addField({
                    id: 'custpage_jj_subsidiary',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Subsidiary'
                });
                sublist.addField({
                    id: 'custpage_jj_order_date',
                    type: serverWidget.FieldType.DATE,
                    label: 'Oredr Date'
                });
                
                form.clientScriptModulePath = "SuiteScripts/05_09_2024/jj_cs_question5.js"
                return form;

            }catch(err)
            {
                log.error(err)
            }
        }

        return {onRequest}

    });
