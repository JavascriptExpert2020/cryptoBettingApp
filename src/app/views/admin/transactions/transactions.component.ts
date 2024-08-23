import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from '../admin.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConfirmService } from '../../../shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { Subscription } from 'rxjs';
import { egretAnimations } from "../../../shared/animations/egret-animations";
import { TransactionPopupComponent } from '../transaction-popup/transaction-popup.component';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  animations: egretAnimations
})
export class TransactionsComponent implements OnInit {

  public items: any[];
  public getItemSub: Subscription;
  deals = [];
  tempDeals = [];
  name='';
  startdate='';
  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private crudService: AdminService,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService
  ) { }

  ngOnInit() {
    this.getItems();
    this.getTransactions();
  }
  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe()
    }
  }
  getTransactions()
  {
    this.crudService.getAllTransactions().subscribe((res:any) => {
        console.log(res);
        this.deals = res.deal;
        this.tempDeals = res.deal;
    })
  }
  searchFunc()
  {
      if(this.name)
      {
        this.deals = this.tempDeals.filter(result=>{
          return (result.symbol_code ? result.symbol_code.toLowerCase().includes(this.name.toLowerCase()):'')
        })
      }
      if(this.startdate)
      {
        this.deals = this.tempDeals.filter(result=>{
          return (result.startedAt ? result.startedAt.includes(this.startdate):'')
        })
      }
      if(this.startdate && this.name)
      {
        this.deals = this.tempDeals.filter(result=>{
          return (result.startedAt ? result.startedAt.includes(this.startdate):'' && result.symbol_code ? result.symbol_code.toLowerCase().includes(this.name.toLowerCase()):'')
        })
      }
  }
  clearFunc()
  {
    this.deals = this.tempDeals;
    this.name='';
    this.startdate='';
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
    let title = isNew ? 'Add new member' : 'View Deal';
    let dialogRef: MatDialogRef<any> = this.dialog.open(TransactionPopupComponent, {
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
        if (isNew) {
          this.crudService.addItem(res)
            .subscribe(data => {
              this.items = data;
              this.loader.close();
              this.snack.open('Member Added!', 'OK', { duration: 4000 })
            })
        } else {
          this.crudService.updateItem(data._id, res)
            .subscribe(data => {
              this.items = data;
              this.loader.close();
              this.snack.open('Member Updated!', 'OK', { duration: 4000 })
            })
        }
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
