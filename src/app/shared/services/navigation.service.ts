import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface IMenuItem {
  type: string; // Possible values: link/dropDown/icon/separator/extLink
  name?: string; // Used as display text for item and title for separator type
  state?: string; // Router state
  icon?: string; // Material icon name
  svgIcon?: string; // UI Lib icon name
  tooltip?: string; // Tooltip text
  disabled?: boolean; // If true, item will not be appeared in sidenav.
  sub?: IChildItem[]; // Dropdown items
  badges?: IBadge[];
}
interface IChildItem {
  type?: string;
  name: string; // Display text
  state?: string; // Router state
  icon?: string;  // Material icon name
  svgIcon?: string; // UI Lib icon name
  sub?: IChildItem[];
}

interface IBadge {
  color: string; // primary/accent/warn/hex color codes(#fff000)
  value: string; // Display text
}

@Injectable()
export class NavigationService {
  iconMenu: IMenuItem[] = [

    // {
    //   name: 'Blank',
    //   type: 'link',
    //   icon: 'list',
    //   state: 'others/blank'
    // },
    {
      name: 'All Users',
      type: 'link',
      icon: 'list',
      state: 'admin/all-users'
    },
    {
      name: 'Contact Us List',
      type: 'link',
      icon: 'list',
      state: 'admin/contactus-list'
    },
    {
      name: 'Deals',
      type: 'link',
      icon: 'list',
      state: 'admin/transactions-list'
    },
    {
      name: 'Withdrawal Requests',
      type: 'link',
      icon: 'list',
      state: 'admin/withdrawal-list'
    },
    {
      name: 'Trends',
      type: 'link',
      icon: 'list',
      state: 'admin/trends'
    },
    {
      name: 'Analytics',
      type: 'link',
      icon: 'list',
      state: 'admin/analytics'
    },
    {
      name: 'Education',
      type: 'link',
      icon: 'list',
      state: 'admin/education'
    },
    {
      name: 'Deposit',
      type: 'link',
      icon: 'list',
      state: 'admin/deposit'
    },
    // {
    //   name: 'ADMIN',
    //   type: 'dropDown',
    //   tooltip: 'Admin',
    //   icon: 'dashboard',
    //   state: 'admin',
    //   sub: [
    //     { name: 'Analytics', state: 'analytics' },
    //     { name: 'Users', state: 'all-users' },
    //     // { name: 'Cargo Receipt', state: 'list' },
    //     // { name: 'Cargo Gate Pass', state: 'gatepasslist' },
    //     // { name: 'Drivers', state: 'drivers' },
    //     // {name: 'Learning Management', state: 'learning-management'},
    //     // { name: 'Analytics Alt', state: 'analytics-alt' },
    //     // { name: 'Cryptocurrency', state: 'crypto' },
    //     // { name: 'Dark Cards', state: 'dark' }
    //   ]
    // },
    // {
    //   name: 'DOC',
    //   type: 'extLink',
    //   tooltip: 'Documentation',
    //   icon: 'library_books',
    //   state: 'http://demos.ui-lib.com/egret-doc/'
    // }
  ];

  // Icon menu TITLE at the very top of navigation.
  // This title will appear if any icon type item is present in menu.
  iconTypeMenuTitle = 'Frequently Accessed';
  // sets iconMenu as default;
  menuItems = new BehaviorSubject<IMenuItem[]>(this.iconMenu);
  // navigation component has subscribed to this Observable
  menuItems$ = this.menuItems.asObservable();
  constructor() {}

  // Customizer component uses this method to change menu.
  // You can remove this method and customizer component.
  // Or you can customize this method to supply different menu for
  // different user type.
  publishNavigationChange(menuType: string) {
    // switch (menuType) {
    //   case 'separator-menu':
        // this.menuItems.next(this.separatorMenu);
        // break;
    //   case 'icon-menu':
        this.menuItems.next(this.iconMenu);
        // break;
    //   default:
        // this.menuItems.next(this.plainMenu);
    // }
  }
}
