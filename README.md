# SAP Private Link Overiew

With SAP Private Link service, Cloud Foundry CAP applications running on SAP BTP with Microsoft Azure as IaaS provider can communicate with Azure Private Link services via a private connection. This ensures that traffic is not routed through the public internet but stays within the Azure infrastructure.

One possible use case is to use the SAP Private Link service to communicate with an SAP S/4HANA system or other SAP or non-SAP system running on a VM in your own Azure account privately from within SAP BTP Cloud Foundry without SAP Cloud Connector.

![Architecture overview](https://github.com/hterminasyan/privatelink-cap-s4/blob/main/sap_private_link_connection_to_lb.png)


## CAP Example to consume oData Service from SAP S/4HANA via Private Link connection

 - Consume external service via PrivateLink.
 - Bind PrivateLink, Destination Service and XSUAA to CAP application
 - Create Destination "BusinessPartner" use ProxyType: Internet and provide Private IP address defined in PrivateLink Service Instance.
  
## Destination config
Property | Value |
--- | --- |
Name | BusinessPartner |
Tyoe | HTTP |
URL | https\://10.220.0.4\:44300 (replace with your Private link Private IP) |
Proxy Type | Internet |
Authentication | BasicAuthentication |
User | <<  username >> |
Password | <<  password >> |

### Additional Properties
Property | Value |
--- | --- |
sap-client | 400 |
TrustAll | true |
HTML5.DynamicDestination | true |
WebIDEEnabled | true |
WebIDEUsage | odata_abap |

> Note, **TrustAll** needed with https and if no code based approach to override verifier.

## Build MTA

```
mbt build 
```


## Deploy to CF and test

```
cf deploy mta_archives/privatelink-s4-test_1.0.0.mtar
```

## Further Reading

  - [SAP Private Link Service (BETA) is Available](https://blogs.sap.com/2021/06/28/sap-private-link-service-beta-is-available/)
  - [Connect SAP Private Link Service to Microsoft Azure Private Link](https://developers.sap.com/tutorials/private-link-microsoft-azure.html)
  - [Whatever happens in an Azure and BTP private linky swear, stays in the linky swear](https://blogs.sap.com/2021/07/02/whatever-happens-in-an-azure-and-btp-private-linky-swear-stays-in-the-linky-swear/)
  - [SAP Private Link Service (BETA)](https://help.sap.com/viewer/product/PRIVATE_LINK/CLOUD/en-US)


