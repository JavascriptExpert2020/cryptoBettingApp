import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { AdminService } from '../admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-upload-analytics',
  templateUrl: './upload-analytics.component.html',
  styleUrls: ['./upload-analytics.component.scss']
})
export class UploadAnalyticsComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({ url: `35.1.11.1/api/aws/file?email=itsshuja1997@gmail.com` });
  public hasBaseDropZoneOver: boolean = false;
  contactPersons=[];
  loading:boolean=false;
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

  ngOnInit(): void {}
  uploadAnalytics()
  {
    this.loader.open();
      let user = this.ad.getUser();
      this.ad.uploadAnalytics(this.name,this.desc,this.image,user.userId,this.is_active).subscribe(res=>{
        this.loader.close();
        this.router.navigate(['/admin/analytics']);
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
        
        // var _URL = window.URL || window.webkitURL;
        // let img = new Image();
//        let that = this;
        // img.onload = function() {
        //     if(img.width!=1641 && img.height!=419) {
        //         that.res = false;
        //         alert("Please upload image of 1641px x 419px only");
        //         that.loading = false;
        //     }
        //     else {
        //       //  that. res = true;
        //     }
        // };
        // img.onerror = function() {
        //     alert( "not a valid file: " + file.type);
        // };




        // img.src = _URL.createObjectURL(file);
        // if(this.loading==false) {
        //     return;
        // }
        this.ad.uploadPDF(formData, 'admin-uploads').then((response: any) => {
          //this.sendDocuments.push(response.url);
          this.loader.close();
          this.image = response.url;
          if (feild == 'member-news' && this.loading) {
            this.image = response.url;
  //          this.uploadable=true;
            this.loading=false;
            this.loader.close();
          }
        });
      }

    } else alert('Please choose a valid file')
}
}
