
//const cds = require('@sap/cds');
const cds = require('@sap/cds-dk');
const connectivity = require('@sap-cloud-sdk/connectivity');
const httpClient = require('@sap-cloud-sdk/http-client')
const { businessPartnerService } = require('@sap/cloud-sdk-op-vdm-business-partner-service');

//service handlers
module.exports = cds.service.impl(async function () {

 
    const { BusinessPartners, BusinessPartnerAddresses } = this.entities;

    this.on('READ', BusinessPartners, async (req) => {
        try {

           /*const dest = await connectivity.getDestination({destinationName: "BusinessPartner"});
            dest.url = dest.url + "/sap/opu/odata/sap/API_BUSINESS_PARTNER/A_BusinessPartner";
            const responce = await httpClient.executeHttpRequest(dest, {method: "GET"})
            console.log("huri:" + JSON.stringify(responce.data));

            return [responce.data]*/

            //const dest = await connectivity.getDestination({destinationName: "BusinessPartner"});
            const { businessPartnerApi } = businessPartnerService();
            const anotherresult = await businessPartnerApi
            .requestBuilder()
            .getAll().select(
                businessPartnerApi.schema.BUSINESS_PARTNER,
                businessPartnerApi.schema.BUSINESS_PARTNER_FULL_NAME
            ).top(100)
            //.execute({destinationName: "BusinessPartner"});
            .addCustomHeaders({ APIKey: '1GjgWZlnYc3bdTY0QzmKf8BLjFbSP9dp'})
            .execute({
                url: 'https://sandbox.api.sap.com/s4hanacloud'
            });
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
