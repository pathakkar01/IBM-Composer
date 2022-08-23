import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  conga_merge_templateId = 'a044H00001GYoJzQAL';

  conga_org_Id = '00D4H000001Irjv';

  conga_user_Id = '0054H000006A8zVQAS';

  conga_auth_endpoint =
    'https://services.congamerge.com/api/v1/auth/connect/token';

  salesforce_login_endpoint =
    'https://login.salesforce.com/services/oauth2/token';

  proxy_server_endPoint = '/api/CLMAuth/ExecuteMethod';

  proxy_server_endpoint_urlencoded = '/api/CLMAuth/ExecuteMethodFormURLEncode';

  conga_merge_endpoint = 'https://services.congamerge.com/api/v1/ingress/Merge';

  conga_merge_download_endPoint =
    'https://composer.congamerge.com/c8/services/v2/Document/';

  conga_merge_UL =
    'https://ibmv2220.my.salesforce.com/services/Soap/u/50.0/00D7Q000008KjxV';

  JSONObjComposerReq = {
    json: {
      grant_type: 'client_credentials',
      scope: 'doc-gen.composer',
      client_id: '01d5c0b8-f0d6-43c9-b69d-ffc79b67415a',
      client_secret: '@$$@joiJ-bpM7-7?a6?75LySU',
    },
    methodType: 'POST',
    uri: this.conga_auth_endpoint,
  };

  JSONObjSFDCReq = {
    json: {},
    methodType: 'POST',
    uri: 'https://login.salesforce.com/services/oauth2/token?grant_type=password&client_id=3MVG9ZlTu2QmDfb2E8EpleQNqeB.hOEtDA0sXVCiQSuFJX2SbZu9jazaDz0koMJVrLLDPELxgKRCN658kCULU&username=lreulecke221106@congagdo.com&password=conga2022&redirect_uri=https://lreulecke221106.lightning.force.com/&client_secret=0E13237CAC11D28526C84CBB41478C1CE2849B2F39BC8FA0C90D34833823692C',
  };

  constructor(private http: HttpClient) {}

  getComposerToken(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = { headers: headers };

    return this.http.post(
      this.proxy_server_endpoint_urlencoded,
      this.JSONObjComposerReq,
      options
    );
  }

  getSalesforceToken(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = { headers: headers };

    return this.http.post(
      this.proxy_server_endPoint,
      this.JSONObjSFDCReq,
      options
    );
  }

  generateDocViaMergeAPI(
    accessToken: String,
    sfToken: String,
    projectName: string,
    clientLegalName: string,
    masterObjId: string,
    validUntilDate: string,
    requestedBy: string,
    pcrNumber: string,
    products: any
  ): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = { headers: headers };

    var JSONObjSFDCMerReq = {
      json: {
        SalesforceRequest: {
          SessionId: sfToken,
          TemplateId: this.conga_merge_templateId,
          MasterId: masterObjId,
          ServerUrl: this.conga_merge_UL,
        },
        LegacyOptions: {
          sc0: '1',
          sc1: 'SalesforceFile',
          DefaultPDF: '1',
          DS7: '11',
          xid: 'External:Conga:0Q_056UAS542201',
          UF0: '1',
          MFTS0: 'JSONAttributes__c',
          MFTSValue0: JSON.stringify({
            projectName: projectName,
            requestedBy: requestedBy,
            pcrNumber: pcrNumber,
            validUntilDate: validUntilDate,
            clientLegalName: clientLegalName,
          }),
        },
        jsonData: JSON.stringify({
          projectName: projectName,
          requestedBy: requestedBy,
          pcrNumber: pcrNumber,
          validUntilDate: validUntilDate,
          clientLegalName: clientLegalName,
          products: products,
        }),
      },
      authToken: accessToken,
      methodType: 'POST',
      uri: this.conga_merge_endpoint,
    };
    console.log('JSONObjSFDCMerReq===>');
    console.log(JSONObjSFDCMerReq);
    return this.http.post(
      this.proxy_server_endPoint,
      JSONObjSFDCMerReq,
      options
    );
  }

  getDocumentViaId(corelationID: String): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = { headers: headers };

    var JSONObjDownloadMerReq = {
      json: {},
      methodType: 'GET',
      uri:
        this.conga_merge_download_endPoint +
        this.conga_org_Id +
        '-' +
        this.conga_user_Id +
        '-' +
        corelationID +
        '?docid=' +
        this.conga_org_Id +
        '-' +
        this.conga_user_Id +
        '-' +
        corelationID +
        '-1&getbinary=true',
    };
    console.log('JSONObjDownloadMerReq===>');
    console.log(JSONObjDownloadMerReq);
    return this.http.post(
      this.proxy_server_endPoint,
      JSONObjDownloadMerReq,
      options
    );
  }
}
