# Getting Started

SAP Private Link service establishes a private connection between selected SAP BTP services and selected services in your own IaaS provider accounts.
With SAP Private Link service, Cloud Foundry CAP applications running on SAP BTP with Microsoft Azure as IaaS provider can communicate with Azure Private Link services via a private connection. This ensures that traffic is not routed through the public internet but stays within the Azure infrastructure.

One possible use case is to use the SAP Private Link service to communicate with an SAP S/4HANA system or other SAP or non-SAP system running on a VM in your own Azure account privately from within SAP BTP Cloud Foundry without SAP Cloud Connector.

![Architecture overview](https://github.com/hterminasyan/privatelink-cap-s4/blob/main/sap_private_link_connection_to_lb.png)

PrivateLink CAP example

Consume external service via PrivateLink.

Bind PrivateLink, Destination Service and XSUAA to CAP application

Create Destination "BusinessPartner" use ProxyType: Internet and provide Private IP address defined in PrivateLink Service Instance.

  ```bash
  Type=HTTP
  Authentication=BasicAuthentication
  WebIDEUsage=odata_abap
  Name=BusinessPartner
  WebIDEEnabled=true
  ProxyType=Internet
  URL=http\://10.220.0.4\:50000
  sap-client=400
  User=BPINST
  ```

## Build MTA

```
mbt build 
```


## Deploy to CF and test

```
cf deploy mta_archives/privatelink-s4-test_1.0.0.mtar
```



Learn more at https://cap.cloud.sap/docs/get-started/.
