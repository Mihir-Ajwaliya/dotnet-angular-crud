import { Component, inject, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpService } from '../../http.service';
import { IEmployee } from '../../interfaces/employee';
import { updateEmp } from '../../interfaces/update';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [MatInputModule,MatButtonModule,RouterLink,FormsModule,ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent implements OnInit {
  formBuilder=inject(FormBuilder);
  httpService=inject(HttpService);
  router=inject(Router);
  route=inject(ActivatedRoute);
  toaster=inject(ToastrService);
  employeeForm = this.formBuilder.group({
    name:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    phone:['',[Validators.required]],
    age:['18',[Validators.required]],
    salary:['0',[Validators.required]]
  });
  employeeId!:number | null;
  isEdit=false;
  ngOnInit(){
    this.route.paramMap.subscribe({
      next: (params) => {
        this.employeeId = params.get('id') as number | null
        if(this.employeeId){
          this.isEdit=true;
          this.httpService.getEmployee(this.employeeId).subscribe({
            next: (res) => {
              this.employeeForm.patchValue({
                age: res.age.toString(),
                phone: res.phone,
                name: res.name,
                salary: res.salary.toString(),
                email: res.email
              })
              // this.employeeForm.controls.email.disable();
            }
          });
        }
      }
    });
    
  }
  save(){
    //console.log(this.employeeForm.value);
    const emp = this.employeeForm.value
      const newEmployee: IEmployee = {
        name: emp.name!,
        email: emp.email!,
        phone: emp.phone!.toString(),
        age: parseInt(emp.age!),
        salary:parseInt(emp.salary!)
        };
        
      if(this.isEdit){
        const updateEmp: updateEmp = {
          age: newEmployee.age,
          email: newEmployee.email,
          name: newEmployee.name,
          phone: newEmployee.phone,
          salary: newEmployee.salary
        }
        this.httpService.updateEmployee(this.employeeId as number,updateEmp).subscribe({
          next: (response) => {
            console.log(response);
            this.toaster.success(`Emp-id: ${response.id} Edited successfully`,"Update Successful",{
              progressBar:true,
              timeOut:1000,
            })
            this.router.navigateByUrl("/employee-list");
            
          },
          error: (error) => {
            console.log(error);
            
          }
        });  
      } 
      else{
        this.httpService.createEmployee(newEmployee).subscribe({
        next: (response) => {
          this.toaster.success(`Emp-id: ${response.id} Added successfully`,"Insert Successful",{
            progressBar:true,
            timeOut:1000,
          })
          this.router.navigateByUrl("/employee-list");
          
        },
        error: (error) => {
          console.log(error);
          
        }
      });
      }
      
    }
  }


   
