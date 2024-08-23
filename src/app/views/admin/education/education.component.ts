import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from '../admin.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConfirmService } from '../../../shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
//import { NgxTablePopupComponent } from './ngx-table-popup/ngx-table-popup.component';
import { Subscription } from 'rxjs';
import { egretAnimations } from "../../../shared/animations/egret-animations";
import { EditUserComponent } from '../edit-user/edit-user.component';
import { AnalyticsPopupComponent } from '../analytics-popup/analytics-popup.component';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
  animations: egretAnimations

})
export class EducationComponent implements OnInit {

  public items: any[];
  education:any =[];
  tempEducation:any =[];
  name = '';
  created_at = '';
  public getItemSub: Subscription;
  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private crudService: AdminService,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService
  ) { }

  ngOnInit() {
    // this.getItems();
    this.loader.open();
    this.getAllEducation();
  }
  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe()
    }
  }
  getAllEducation()
  {
      this.crudService.getAllEducation().subscribe((data:any)=>{
        console.log(data);
        this.loader.close();
        this.education = data.education;
        this.tempEducation = data.education;
      },err=>{
        this.loader.close();
      }) 
  }
  searchFunc()
  {
      if(this.name)
      {
        this.education = this.tempEducation.filter(result=>{
          return (result.name ? result.name.toLowerCase().includes(this.name.toLowerCase()):'')
        })
      }
      if(this.created_at)
      {
        this.education = this.tempEducation.filter(result=>{
          return (result.updatedAt ? result.updatedAt.includes(this.created_at.toLowerCase()) : '')
        })
      }
      if(this.name && this.created_at)
      {
        this.education = this.tempEducation.filter(result=>{
          return (result.name ? result.name.toLowerCase().includes(this.name.toLowerCase()):'' && result.updatedAt ? result.updatedAt.includes(this.created_at):'');
        })
      }
  }
  clearFunc()
  {
    this.education = this.tempEducation;
    this.name='';
    this.created_at = '';
  }
  createdAt(date)
  {
    let x = date.split('T');
    return x[0];
  }

  getItems() {
    this.getItemSub = this.crudService.getItems()
      .subscribe(data => {
        this.items = data;
      })
  }

  openPopUp(data: any = {}, isNew?) {
    let title = isNew ? 'Add new member' : 'View Education';
    let dialogRef: MatDialogRef<any> = this.dialog.open(AnalyticsPopupComponent, {
      width: '720px',
      disableClose: true,
      data: { title: title, payload: data }
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        if(!res) {
          // If user press cancel
          return;
        }
        this.loader.open();
        // if (isNew) {
        //   this.crudService.addItem(res)
        //     .subscribe(data => {
        //       this.items = data;
        //       this.loader.close();
        //       this.snack.open('Member Added!', 'OK', { duration: 4000 })
        //     })
        // } else {
        //   this.crudService.updateItem(data._id, res)
        //     .subscribe(data => {
        //       this.items = data;
        //       this.loader.close();
        //       this.snack.open('Member Updated!', 'OK', { duration: 4000 })
        //     })
        // }
      })
  }
  deleteItem(row) {
    this.confirmService.confirm({message: `Delete ${row.name}?`})
      .subscribe((res:any) => {
        if (res) {
          this.loader.open();
          debugger
          this.crudService.deleteEducation(row.id).subscribe(data=>{
            this.snack.open('Analytics deleted!', 'OK', { duration: 4000 })
            // this.loader.close();
            this.getAllEducation();
          })
          // this.crudService.removeItem(row)
          //   .subscribe(data => {
          //     this.items = data;
          //     this.loader.close();
          //     this.snack.open('Member deleted!', 'OK', { duration: 4000 })
          //   })
        }
      })
  }


}
