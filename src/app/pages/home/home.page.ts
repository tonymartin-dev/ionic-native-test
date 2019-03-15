import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  image;
  getPicture: Function;

  constructor(
    private camera: Camera
  ) { }

  ngOnInit() {

    this.getPicture = () => {
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        targetHeight: 1000,
        targetWidth: 1000,
        cameraDirection: 1
      }
      
      this.camera.getPicture(options).then(
        (imageData) => {
          this.image = 'data:image/jpeg;base64,' + imageData;
          alert(this.image);
        }, (err) => {
          // Handle error
        });

    }


  }

}
