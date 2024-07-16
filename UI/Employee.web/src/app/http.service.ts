// import { HttpClient } from '@angular/common/http';
// import { inject, Injectable } from '@angular/core';
// import { IEmployee } from './interfaces/employee';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class HttpService {

//   http=inject(HttpClient);
//   constructor() { }

//   getAllEmployee():Observable<IEmployee[]>{
//     return this.http.get<IEmployee[]>("https://localhost:7077/API/Employee")
//   }
//   createEmployee(newEmployee:IEmployee):Observable<any>{
//     return this.http.post<IEmployee>("https://localhost:7077/API/Employee",newEmployee)
//   }
  
// }
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployee } from './interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getAllEmployee(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>("https://localhost:7077/API/Employee");
  }

  createEmployee(newEmployee: IEmployee): Observable<IEmployee> {
    //console.log(newEmployee);
    
    return this.http.post<IEmployee>("https://localhost:7077/API/Employee", newEmployee);
  }
  getEmployee(employeeId:number): Observable<IEmployee> {
    return this.http.get<IEmployee>(`https://localhost:7077/API/Employee/${employeeId}`);
  }
  updateEmployee(employeeId:number,employee:IEmployee): Observable<IEmployee> {
    return this.http.put<IEmployee>(`https://localhost:7077/API/Employee/${employeeId}`,employee);
  }
  deleteEmployee(employeeId:number): Observable<IEmployee> {
    return this.http.delete<IEmployee>(`https://localhost:7077/API/Employee/${employeeId}`);
  }
}
