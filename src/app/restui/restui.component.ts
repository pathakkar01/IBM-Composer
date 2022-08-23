import { HttpClient } from '@angular/common/http';
import { NgZone, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-restui',
  templateUrl: './restui.component.html',
  providers: [AppService],
  styleUrls: ['./restui.component.css'],
})
export class RESTUIComponent implements OnInit {
  projectName = '';
  clientLegalName = '';
  masterObjId = '';
  validUntilDate = Date();
  requestedBy = '';
  pcrNumber = '';

  inHomePage = true;
  inDownLoadPage = false;

  isGettingSalesforceToken = false;
  isGettingcongaAuthToken = false;
  isMergingDoc = false;

  isSendSuccesFully = false;
  correlationId = '';

  isLoading = false;
  products = [
    {
      id: 'p0',
      name: '',
      quantity: '',
      productCode: '',
      price: '',
    },
  ];

  onAddProduct() {
    const id = 'p' + this.products.length;
    this.products.push({
      id: id,
      name: '',
      quantity: '',
      productCode: '',
      price: '',
    });
    console.log(this.products);
  }

  onRemoveProduct(i: any) {
    this.products.splice(i, 1);
    console.log(i);
  }

  goToDownloadPage() {
    this.isSendSuccesFully = false;
    this.inHomePage = false;
  }

  goToHomePage() {
    console.log('Here');
    this.inHomePage = true;
    this.isSendSuccesFully = false;
    this.isLoading = false;
    console.log(this.inHomePage, this.isLoading, this.isSendSuccesFully);
  }

  onReset() {
    this.isSendSuccesFully = false;
    this.isLoading = false;
  }

  constructor(private appService: AppService, private ngZone: NgZone) {}

  ngOnInit(): void {}

  onDownload() {
    console.log(this.correlationId);
    this.appService.getDocumentViaId(this.correlationId).subscribe((dataRes)=>{
      alert('Document Downloaded Successfully!!');
    });
    
  }

  onDownload1() {
    const corrID = this.correlationId.trim();
    const downloadUrl = this.appService.conga_merge_download_endPoint+this.appService.conga_org_Id +'-' +this.appService.conga_user_Id +'-' +corrID +'?docid=' +     this.appService.conga_org_Id +'-' +this.appService.conga_user_Id +'-' +corrID +'-1&getbinary=true';
    window.open(downloadUrl, '_blank');
  }

  onFormsubmit() {
    this.ngZone.run(() => {
      this.isGettingSalesforceToken = true;
      this.isLoading = true;
    });

    console.log(
      'projectName===>' + this.projectName,
      this.isGettingSalesforceToken
    );
    this.appService.getSalesforceToken().subscribe((data) => {
      console.log('data===>' + data);
      console.log('data.access_token===>' + data.access_token);
      console.log(data.access_token);
      this.isGettingSalesforceToken = false;
      this.isGettingcongaAuthToken = true;
      this.appService.getComposerToken().subscribe((dataRes) => {
        console.log('data===>' + dataRes);
        console.log('data.access_token===>' + dataRes.access_token);
        console.log(dataRes.access_token);
        this.isGettingcongaAuthToken = false;
        this.isMergingDoc = true;
        this.appService
          .generateDocViaMergeAPI(
            dataRes.access_token,
            data.access_token,
            this.projectName,
            this.clientLegalName,
            this.masterObjId,
            this.validUntilDate,
            this.requestedBy,
            this.pcrNumber,
            this.products
          )
          .subscribe((dataMergeRes) => {
            this.isMergingDoc = false;
            this.isLoading = false;
            console.log('dataMergeRes===>' + dataMergeRes);
            console.log('dataMergeRes.correlationId===>' + dataMergeRes.correlationId);
            console.log(dataMergeRes.correlationId);
            this.correlationId =dataMergeRes.correlationId;
            this.isSendSuccesFully = true;
          });
      });
    });
  }
}
