import {NgModule} from '@angular/core';

import {SharedModule} from '@shared/shared.module';
import {RouteRoutingModule} from './routes-routing.module';
// dashboard pages
// passport pages
import {UserLoginComponent} from './passport/login/login.component';

import {CallbackComponent} from './callback/callback.component';
import {Exception403Component} from './exception/403.component';
import {Exception404Component} from './exception/404.component';
import {Exception500Component} from './exception/500.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {UserComponent} from './user/user.component';

const COMPONENTS = [
  // passport pages
  UserLoginComponent,
  CallbackComponent,
  DashboardComponent,
  UserComponent,
  Exception403Component,
  Exception404Component,
  Exception500Component,
];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [SharedModule, RouteRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT
})
export class RoutesModule {
}
