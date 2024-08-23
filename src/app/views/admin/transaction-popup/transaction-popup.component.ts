import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { egretAnimations } from "../../../shared/animations/egret-animations";


@Component({
  selector: 'app-transaction-popup',
  templateUrl: './transaction-popup.component.html',
  styleUrls: ['./transaction-popup.component.scss'],
  animations: egretAnimations

})
export class TransactionPopupComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TransactionPopupComponent>,
    private fb: FormBuilder,

  ) { }

  ngOnInit(): void {
  }
  submit() {
    this.dialogRef.close()
  }
  createdAt(date)
  {
    let x = date.split('T');
    return x[0];
  }
}
