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

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss'],
  animations: egretAnimations
})
export class AllUsersComponent implements OnInit {

  public items: any[];
  users:any =[];
  tempUsers:any =[];
  public getItemSub: Subscription;
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
    this.getAllUsers();
  }
  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe()
    }
  }
  getAllUsers()
  {
      this.crudService.getAllUsers().subscribe((data:any)=>{
        this.users = data.User;
        this.tempUsers = data.User;
        for(var i=0;i<this.users.length;i++)
        {
          if(this.users[i].name == null)
          {
            this.users.splice(i,1)
          }
        }
        this.loader.close();
      },err=>{
        this.loader.close();
      }) 
  }
  searchFunc()
  {
      if(this.name)
      {
        this.users = this.tempUsers.filter(result=>{
          return (result.name ? result.name.toLowerCase().includes(this.name.toLowerCase()):'')
        })
      }
      if(this.email)
      {
        this.users = this.tempUsers.filter(result=>{
          return (result.email ? result.email.toLowerCase().includes(this.email.toLowerCase()) : '')
        })
      }
      // if(this.city)
      // {
      //   this.users = this.tempUsers.filter(result=>{
      //     return (result.city ? result.city.toLowerCase().includes(this.city.toLowerCase()):'')
      //   })
      // }
      // if(this.country)
      // {
      //   this.users = this.tempUsers.filter(result=>{
      //     return (result.country ? result.country.toLowerCase().includes(this.country.toLowerCase()):'')
      //   })
      // }
      if(this.phoneno)
      {
        this.users = this.tempUsers.filter(result=>{
          return (result.phoneNo ? result.phoneNo.includes(this.phoneno):'')
        })
      }
      if(this.name && this.email)
      {
        this.users = this.tempUsers.filter(result=>{
          return (result.name ? result.name.toLowerCase().includes(this.name.toLowerCase()):'' && result.email ? result.email.toLowerCase().includes(this.email.toLowerCase()):'');
        })
      }
      if(this.name && this.phoneno)
      {
        this.users = this.tempUsers.filter(result=>{
          return (result.name ? result.name.toLowerCase().includes(this.name.toLowerCase()):'' && result.phoneNo ? result.phoneNo.includes(this.phoneno):'');
        })
      }
      if(this.email && this.phoneno)
      {
        this.users = this.tempUsers.filter(result=>{
          return (result.email ? result.email.toLowerCase().includes(this.email.toLowerCase()):'' && result.phoneNo ? result.phoneNo.includes(this.phoneno):'');
        })
      }
      if(this.email && this.phoneno && this.name)
      {
        this.users = this.tempUsers.filter(result=>{
          return (result.name ? result.name.toLowerCase().includes(this.name.toLowerCase()):'' && result.email ? result.email.toLowerCase().includes(this.email.toLowerCase()):'' && result.phoneNo ? result.phoneNo.includes(this.phoneno):'');
        })
      }
  }
  clearFunc()
  {
    this.users = this.tempUsers;
    this.name='';
    this.phoneno='';
    this.email='';
  }
  getItems() {
    this.getItemSub = this.crudService.getItems()
      .subscribe(data => {
        this.items = data;
      })
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
          this.crudService.updateUser(data.id, res).subscribe(data=>{
              this.getAllUsers()
              this.snack.open('Member Updated!', 'OK', { duration: 4000 })
        },err=>{
            this.loader.close();
          })
          // this.crudService.updateItem(data.id, res)
          //   .subscribe(data => {
          //     this.items = data;
          //     this.loader.close();
          //     this.snack.open('Member Updated!', 'OK', { duration: 4000 })
          //   })
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
