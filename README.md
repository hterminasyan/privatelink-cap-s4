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

## Build MTA

```
mbt build 
```


## Deploy to CF and test

```
cf deploy mta_archives/privatelink-s4-test_1.0.0.mtar
```



Learn more at https://cap.cloud.sap/docs/get-started/.
