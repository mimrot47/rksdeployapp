import { Component, OnInit, inject, signal } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../model/employee.model';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent implements OnInit {
  private employeeService = inject(EmployeeService);

  // Angular Signals state
  employees = signal<Employee[]>([]);
  selectedEmployee = signal<Employee | null>(null);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.isLoading.set(true);
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => {
        this.employees.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set('Failed to load employees');
        this.isLoading.set(false);
        console.error(err);
      }
    });
  }

  fetchEmployeeById(id: number): void {
    this.employeeService.getEmployeeById(id).subscribe({
      next: (data) => {
        this.selectedEmployee.set(data);
      },
      error: (err) => {
        console.error('Error fetching details:', err);
      }
    });
  }
}
