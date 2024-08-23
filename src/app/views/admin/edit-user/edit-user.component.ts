import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  public itemForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditUserComponent>,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.buildItemForm(this.data.payload)
  }
  buildItemForm(item) {
    this.itemForm = this.fb.group({
      name: [item.name || '', Validators.required],
      email: [item.email || ''],
      blackList: [item.blackList],
      phoneNo: [item.phoneNo || ''],
      address: [item.address || ''],
      zipCode: [item.zipCode || ''],
      avatar: [item.avatar || ''],
      dob: [item.dob || ''],
      city: [item.city || ''],
      country: [item.country || ''],
      password: [item.password || ''],
      verified: [item.verified || false]
    })
  }

  submit() {
    this.dialogRef.close(this.itemForm.value)
  }

}
