import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

import { ConfirmationService, MessageService } from 'primeng/api';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [ConfirmationService, MessageService]
})
export class EmployeeComponent implements OnInit {

  employees: any[] = [];
  employeeDialog = false;

  formData = { id: null, name: '', email: '', department: '' };

  constructor(
    private employeeService: EmployeeService,
    private confirm: ConfirmationService,
    private msg: MessageService
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe(res => {
      this.employees = res;
    });
  }

  openNew() {
    this.formData = { id: null, name: '', email: '', department: '' };
    this.employeeDialog = true;
  }

  editEmployee(emp: any) {
    this.formData = { ...emp };
    this.employeeDialog = true;
  }

  saveEmployee() {
    const action = this.formData.id
      ? this.employeeService.updateEmployee(this.formData.id, this.formData)
      : this.employeeService.createEmployee(this.formData);

    action.subscribe(() => {
      this.msg.add({
        severity: 'success',
        summary: 'Success',
        detail: this.formData.id ? 'Employee Updated' : 'Employee Created'
      });

      this.employeeDialog = false;
      this.loadEmployees();
    });
  }

  deleteEmployee(emp: any) {
    this.confirm.confirm({
      message: `Are you sure you want to delete ${emp.name}?`,
      accept: () => {
        this.employeeService.deleteEmployee(emp.id).subscribe(() => {
          this.msg.add({
            severity: 'success',
            summary: 'Deleted',
            detail: 'Employee Deleted'
          });

          this.loadEmployees();
        });
      }
    });
  }
}
