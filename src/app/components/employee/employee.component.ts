import { Component, OnInit } from '@angular/core';
import { Employee } from '../../Employee';
import { EmployeeService } from '../../services/employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit{
  employee:any;
  skills:String[]=[];
  isCreatedEmployee:boolean=false;
  constructor(private employeeService:EmployeeService, private router:Router,
    private activeRouter:ActivatedRoute){

  }
  ngOnInit(): void {
    this.employee=this.activeRouter.snapshot.data['employeeResolver'];
    if(this.employee && this.employee.employeeId>0){
      this.isCreatedEmployee=true;
      if (this.employee.skills != '') {
        this.skills = [];
        this.skills = this.employee.skills.split(',');
      }
    }
  }
  selectGender(gender:String){
    this.employee.gender=gender;
  }
  checkSkills(skill: string) {
    return this.employee.skills != null && this.employee.skills.includes(skill);
  }
  checkGender(gender: string) {
    return this.employee.gender != null && this.employee.gender == gender;
  }
  onSkillsChanges(event: any): void {
    console.log(event);
    if (event.checked) {
      this.skills.push(event.source.value);
    } else {
      this.skills.forEach(
        (item, index) => {
          if (item == event.source.value) {
            this.skills.splice(index, 1);
          }
        }
      );
    }

    this.employee.skills = this.skills.toString();
  }
  onSubmit(employeeForm:NgForm){
    if(this.isCreatedEmployee){
      this.employeeService.updateEmployee(this.employee,this.employee.employeeId).subscribe({
        next:(res:Employee)=>{
          console.log(res);
          employeeForm.reset();
          this.employee.gender = '';
          this.skills = [];
          this.employee.skills = '';
          this.router.navigate(["/employee-list"]);
        },
        error:(err:HttpErrorResponse)=>{
          console.log(err);
        }
      })
    }
    else{
    this.employeeService.addEmployee(this.employee).subscribe({
      next:(res:Employee)=>{
        console.log(res);
        employeeForm.reset();
        this.employee.gender = '';
        this.skills = [];
        this.employee.skills = '';
        this.router.navigate(["/employee-list"]);
      },
      error:(err:HttpErrorResponse)=>{
        console.log(err);
      }
    })
  }
}

}
