define(['N/record', 'N/log'],
    (record, log) => {
        const beforeLoad = (scriptContext) => {
            try {
                let objRecord = record.load({
                    type: record.Type.SALES_ORDER, 
                    id: '16646', 
                    isDynamic: true
                });

 
                let documentNumber = objRecord.getValue({
                    fieldId: 'tranid'
                });

   
                let customerName = objRecord.getText({
                    fieldId: 'entity'
                });

                log.debug({
                    title: 'Document Number',
                    details: documentNumber
                });

                log.debug({
                    title: 'Customer Name',
                    details: customerName
                });

            } catch (e) {
                log.error({
                    title: 'Error Loading Record or Retrieving Values',
                    details: e.message
                });
            }
        }

        return { beforeLoad }
    });
