import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { EmployeeService } from "./services/employee.service";
import { inject } from "@angular/core";
import { Observable, of } from "rxjs";
import { Employee } from "./Employee";

export const EmployeeResolver:ResolveFn<any>=
    (route:ActivatedRouteSnapshot,
        state:RouterStateSnapshot,
        employeeService:EmployeeService=inject(EmployeeService)):Observable<Employee> =>{
            const employeeId=route.paramMap.get("id");
            if(employeeId){
                return employeeService.getEmployee(Number(employeeId));
            } else {
                const employee:Employee ={
                    employeeId:0,
                    contactNumber:"",
                    name:"",
                    adresse:"",
                    departement:"",
                    gender:"",
                    skills:""
                }
                return of(employee);
            }
        }
        