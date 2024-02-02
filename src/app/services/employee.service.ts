import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../Employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl="http://localhost:9090"

  constructor(private http:HttpClient) { }

  addEmployee(employee:Employee):Observable<Employee>{
    return this.http.post<Employee>(`${this.apiUrl}/employee/`,employee);

  }
  getEmployees():Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.apiUrl}/employee/`);
  }
  deleteEmployee(id:number){
    return this.http.delete(`${this.apiUrl}/employee/id/${id}`);
  }

  getEmployee(id:number):Observable<Employee>{
    return this.http.get<Employee>(`${this.apiUrl}/employee/id/${id}`);
  }

  updateEmployee(employee:Employee,id:number):Observable<Employee>{
    return this.http.put<Employee>(`${this.apiUrl}/employee/id/${id}`,employee);
  }
}
