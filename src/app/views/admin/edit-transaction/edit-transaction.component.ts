import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AdminService } from '../admin.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.scss']
})
export class EditTransactionComponent implements OnInit {

  public itemForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditTransactionComponent>,
    private fb: FormBuilder,
    // private crudService: AdminService,
    private loader: AppLoaderService
  ) { }

  ngOnInit() {
    this.buildItemForm(this.data.payload)
  }
  buildItemForm(item) {
    this.itemForm = this.fb.group({
      bank_name: [item.bank_name ],
      amount: [item.amount || ''],
      city: [item.city || ''],
      country: [item.country || ''],
      createdAt: [item.createdAt || ''],
      iban: [item.iban || ''],
      id: [item.id || ''],
      status: [item.status],
      title: [item.title],
      transactionDate: [item.transactionDate],
      userId: [item.userId],
      accountBalance: [item.user_account.accountBalance],
      accountType: [item.user_account.accountType],
      tradeableBalance: [item.user_account.tradeableBalance ],
      statusToggle : [item.status],
      accountId: [item.accountId],
    })
  }
  onChangeToggle()
  {
    this.loader.open();
    var d = new Date();
    // let user = this.crudService.getUser();
    // this.crudService.completeWithDrawalRequests(this.itemForm.controls.accountId, user.userId, d, this.itemForm.controls.id).subscribe(data => {
    //   this.loader.close();
    //   console.log(data);
    // })
  }
  submit() {
    this.dialogRef.close(this.itemForm)
  }

}
