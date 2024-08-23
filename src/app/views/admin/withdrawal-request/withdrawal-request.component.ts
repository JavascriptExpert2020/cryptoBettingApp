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
import { EditTransactionComponent } from '../edit-transaction/edit-transaction.component';


@Component({
  selector: 'app-withdrawal-request',
  templateUrl: './withdrawal-request.component.html',
  styleUrls: ['./withdrawal-request.component.scss'],
  animations: egretAnimations
})
export class WithdrawalRequestComponent implements OnInit {

  public items: any[];
  withdrawRequests: any = [];
  tempWithdrawRequests: any = [];
  public getItemSub: Subscription;
  name = '';
  title = '';
  status = '';
  accountID = 0;
  userID = 0;
  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private crudService: AdminService,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService
  ) { }

  ngOnInit() {
    this.loader.open();
    this.getWithdrawalList();
    // this.getItems()
  }
  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe()
    }
  }
  getWithdrawalList()
  {
    this.crudService.getAllWithDrawalRequests().subscribe((res:any)=>{
      this.withdrawRequests = res.user_withdrawal;
      this.tempWithdrawRequests = res.user_withdrawal;
      this.loader.close();
    },err=>{
      this.loader.close();
    })
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
  searchFunc()
  {
    if(this.name)
    {
      this.withdrawRequests = this.tempWithdrawRequests.filter(result=>{
        return (result.bank_name ? result.bank_name.toLowerCase().includes(this.name.toLowerCase()):'')
      })
    }
    if(this.title)
    {
      this.withdrawRequests = this.tempWithdrawRequests.filter(result=>{
        return (result.title ? result.title.toLowerCase().includes(this.title.toLowerCase()) : '')
      })
    }
    if(this.status)
    {
      this.withdrawRequests = this.tempWithdrawRequests.filter(result=>{
        return (result.status ? result.status.toLowerCase().includes(this.status.toLowerCase()) : '')
      })
    }
    // if(this.accountID)
    // {
    //   this.withdrawRequests = this.tempWithdrawRequests.filter(result=>{
    //     return (result.accountId ? result.accountId.includes(this.accountID) : '')
    //   })
    // }
    // debugger
    // if(this.userID)
    // {
    //   this.withdrawRequests = this.tempWithdrawRequests.filter(result=>{
    //     return (result.userId ? result.userId.includes(this.userID) : '')
    //   })
    // }
    if(this.title && this.name)
    {
      this.withdrawRequests = this.tempWithdrawRequests.filter(result=>{
        return (result.bank_name ? result.bank_name.toLowerCase().includes(this.name.toLowerCase()):'' && result.title ? result.title.toLowerCase().includes(this.title.toLowerCase()) : '')
      })
    }
    if(this.title && this.status)
    {
      this.withdrawRequests = this.tempWithdrawRequests.filter(result=>{
        return (result.status ? result.status.toLowerCase().includes(this.status.toLowerCase()) : '' && result.title ? result.title.toLowerCase().includes(this.title.toLowerCase()) : '')
      })
    }
    if(this.name && this.status)
    {
      this.withdrawRequests = this.tempWithdrawRequests.filter(result=>{
        return (result.bank_name ? result.bank_name.toLowerCase().includes(this.name.toLowerCase()):'' && result.title ? result.title.toLowerCase().includes(this.title.toLowerCase()) : '')
      })
    }
    if(this.name && this.status && this.title)
    {
      this.withdrawRequests = this.tempWithdrawRequests.filter(result=>{
        return (result.bank_name ? result.bank_name.toLowerCase().includes(this.name.toLowerCase()):'' && result.title ? result.title.toLowerCase().includes(this.title.toLowerCase()) : '' && result.status ? result.status.toLowerCase().includes(this.status.toLowerCase()) : '')
      })
    }
  }
  clearFunc()
  {
    this.withdrawRequests = this.tempWithdrawRequests;
    this.name = '';
    this.title = '';
    this.status = '';
  }
  openPopUp(data: any = {}, isNew?) {
    let title = isNew ? 'Add new member' : 'Update Withdrawal Request';
    let dialogRef: MatDialogRef<any> = this.dialog.open(EditTransactionComponent, {
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
        var d = new Date();
        let user = this.crudService.getUser();
        debugger
        if(res.controls.statusToggle.touched == true)
        {
          // this.loader.open();
          if(res.controls.statusToggle.value == 'Completed')
          {
        
            this.crudService.completeWithDrawalRequests(data.accountId,user.userId,d,res.controls.id.value).subscribe(data=>{
//                  this.getWithdrawalList();
              window.location.reload();
            },(err)=>{
                 this.loader.close();
            })  
  
          }
          else if(res.controls.statusToggle.value == 'Rejected')
          {
            this.crudService.revertWithDrawalRequests(data.accountId,user.userId,d,res.controls.id.value).subscribe(data=>{
                  // this.getWithdrawalList();
                  window.location.reload();
                },(err) => {
              this.loader.close();
         })
    
        }
        this.loader.close();
      }
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
