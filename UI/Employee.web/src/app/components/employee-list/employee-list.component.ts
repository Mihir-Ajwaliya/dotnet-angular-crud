import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { IEmployee } from '../../interfaces/employee';
import { HttpService } from '../../http.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'] // Fix styleUrl to styleUrls
})
export class EmployeeListComponent implements OnInit {
  // ngOnDestroy(): void {
  //   this.router.navigateByUrl("employee/");
  // }
  
  employeeList: IEmployee[] = [];
  httpService = inject(HttpService);
  router = inject(Router);
  toaster = inject(ToastrService);
  displayedColumns: string[] = ['id', 'name', 'email', 'age', 'phone', 'salary', 'action'];

  ngOnInit() {
    this.httpService.getAllEmployee().subscribe((result) => {
      this.employeeList = result;
    });
  }

  edit(id: number) {
    this.router.navigateByUrl("/employee/" + id);
  }

  delete(id: number) {
    this.httpService.deleteEmployee(id).subscribe({
      next: (res) => {
        if(res !== null) {
          this.employeeList = this.employeeList.filter((emp) => emp.id !== res.id)
          this.toaster.success(`Emp-id: ${res.id} deleted successfully`,"Delete Successful",{
            progressBar:true,
            timeOut:1000,
          })
          this.router.navigateByUrl("/")
        }
      },
      error: (error) => {
        this.toaster.error(`${error.message}`,"unable to delete employee")
      }
    });
  }
  
}
