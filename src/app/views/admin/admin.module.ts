import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdminRoutingModule } from './admin-routing.module';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { ChartsModule } from 'ng2-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { FileUploadModule } from 'ng2-file-upload';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';

import { AllUsersComponent } from './all-users/all-users.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { WithdrawalRequestComponent } from './withdrawal-request/withdrawal-request.component';
import { ContactusListComponent } from './contactus-list/contactus-list.component';
import { UploadEducationComponent } from './upload-education/upload-education.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { TrendsComponent } from './trends/trends.component';
import { DealsComponent } from './deals/deals.component';

import { AdminService } from './admin.service';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditTransactionComponent } from './edit-transaction/edit-transaction.component';
import { UploadAnalyticsComponent } from './upload-analytics/upload-analytics.component';
import { EducationComponent } from './education/education.component';
import { AnalyticsPopupComponent } from './analytics-popup/analytics-popup.component';
import { UserDepositComponent } from './user-deposit/user-deposit.component';
import { TransactionPopupComponent } from './transaction-popup/transaction-popup.component';

@NgModule({
  declarations: [
    AllUsersComponent,
    TransactionsComponent,
    WithdrawalRequestComponent,
    ContactusListComponent,
    UploadEducationComponent,
    AnalyticsComponent,
    TrendsComponent,
    DealsComponent,
    EditUserComponent,
    EditTransactionComponent,
    UploadAnalyticsComponent,
    EducationComponent,
    AnalyticsPopupComponent,
    UserDepositComponent,
    TransactionPopupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatButtonModule,
    MatChipsModule,
    MatListModule,
    MatTabsModule,
    MatTableModule,
    MatGridListModule,
    FlexLayoutModule,
    ChartsModule,
    NgxEchartsModule.forRoot({
      echarts
    }),
    NgApexchartsModule,
    NgxDatatableModule,
    SharedPipesModule,
    FileUploadModule,
    MatCheckboxModule,
    MatInputModule,
    MatRadioModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    RouterModule.forChild(AdminRoutingModule),
  ],
  providers: [AdminService],

})
export class AdminModule { }
