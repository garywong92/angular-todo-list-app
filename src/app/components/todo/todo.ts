import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { TodoItem } from './todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo',
  imports: [FormsModule, NgClass],
  templateUrl: './todo.html',
  styleUrl: './todo.css'
})
export class Todo implements OnInit {
  todos: TodoItem[] = [];
  newTask: string = '';

  constructor(private todoService: TodoService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.todoService.getTasks().subscribe({
      next: (response) => {
        this.todos = response;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }

  getTasks() {
    this.todoService.getTasks().subscribe({
        next: (response) => {
          this.todos = response;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error retrieving task:', error);
        }
      });
  }
  
  addTask() {
    if (this.newTask.trim()) {
      let newTodoItem: TodoItem = {
        id: Date.now(),
        task: this.newTask.trim(),
        iscomplete: false
      };

      this.todoService.addTask(newTodoItem).subscribe({
        next: (response) => {
          // Refresh the task list and clear the input field
          this.getTasks();
          this.newTask = '';
        },
        error: (error) => {
          console.error('Error adding task:', error);
        }
      });
    }
  }

  toggleComplete(id: number) {
    let todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.iscomplete = !todo.iscomplete;
      this.todoService.updateTask(todo).subscribe({
        next: (response) => {
          // Refresh the task list
          this.getTasks();
        },
        error: (error) => {
          console.error('Error updating task:', error);
        }
      });
    }
  }

  deleteTask(id: number) {
    this.todoService.deleteTask(id).subscribe({
      next: (response) => {
        // Refresh the task list
        this.getTasks();
      },
      error: (error) => {
        console.error('Error deleting task:', error);
      }
    });
  }
}
