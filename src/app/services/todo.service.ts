import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { TodoItem } from '../components/todo/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:5005/api/todo';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(this.apiUrl).pipe(
      catchError((error: any) => {
        console.error('An error occurred while communicating with the server:', error);
        return throwError(() => new Error('Something went wrong; please try again later.'));
      })
    );
  }

  addTask(task: TodoItem): Observable<TodoItem> {
    return this.http.post<TodoItem>(`${this.apiUrl}/add`, task).pipe(
      catchError((error: any) => {
        console.error('An error occurred while communicating with the server:', error);
        return throwError(() => new Error('Something went wrong; please try again later.'));
      })
    );
  }

  updateTask(task: TodoItem): Observable<TodoItem> {
    return this.http.post<TodoItem>(`${this.apiUrl}/update`, task).pipe(
      catchError((error: any) => {
        console.error('An error occurred while communicating with the server:', error);
        return throwError(() => new Error('Something went wrong; please try again later.'));
      })
    );
  }

  deleteTask(id: number): Observable<number> {
    return this.http.delete<number>(`${this.apiUrl}/delete?id=${id}`).pipe(
      catchError((error: any) => {
        console.error('An error occurred while communicating with the server:', error);
        return throwError(() => new Error('Something went wrong; please try again later.'));
      })
    );
  }
}
