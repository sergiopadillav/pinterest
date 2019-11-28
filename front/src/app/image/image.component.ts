import { Component, OnInit } from '@angular/core';
import { ImageServiceService } from '../image-service.service';
import { Image } from '../models/image';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
  providers:[ImageServiceService]
})
export class ImageComponent implements OnInit {

  fileToUpload : File = null;
  rutaImage : String = "/assets/img/descarga.png";
  imageUrl : String = this.rutaImage;
  constructor(private imageService: ImageServiceService) { }

  ngOnInit() {
    this.getImage();
  }
  

  handleFileInput(file : FileList){
    this.fileToUpload = file.item(0);

    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  OnSubmit(title, description, image){
    this.imageService.postImage(title.value, description.value, this.fileToUpload)
      .subscribe( data => {
        console.log("done");
        title.value = null;
        description.value = null;
        image.value = null;
        this.imageUrl = this.rutaImage;
        this.getImage();
      });
  }

  getImage(){
    this.imageService.getImage()
    .subscribe(res => {
      this.imageService.images = res as Image[];
      console.log(res);
    });
  }

}
