using OP_API_BUSINESS_PARTNER_SRV as externalBuPa from './external/OP_API_BUSINESS_PARTNER_SRV.csn';

service S4Service {
    @cds.persistence.skip
    entity BusinessPartners         as
        select from externalBuPa.A_BusinessPartner {
            key BusinessPartner          as businessPartnerId,
                BusinessPartnerIsBlocked as businessPartnerIsBlocked,
                FirstName                as businessPartnerFirstName,
                LastName                 as businessPartnerLastName
        };

    @cds.persistence.skip
    entity BusinessPartnerAddresses as projection on externalBuPa.A_BusinessPartnerAddress {
        key BusinessPartner as businessPartnerId, AddressID as addressId, Country as country, CityName as cityName, StreetName as streetName, PostalCode as postalCode, HouseNumber as houseNumber
    };
}