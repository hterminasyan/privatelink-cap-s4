# Getting Started

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


## Next Steps

- Open a new terminal and run `cds watch` 
- (in VS Code simply choose _**Terminal** > Run Task > cds watch_)
- Start adding content, for example, a [db/schema.cds](db/schema.cds).


## Learn More

Learn more at https://cap.cloud.sap/docs/get-started/.
