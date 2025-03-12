import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Task } from '../state/reducers';
import { Store } from '@ngrx/store';
import { selectAllTodos, selectCompletedTodos, selectIncompleteTodos } from '../state/selectors';
import { addTask, completeTask, removeTask, resetTasks,editTask } from '../state/actions';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'] // Corrected to styleUrls
})
export class TodoListComponent implements OnInit {
  todoForm!: FormGroup; // Declare FormGroup here
  editForm!: FormGroup; 
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
 /*  toggleEdit(todo: Task): void {
  const todoName = document.getElementById(`todo-name-${todo.id}`);
  const editForm = document.getElementById(`editform-${todo.id}`);

  // Toggle visibility based on the current state
  if (todoName && editForm) {
    if (todoName.style.display === 'none') {
      todoName.style.display = 'block';
      editForm.style.display = 'none';
      todo.isEditing = true;
    } else {
      todoName.style.display = 'none';
      editForm.style.display = 'block';
      todo.isEditing = false;
    }
  }
    // Initialize the edit form with the current task name
    if (todo.isEditing) {
      this.editForm = this.fb.group({
        name: new FormControl(todo.name, [Validators.minLength(2), Validators.required]),
      });
    }
  } */
    toggleEdit(todo: Task): void {
      // Toggle the editing state of the task
      todo.isEditing = !todo.isEditing;
      const todoName = document.getElementById(`todo-name-${todo.id}`);
      const editForm = document.getElementById(`editform-${todo.id}`);
    
      // Toggle visibility based on the current state
      if (todoName && editForm) {
        if (todoName.style.display === 'none') {
          todoName.style.display = 'block';
          editForm.style.display = 'none';

        } else {
          todoName.style.display = 'none';
          editForm.style.display = 'block';
         
        }
      }
      // Initialize the edit form with the current task name
      if (todo.isEditing) {
        this.editForm = this.fb.group({
          name: new FormControl(todo.name, [Validators.minLength(2), Validators.required]),
        });
      }
    }
  editTodo(id: string): void {
    if (this.editForm.valid) {
      console.log('Form Value:', this.editForm.value);
      const updatedName = this.editForm.value.name;
      this.store.dispatch(editTask({ id, name: updatedName }));
  
     
   
    }
  }

  /* toggleEdit(): void {
    // Find the elements you want to toggle
    const todoName = document.getElementById(`todo-name`);
    const editForm = document.getElementById(`editform`);

    // Toggle visibility based on the current state
    if (todoName && editForm) {
      if (todoName.style.display === 'none') {
        todoName.style.display = 'block';
        editForm.style.display = 'none';
      } else {
        todoName.style.display = 'none';
        editForm.style.display = 'block';
      }
    }
  }

  editTodo(id: string, name: string): void {
    // Dispatch the editTask action with the updated name
    this.store.dispatch(editTask({ id, name }));
  } */
}
