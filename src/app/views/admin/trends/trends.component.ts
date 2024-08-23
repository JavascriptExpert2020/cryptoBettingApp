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
import { Router } from '@angular/router';
@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.scss'],
  animations: egretAnimations

})
export class TrendsComponent implements OnInit {

  public items: any[];
  symbols:any = [];
  tempSymbols:any = [];
  public getItemSub: Subscription;
  name = '';
  exchange_name = '';
  symbol = '';
  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private crudService: AdminService,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService,
    private router: Router,

  ) { }

  ngOnInit() {
    this.loader.open();
    this.getItems()
  }
  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe()
    }
  }
  getItems() {
    this.crudService.getAllSymbols()
      .subscribe((data:any) => {
        console.log(data);
        this.symbols = data.symbols;
        this.tempSymbols = data.symbols;
        this.loader.close();
      })
  }
  searchFunc()
  {
      if(this.name)
      {
        this.symbols = this.tempSymbols.filter(result=>{
          return (result.name ? result.name.toLowerCase().includes(this.name.toLowerCase()):'')
        })
      }
      if(this.exchange_name)
      {
        this.symbols = this.tempSymbols.filter(result=>{
          return (result.exchange_name ? result.exchange_name.toLowerCase().includes(this.exchange_name.toLowerCase()) : '')
        })
      }
      if(this.symbol)
      {
        this.symbols = this.tempSymbols.filter(result=>{
          return (result.symbol_code ? result.symbol_code.includes(this.symbol):'')
        })
      }
      if(this.name && this.exchange_name)
      {
        this.symbols = this.tempSymbols.filter(result=>{
          return (result.name ? result.name.toLowerCase().includes(this.name.toLowerCase()):'' && result.email ? result.exchange_name.toLowerCase().includes(this.exchange_name.toLowerCase()):'');
        })
      }
      if(this.name && this.symbol)
      {
        this.symbols = this.tempSymbols.filter(result=>{
          return (result.name ? result.name.toLowerCase().includes(this.name.toLowerCase()):'' && result.symbol_code ? result.symbol_code.includes(this.symbol):'');
        })
      }
      if(this.exchange_name && this.symbol)
      {
        this.symbols = this.tempSymbols.filter(result=>{
          return (result.exchange_name ? result.exchange_name.toLowerCase().includes(this.exchange_name.toLowerCase()):'' && result.symbol_code ? result.symbol_code.includes(this.symbol):'');
        })
      }
      if(this.exchange_name && this.symbol && this.name)
      {
        this.symbols = this.tempSymbols.filter(result=>{
          return (result.name ? result.name.toLowerCase().includes(this.name.toLowerCase()):'' && result.email ? result.exchange_name.toLowerCase().includes(this.exchange_name.toLowerCase()):'' && result.symbol_code ? result.symbol_code.includes(this.symbol):'');
        })
      }
  }
  clearFunc()
  {
    this.symbols = this.tempSymbols;
    this.name='';
    this.exchange_name='';
    this.symbol='';
  }

  openPopUp(data: any = {}, isNew?) {
    let title = isNew ? 'Add new member' : 'Update member';
    let dialogRef: MatDialogRef<any> = this.dialog.open(EditUserComponent, {
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
  nextComponent(data)
  {
      this.crudService.setSymbol(data);
      this.router.navigate(['/admin/edit-trends']);
  }

}
