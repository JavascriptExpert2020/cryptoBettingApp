import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { AdminService } from '../admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-upload-education',
  templateUrl: './upload-education.component.html',
  styleUrls: ['./upload-education.component.scss']
})
export class UploadEducationComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({ url: 'upload_url' });
  public hasBaseDropZoneOver: boolean = false;
  contactPersons=[];
  image;
  type;
  size: any;
  name: any;
  desc:any;
  is_active:any;
  constructor(
    private ad:AdminService,
    private snack: MatSnackBar,
    private loader: AppLoaderService,
    private router: Router,

  ) { }

  ngOnInit(): void {
  }
  uploadEducation()
  {
    this.loader.open();
      let user = this.ad.getUser();
      this.ad.uploadEducation(this.name,this.desc,this.image,user.userId).subscribe(res=>{
        this.loader.close();
        this.router.navigate(['/admin/education']);
      },err=>{
        this.loader.close();
      })
  }
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
  uploadPDF(event: any, feild: any) {
    debugger
    // this.loading=true;
    this.loader.open();
    if (event.target.value) {
      for (let i = 0; i < event.target.files.length; i++) {
        debugger
        const file = event.target.files[i];
        this.type = file.type;
        if(file.type!='application/pdf')
        {
          this.snack.open('You can upload only file type of pdf.', 'OK', { duration: 4000 })
          this.loader.close();
          return;
        }
        this.name = file.name;
        this.size = file.size/1024/1024;
        let formData = new FormData();
        
        formData.append('file', file);
        this.ad.uploadPDF(formData, 'admin-uploads').then((response: any) => {
          //this.sendDocuments.push(response.url);
          this.loader.close();
          this.image = response.url;
          if (feild == 'member-news') {
            this.image = response.url;
  //          this.uploadable=true;
            this.loader.close();
          }
        });
      }

    } else alert('Please choose a valid file')
}
}
