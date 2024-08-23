import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnalyticsComponent } from './analytics/analytics.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { UploadEducationComponent } from './upload-education/upload-education.component';
import { ContactusListComponent } from './contactus-list/contactus-list.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { WithdrawalRequestComponent } from './withdrawal-request/withdrawal-request.component';
import { TrendsComponent } from './trends/trends.component';
import { DealsComponent } from './deals/deals.component';
import { UploadAnalyticsComponent } from './upload-analytics/upload-analytics.component';
import { EducationComponent } from './education/education.component';
import { UserDepositComponent } from './user-deposit/user-deposit.component';

export const AdminRoutingModule: Routes = [{ 
    path: '',
    children: [
      {
        path: 'analytics',
        component: AnalyticsComponent,
        data: { title: 'Analytics', breadcrumb: 'ANALYTICS' }
      },
      {
        path: 'upload-analytics',
        component: UploadAnalyticsComponent,
        data: { title: 'Upload Analytics', breadcrumb: 'ANALYTICS' }
      },
      {
        path: 'all-users',
        component: AllUsersComponent,
        data: { title: 'All Users', breadcrumb: 'USERS' }
      },
      {
        path: 'education',
        component: EducationComponent,
        data: { title: 'Education', breadcrumb: 'EDUCATION' }
      },
      {
        path: 'upload-education',
        component: UploadEducationComponent,
        data: { title: 'Upload Education', breadcrumb: 'EDUCATION' }
      },
      {
        path: 'contactus-list',
        component: ContactusListComponent,
        data: { title: 'Contact Us List', breadcrumb: 'Contact Us' }
      },
      {
        path: 'transactions-list',
        component: TransactionsComponent,
        data: { title: 'Deals', breadcrumb: 'Deals' }
      },
      {
        path: 'withdrawal-list',
        component: WithdrawalRequestComponent,
        data: { title: 'Withdrawal Requests', breadcrumb: 'Withdrawal Requests' }
      },
      {
        path: 'trends',
        component: TrendsComponent,
        data: { title: 'Trends', breadcrumb: 'Trends' }
      },
      {
        path: 'edit-trends',
        component: DealsComponent,
        data: { title: 'Edit', breadcrumb: 'Edit'}
      },
      {
        path: 'deposit',
        component: UserDepositComponent,
        data: { title: 'Deposit', breadcrumb: 'Deposit' }
      },
    ]
}]  