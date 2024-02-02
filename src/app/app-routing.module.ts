import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeResolver } from './EmployeeResolver';

const routes: Routes = [
  {path:'header', component:HeaderComponent},
  {path: '' , component: EmployeeComponent,resolve:{employeeResolver:EmployeeResolver} },
  {path:'employee-list', component:EmployeeListComponent},
  {path:':id',component:EmployeeComponent,resolve:{employeeResolver:EmployeeResolver}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
