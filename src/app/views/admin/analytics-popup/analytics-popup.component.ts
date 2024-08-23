import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-analytics-popup',
  templateUrl: './analytics-popup.component.html',
  styleUrls: ['./analytics-popup.component.scss']
})
export class AnalyticsPopupComponent implements OnInit {


  public itemForm: FormGroup;
  url;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AnalyticsPopupComponent>,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.buildItemForm(this.data.payload)
  }
  buildItemForm(item) {
    this.url=item.url
    this.itemForm = this.fb.group({
      name: [item.name || '', Validators.required],
      desc: [item.desc || ''],
      url: [item.url],
      createdAt: [item.updatedAt || ''],
    })
  }

  submit() {
    this.dialogRef.close(this.itemForm.value)
  }


}
