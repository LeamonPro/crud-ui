import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../Employee';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  dataSource: Employee[] = [];
  displayedColumns: string[] = ['employeeId', 'name', 'contactNumber', 'adresse', 'departement', 
  'gender', 'skills','edit','delete'];

  constructor(private employeeService:EmployeeService,private router:Router){}
  ngOnInit(): void {
    this.getEmployees();
  }
  getEmployees():void {
    this.employeeService.getEmployees().subscribe({
      next:(res:Employee[])=>{
        this.dataSource=res;
      },
    error:(err:HttpErrorResponse)=>{
      console.log(err)
    }
  }
    )
  }
  deleteEmployee(id:number):void{
    this.employeeService.deleteEmployee(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.getEmployees();
      },
      error:(err:HttpErrorResponse)=>{
        console.log(err);
      }
    })
  }
  updateEmployee(id:number):void{
      /* this.router.navigate(['/',{employeeId: id}]) */
      console.log(id)
      this.router.navigate(['/',id]);
  }
  

}
