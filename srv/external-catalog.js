
//const cds = require('@sap/cds');
const cds = require('@sap/cds-dk');
const connectivity = require('@sap-cloud-sdk/connectivity');
const httpClient = require('@sap-cloud-sdk/http-client')
const { businessPartnerService } = require('@sap/cloud-sdk-vdm-business-partner-service');

//service handlers
module.exports = cds.service.impl(async function () {

 
    const { BusinessPartners, BusinessPartnerAddresses } = this.entities;

    this.on('READ', BusinessPartners, async (req) => {
        try {
            //const bupaSrv = await cds.connect.to('OP_API_BUSINESS_PARTNER_SRV');
            //return await bupaSrv.tx(req).run(req.query)
            //const r = await bupaSrv.tx(req).run(req.query)
            const dest = await connectivity.getDestination({destinationName: "BusinessPartner"});
            //dest.url = dest.url + "/sap/opu/odata/sap/API_BUSINESS_PARTNER/A_BusinessPartner";
            //console.log(JSON.stringify(dest));
            //const responce = await httpClient.executeHttpRequest(dest, {method: "GET"})


            const { businessPartnerApi } = businessPartnerService();
            const anotherresult = await businessPartnerApi
            .requestBuilder()
            .getAll()
           /* .select(
                businessPartnerApi.schema.FIRST_NAME,
                businessPartnerApi.schema.LAST_NAME
            )*/
            .execute(dest);


            console.log("huri:" + JSON.stringify(anotherresult));
            return  anotherresult;
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
