import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from '../admin.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConfirmService } from '../../../shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
//import { NgxTablePopupComponent } from './ngx-table-popup/ngx-table-popup.component';
import { Subscription } from 'rxjs';
import { egretAnimations } from "../../../shared/animations/egret-animations";
// import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-contactus-list',
  templateUrl: './contactus-list.component.html',
  styleUrls: ['./contactus-list.component.scss'],
  animations: egretAnimations

})
export class ContactusListComponent implements OnInit {

  public items: any[];
  public getItemSub: Subscription;
  contactUs:any = [];
  tempContactUs:any = [];
  name = '';
  city = '';
  country = '';
  phoneno = '';
  email = '';

  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private crudService: AdminService,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService
  ) { }

  ngOnInit() {
    this.loader.open();
    // this.getItems();
    this.getContactUs();
  }
  getContactUs()
  {
    this.crudService.getAllContactUs().subscribe((data:any)=>{
      console.log(data);
      this.contactUs = data.contact_us;
      this.tempContactUs = data.contact_us;
      this.loader.close();
    },err=>{
      this.loader.close();
    })
  }
  searchFunc()
  {
      if(this.name)
      {
        this.contactUs = this.tempContactUs.filter(result=>{
          return (result.name ? result.name.toLowerCase().includes(this.name.toLowerCase()):'')
        })
      }
      if(this.email)
      {
        this.contactUs = this.tempContactUs.filter(result=>{
          return (result.email ? result.email.toLowerCase().includes(this.email.toLowerCase()) : '')
        })
      }
      if(this.phoneno)
      {
        this.contactUs = this.tempContactUs.filter(result=>{
          return (result.phoneNo ? result.phoneNo.includes(this.phoneno):'')
        })
      }
      if(this.name && this.email)
      {
        this.contactUs = this.tempContactUs.filter(result=>{
          return (result.name ? result.name.toLowerCase().includes(this.name.toLowerCase()):'' && result.email ? result.email.toLowerCase().includes(this.email.toLowerCase()):'');
        })
      }
      if(this.name && this.phoneno)
      {
        this.contactUs = this.tempContactUs.filter(result=>{
          return (result.name ? result.name.toLowerCase().includes(this.name.toLowerCase()):'' && result.phoneNo ? result.phoneNo.includes(this.phoneno):'');
        })
      }
      if(this.email && this.phoneno)
      {
        this.contactUs = this.tempContactUs.filter(result=>{
          return (result.email ? result.email.toLowerCase().includes(this.email.toLowerCase()):'' && result.phoneNo ? result.phoneNo.includes(this.phoneno):'');
        })
      }
      if(this.email && this.phoneno && this.name)
      {
        this.contactUs = this.tempContactUs.filter(result=>{
          return (result.name ? result.name.toLowerCase().includes(this.name.toLowerCase()):'' && result.email ? result.email.toLowerCase().includes(this.email.toLowerCase()):'' && result.phoneNo ? result.phoneNo.includes(this.phoneno):'');
        })
      }
  }
  clearFunc()
  {
    this.contactUs = this.tempContactUs;
  }

  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe()
    }
  }
  getItems() {
    this.getItemSub = this.crudService.getItems()
      .subscribe(data => {
        this.items = data;
      })
  }
  createdAt(date)
  {
    let x = date.split('T');
    return x[0];
  }
  openPopUp(data: any = {}, isNew?) {
    // let title = isNew ? 'Add new member' : 'Update member';
    // let dialogRef: MatDialogRef<any> = this.dialog.open(EditUserComponent, {
    //   width: '720px',
    //   disableClose: true,
    //   data: { title: title, payload: data }
    // })
    // dialogRef.afterClosed()
    //   .subscribe(res => {
    //     if(!res) {
    //       // If user press cancel
    //       return;
    //     }
    //     this.loader.open();
    //     if (isNew) {
    //       this.crudService.addItem(res)
    //         .subscribe(data => {
    //           this.items = data;
    //           this.loader.close();
    //           this.snack.open('Member Added!', 'OK', { duration: 4000 })
    //         })
    //     } else {
    //       this.crudService.updateItem(data._id, res)
    //         .subscribe(data => {
    //           this.items = data;
    //           this.loader.close();
    //           this.snack.open('Member Updated!', 'OK', { duration: 4000 })
    //         })
    //     }
    //   })
  }
  deleteItem(row) {
    this.confirmService.confirm({message: `Delete ${row.name}?`})
      .subscribe(res => {
        if (res) {
          this.loader.open();
          this.crudService.removeItem(row)
            .subscribe(data => {
              this.items = data;
              this.loader.close();
              this.snack.open('Member deleted!', 'OK', { duration: 4000 })
            })
        }
      })
  }

}
