import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeListComponent } from './component/employee-list.component/employee-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EmployeeListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('rksdeployapp');
}
