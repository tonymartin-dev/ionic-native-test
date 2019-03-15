import { Component, OnInit } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions} from '@ionic-native/barcode-scanner/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.page.html',
  styleUrls: ['./barcode.page.scss'],
})
export class BarcodePage implements OnInit {

  encodedData: any = 'https://www.google.com/';
  scannedData: any;
  barcodeScannerOptions: BarcodeScannerOptions;
  browser:any;

  constructor(
    private barcodeScanner: BarcodeScanner,
    private iab: InAppBrowser
  ) {
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    }
  }

  scanCode(){
    this.barcodeScanner.scan()
      .then(barCodeData =>{
        alert('datos del código ' + JSON.stringify(barCodeData));
        this.scannedData = barCodeData;
      })
      .catch(err=>{
        alert('ERROR: ' + err);
      });
  }

  encodeText(){
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.encodedData)
      .then(encodedData=>{
        console.log('datos del código codificado ' + encodedData);
        this.encodedData = encodedData;
      })
      .catch(err=>{
        alert('ERROR: ' + err);
      })
  }

  openLink(){
    this.browser = this.iab.create(this.scannedData.text);
  }

  openLinkPrueba(){
    console.log('Prueba');
    this.browser = this.iab.create('https://www.google.com/');
  }

  ngOnInit() {
  }

}
