import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class SessionService {
    apiUrl: any = environment.apiURL;
    constructor(
        private http: HttpClient
      ) {}    

    signIn(username:any,password:any)
    {
       return this.http.post(`${this.apiUrl}/api/user/login`,{email:username, password:password})
    }
}