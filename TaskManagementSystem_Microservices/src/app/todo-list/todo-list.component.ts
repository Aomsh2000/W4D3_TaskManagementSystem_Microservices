import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Task } from '../state/reducers';
import { Store } from '@ngrx/store';
import { selectAllTodos, selectCompletedTodos, selectIncompleteTodos } from '../state/selectors';
import { addTask, completeTask, removeTask, resetTasks } from '../state/actions';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'] // Corrected to styleUrls
})
export class TodoListComponent implements OnInit {
  todoForm!: FormGroup; // Declare FormGroup here
  todos$: Observable<Task[]>; // Observable for all tasks
  completedTodos$: Observable<Task[]>; // Observable for completed tasks
  incompleteTodos$: Observable<Task[]>; // Observable for incomplete tasks

  constructor(private fb: FormBuilder, private store: Store) {
    // Initializing Observables
    this.todos$ = this.store.select(selectAllTodos);
    this.completedTodos$ = this.store.select(selectCompletedTodos);
    this.incompleteTodos$ = this.store.select(selectIncompleteTodos);
  }

  ngOnInit(): void {
    // Initialize FormGroup in ngOnInit
    this.todoForm = this.fb.group({
      name: new FormControl('', [Validators.minLength(2), Validators.required]),
    });
  }

  onSubmit() {

    this.todoForm?.reset(); 
  }

  addTodo(): void {
    if (this.todoForm?.valid) {
      this.store.dispatch(
        addTask({
          task: {
            name: this.todoForm.value.name,
            complete: false,
          },
        })
      );
      this.todoForm.reset(); // Reset form after adding the task
    }
  }

  completeTodo(id: string): void {
    // Dispatch action to mark task as complete
    this.store.dispatch(completeTask({ id }));
  }

  removeTodo(id: string): void {
    // Dispatch action to remove task
    this.store.dispatch(removeTask({ id }));
  }

  resetAllTodos(): void {
    // Dispatch action to reset all tasks (if implemented)
    this.store.dispatch(resetTasks());
  }
}
