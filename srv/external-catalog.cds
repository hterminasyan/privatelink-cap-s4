using OP_API_BUSINESS_PARTNER_SRV as externalBuPa from './external/OP_API_BUSINESS_PARTNER_SRV.csn';

service S4Service {
    @cds.persistence.skip
    entity BusinessPartners         as
        select from externalBuPa.A_BusinessPartner {
            key BusinessPartner          as businessPartner,
                BusinessPartnerFullName  as businessPartnerFullName,
                BusinessPartnerIsBlocked as businessPartnerIsBlocked
        };

    @cds.persistence.skip
    entity BusinessPartnerAddresses as projection on externalBuPa.A_BusinessPartnerAddress {
        key BusinessPartner as BusinessPartner,
            AddressID       as AddressID,
            Country         as Country,
            CityName        as CityName,
            StreetName      as StreetName,
            PostalCode      as PostalCode,
            HouseNumber     as HouseNumber
    };
}
