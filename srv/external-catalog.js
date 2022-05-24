
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

            const { businessPartnerApi } = businessPartnerService();
            const result = await businessPartnerApi
                .requestBuilder()
                .getAll().select(
                    businessPartnerApi.schema.BUSINESS_PARTNER,
                    businessPartnerApi.schema.BUSINESS_PARTNER_FULL_NAME,
                    businessPartnerApi.schema.BUSINESS_PARTNER_IS_BLOCKED
                ).top(100)
                .execute({ destinationName: "BusinessPartner" });

            return result;

        } catch (err) {
            req.reject(err);
        }
    });


    this.on('READ', BusinessPartnerAddresses, async (req) => {
        try {

            const dest = await connectivity.getDestination({ destinationName: "BusinessPartner" });
            dest.url = dest.url + "/sap/opu/odata/sap/API_BUSINESS_PARTNER/A_BusinessPartnerAddress";
            const responce = await httpClient.executeHttpRequest(dest, { method: "GET" })

            return responce.data.d.results

        } catch (err) {
            req.reject(err);
        }
    });

})
