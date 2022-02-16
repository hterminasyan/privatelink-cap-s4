# SAP Private Link Overiew

With SAP Private Link service, Cloud Foundry CAP applications running on SAP BTP with Microsoft Azure as IaaS provider can communicate with Azure Private Link services via a private connection. This ensures that traffic is not routed through the public internet but stays within the Azure infrastructure.

One possible use case is to use the SAP Private Link service to communicate with an SAP S/4HANA system or other SAP or non-SAP system running on a VM in your own Azure account privately from within SAP BTP Cloud Foundry without SAP Cloud Connector.

![Architecture overview](https://github.com/hterminasyan/privatelink-cap-s4/blob/main/sap_private_link_connection_to_lb.png)


## Prepare Extension Application based on CAP (SAP Cloud Application Programming Model) for PrivateLink communication

There are couple of steps required to enable the Private Link connection in CAP Application. 

### Adapt Destination for PrivateLink Service - Configure the "BusinessPartner" destination

 * Open your SAP BTP Account and navigate to your Subaccount
 * Choose Connectivity in the menu on the left then choose Destinations
 * Modify existing "BusinessPartner" or create new destination and enter the following information to the Destination Configuration:

 Instead of using Proxy Type On-Premise for Cloud Connector connectivity, SAP introduced new Proxy Type  **PrivateLink**. Choose that proxy type and enter Private Link hostname from previous step. 

 Finally add **TrustAll=true** in Additional Properites **(We will change this property in later steps)**.

 > Note: If TrustAll is set to TRUE in the destination, the server certificate will not be checked for SSL connections. It is intended for test scenarios only, and should not be used in production (the server certificate will not be checked and you will not notice MITM attacks). 
  
### Destination config
Property | Value |
--- | --- |
Name | BusinessPartner |
Tyoe | HTTP |
URL | https://40a42b84-39bb-xxx-9729-287xxxxe72c.d0c0e029c004f9xxxx8eda0225a83xxxxxxaae23ff65b.p6.pls.sap.internal (replace with your PrivateLink hostname) |
Proxy Type | PrivateLink |
Authentication | BasicAuthentication |
User | <<  username >> |
Password | <<  password >> |

### Additional Properties
Property | Value |
--- | --- |
sap-client | 400 (or the client you want to connect to) |
TrustAll | true  (should not be used in production) |
HTML5.DynamicDestination | true |
WebIDEEnabled | true |
WebIDEUsage | odata_abap |

>Note: Not all SDK/Libraries are suppoprting the ProxyType: PrivateLink yet. For those cases use proxy type Internet instead.


### Bind application to Private Link service

Open the MTA deployment descriptor and add following PrivateLink resource to your MTA and assign it to *BusinessPartnerVerification-srv*

```json

modules:
  - name: privatelink-s4-test-srv
    type: nodejs
    path: gen/srv
    requires:
      - name: private-link-s4hana
      - ...

...

resources:
  # PrivateLink Service
  - name: private-link-s4hana
    type: org.cloudfoundry.existing-service
    parameters:
      service: privatelink 
      service-name: private-link-s4hana # change to your instance name
      service-plan: standard

```


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


