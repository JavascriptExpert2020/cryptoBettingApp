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
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss'],
  animations: egretAnimations

})
export class DealsComponent implements OnInit {

  symbolData;
  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private crudService: AdminService,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.symbolData = this.crudService.getSymbolData();
    console.log(this.crudService.getSymbolData());
  }
  updateSymbol()
  {
    this.loader.open();
    this.crudService.updateSymbol(this.symbolData.isActive, this.symbolData.percentUp, this.symbolData.percentDown, this.symbolData.oneMint, this.symbolData.twoMint, this.symbolData.threeMint, this.symbolData.fourMint, this.symbolData.fiveMint, this.symbolData.onehalfMint, this.symbolData.twohalfMint, this.symbolData.threehalfMint, this.symbolData.fouthalfMint,this.symbolData.id)
    .subscribe(data=>{
      this.loader.close();
      this.snack.open('Trend Updated!', 'OK', { duration: 4000 });
      this.router.navigate(['/admin/trends']);
    },err=>{
      this.loader.close();
    })
  }
}
