import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { RoleManagementComponent } from './role-management/role-management.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    RoleManagementComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
