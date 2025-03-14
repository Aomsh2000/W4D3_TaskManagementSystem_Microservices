import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
  private apiUrl = 'http://localhost:5197/api/task'; 

  constructor(private http: HttpClient) { }

  GetTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  GetById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}`);
  }
}
