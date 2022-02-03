
//const cds = require('@sap/cds');
const cds = require('@sap/cds-dk')

//service handlers
module.exports = cds.service.impl(async function () {


    const { BusinessPartners, BusinessPartnerAddresses } = this.entities;

    this.on('READ', BusinessPartners, async (req) => {
        try {
            const bupaSrv = await cds.connect.to('OP_API_BUSINESS_PARTNER_SRV');
            return await bupaSrv.tx(req).run(req.query)
        } catch (err) {
            req.reject(err);
        }
    });


    this.on('READ', BusinessPartnerAddresses, async (req) => {
        try {
            const bupaSrv = await cds.connect.to('OP_API_BUSINESS_PARTNER_SRV');
            return await bupaSrv.tx(req).run(req.query)
        } catch (err) {
            req.reject(err);
        }
    });

})
