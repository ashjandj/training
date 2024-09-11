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
                let form = salesOrderForm(scriptContext);
                scriptContext.response.writePage(form);
            }
            

        }
        function salesOrderForm(scriptContext)
        {
            var form = serverWidget.createForm({
                title : 'Simple Form'
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
            let i=0;
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
            }]
            });

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
                var bosy =`${tranid} ${name} ${subsidiary} ${createdDate}`
                log.debug(bosy);
                
                try{
                    sublist.setSublistValue({
                        id: 'custpage_jj_document_number',
                        line: i,
                        value: tranid
                    });
                    sublist.setSublistValue({
                        id: 'custpage_jj_customer',
                        line: i,
                        value: name
                    });
                    sublist.setSublistValue({
                        id: 'custpage_jj_subsidiary',
                        line: i,
                        value: subsidiary
                    });
                    sublist.setSublistValue({
                        id: 'custpage_jj_order_date',
                        line: i,
                        value: createdDate
                    });
                }
                catch(err)
                {
                    sublist.setSublistValue({
                        id: 'custpage_jj_document_number',
                        line: i,
                        value: tranid
                    });
                    // sublist.setSublistValue({
                    //     id: 'custpage_jj_customer',
                    //     line: i,
                    //     value: name
                    // });
                    sublist.setSublistValue({
                        id: 'custpage_jj_subsidiary',
                        line: i,
                        value: subsidiary
                    });
                    sublist.setSublistValue({
                        id: 'custpage_jj_order_date',
                        line: i,
                        value: createdDate
                    });
                }
                i++;
                return true;
            });
            return form;
        }

        return {onRequest}

    });
