import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDB } from '../../shared/inmemory-db/users';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LocalStoreService } from 'app/shared/services/local-store.service';

@Injectable()
export class AdminService {
  items: any[];
  trends: any[];
  apiUrl: any = environment.apiURL;
  APP_USER = "EGRET_USER";
  constructor(
    private http: HttpClient,
    private ls: LocalStoreService,
  ) {
    let userDB = new UserDB();
    this.items = userDB.users;
  }

  //******* Implement your APIs ********
  getItems(): Observable<any> {
    return  of(this.items.slice())
  }
  addItem(item): Observable<any> {
    item._id = Math.round(Math.random() * 10000000000).toString();
    this.items.unshift(item);
    return of(this.items.slice()).pipe(delay(1000));
  }
  updateItem(id, item) {
    this.items = this.items.map(i => {
      if(i._id === id) {
        return Object.assign({}, i, item);
      }
      return i;
    })
    return of(this.items.slice()).pipe(delay(1000));
  }
  removeItem(row) {
    let i = this.items.indexOf(row);
    this.items.splice(i, 1);
    return of(this.items.slice()).pipe(delay(1000));
  }
  getAllUsers()
  {
    return this.http.get(`${this.apiUrl}/api/user/getAllusers`) 
  }
  updateUser(id,item)
  {
    return this.http.post(`${this.apiUrl}/api/user/updateUserById?id=${id}`,{
      name: item.name,
      email:item.email,
      blackList: item.blackList,
      phoneNo: item.phoneNo,
      address: item.address,
      zipCode: item.zipCode,
      avatar: item.avatar,
      dob: item.dob,
      city: item.city,
      country: item.country,
      password: item.password,
      verified: item.verified
    }) 
  }
  getAllContactUs()
  {
    return this.http.get(`${this.apiUrl}/api/contactus/getallcontactus`) 
  }
  getAllSymbols()
  {
    return this.http.get(`${this.apiUrl}/api/symbol/getAllSymbols`) 
  }
  getAllTransactions()
  {
    return this.http.get(`${this.apiUrl}/api/deal/getAllDeals`);     
  }
  getAllWithDrawalRequests()
  {
    return this.http.get(`${this.apiUrl}/api/user_withdrawal/withdrawRequests`) 
  }
  completeWithDrawalRequests(accountId,processedBy,processedAt,reqId)
  {
    return this.http.post(`${this.apiUrl}/api/user_withdrawal/completewithdrawalRequest`,{
      accountId:accountId,processedBy:processedBy,processedAt:processedAt,reqId:reqId
    }) 
  }
  revertWithDrawalRequests(accountId,processedBy,processedAt,reqId)
  {
    return this.http.post(`${this.apiUrl}/api/user_withdrawal/revertWithdrawal`,{
      accountId:accountId,processedBy:processedBy,processedAt:processedAt,reqId:reqId
    }) 
  }
  getAllAnalytics()
  {
    return this.http.get(`${this.apiUrl}/api/analytics/getallanalytics`); 
  }
  uploadPDF(data: any, email: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.apiUrl}/api/aws/file?email=${email}`, data).subscribe((response: any) => {
        //
        resolve(response);
      }, reject)
    });
  }
  uploadAnalytics(name:any,desc:any,url:any,uploadedBy:any,is_active:boolean)
  {
    return this.http.post(`${this.apiUrl}/api/analytics/createAnalytics`,{
      name: name,
    desc: desc,
    url: url,
    uploadedBy: uploadedBy,
    is_active: is_active,
    })
  }
  uploadEducation(name:any,desc:any,url:any,uploadedBy:any)
  {
    return this.http.post(`${this.apiUrl}/api/education/createEducation`,{
      name: name,
    desc: desc,
    url: url,
    uploadedBy: uploadedBy,
    type:"Article"
    })
  }
  deleteAnalytic(id)
  {
    return this.http.delete(`${this.apiUrl}/api/analytics/deleteanalytics?id=${id}`);
  }
  deleteEducation(id)
  {
    return this.http.delete(`${this.apiUrl}/api/education/deleteeducation?id=${id}`);
  }
  getAllEducation()
  {
    return this.http.get(`${this.apiUrl}/api/education/getalleducation`); 
  }
  getAllPayments()
  {
    return this.http.get(`${this.apiUrl}/api/user_payment/getAllPayments`); 
  }
  getUser() {
    return this.ls.getItem(this.APP_USER);
  }
  setSymbol(trend)
  {
      this.trends = trend;
  }
  updateSymbol(isActive,percentUp,percentDown,oneMint,twoMint,threeMint,fourMint,fiveMint,oneHalf,twoHalf,threeHalf,fourHalf,id)
  {
    return this.http.post(`${this.apiUrl}/api/symbol/updatesymbol`,{
      isActive: isActive,
      percentUp: percentUp,
      percentDown: percentDown,
      oneMint: oneMint,
      twoMint: twoMint,
      threeMint: threeMint,
      fourMint: fourMint,
      fiveMint: fiveMint,
      onehalfMint: oneHalf,
      twohalfMint: twoHalf,
      threehalfMint: threeHalf,
      fouthalfMint: fourHalf,
      id: id
    })
  }
  getSymbolData()
  {
    return this.trends;
  }
}
