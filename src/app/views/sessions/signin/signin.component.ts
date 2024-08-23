import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { JwtAuthService } from '../../../shared/services/auth/jwt-auth.service';
import { SessionService } from '../sessions.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  signinForm: FormGroup;
  errorMsg = '';
  // return: string;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private jwtAuth: JwtAuthService,
    private egretLoader: AppLoaderService,
    private router: Router,
    private route: ActivatedRoute,
    private ss : SessionService
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.checkUser();
    this.signinForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(true)
    });
    // this.route.queryParams
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe(params => this.return = params['return'] || '/');
  }

  ngAfterViewInit() {
  // this.autoSignIn();
  }
  checkUser()
  {
    let x =  JSON.parse(localStorage.getItem('EGRET_USER'));
    if(x && x.userRoll == 'admin')
    {
      this.router.navigate(['/admin/all-users']);
    }
  }
  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  signin() {
    const signinData = this.signinForm.value

    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate';
    // this.ss.signIn(signinData.username, signinData.password).subscribe((res:any)=>{
    //   localStorage.setItem('JWT_TOKEN',res.token);
    //   localStorage.setItem('EGRET_USER', JSON.stringify(res));
    //   this.router.navigate(['/admin/all-users']);
    // }, err => {
    //     this.submitButton.disabled = false;
    //     this.progressBar.mode = 'determinate';
    //     this.errorMsg = err.message;
    //   })   
    this.jwtAuth.signin(signinData.username, signinData.password)
    .subscribe(response => {
      //this.router.navigateByUrl(this.jwtAuth.return);
      this.router.navigate(['/admin/all-users']);
      }, err => {
      this.submitButton.disabled = false;
      this.progressBar.mode = 'determinate';
      this.errorMsg = err.message;
      // console.log(err);
    })
  }

  autoSignIn() {    
    if(this.jwtAuth.return === '/') {
      return
    }
    this.egretLoader.open(`Automatically Signing you in! \n Return url: ${this.jwtAuth.return.substring(0, 20)}...`, {width: '320px'});
    setTimeout(() => {
      this.checkUser();
      console.log('autoSignIn');
      this.egretLoader.close()
    }, 2000);
  }

}
