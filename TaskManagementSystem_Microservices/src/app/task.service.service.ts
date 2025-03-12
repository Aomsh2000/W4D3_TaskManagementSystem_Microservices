import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Task {
  id: string;
  name: string;
  complete: boolean;
  isEditing:boolean;
}
@Injectable({
  providedIn: 'root'
})

export class TaskServiceService {

  private apiUrl = 'http://localhost:5197/api/task';  // Task API URL

  constructor(private http: HttpClient) {}

  // Get all tasks
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  // Get a single task by ID
  getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  // Create a new task
  createTask(task: Task): Observable<any> {
    return this.http.post(this.apiUrl, task);
  }

  // Update an existing task
  updateTask(task: Task): Observable<any> {
    return this.http.put(this.apiUrl, task);
  }

  // Delete a task by ID
  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
