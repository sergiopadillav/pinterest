import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Image } from './models/image';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  images: Image[];

  readonly URL_API = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  postImage(title: string, description: string, fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", fileToUpload);

    return this.http.post(this.URL_API + "/upload",formData);
  }

  getImage() {
    return this.http.get(this.URL_API);
  }



}
