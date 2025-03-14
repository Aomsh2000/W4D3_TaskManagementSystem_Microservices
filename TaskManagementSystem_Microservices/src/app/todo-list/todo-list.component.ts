import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Task } from '../store/reducers';
import { Store } from '@ngrx/store';
import { selectAllTodos, selectCompletedTodos, selectIncompleteTodos,selectTaskError } from '../store/selectors';
import { addTask, completeTask, removeTask, resetTasks,editTask,loadTask } from '../store/actions';
import { TaskServiceService } from '../task.service.service';
import { Injectable, inject } from '@angular/core';

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
  taskApi = inject(TaskServiceService);
  error!: Observable<string | null>;
  constructor(private fb: FormBuilder, private store: Store) {
    // Initializing Observables
   //this.todos$ = this.store.select(selectAllTodos);
    this.completedTodos$ = this.store.select(selectCompletedTodos);
    this.incompleteTodos$ = this.store.select(selectIncompleteTodos);
    this.store.dispatch(loadTask());
    this.todos$ = this.store.select(selectAllTodos);
    this.error = this.store.select(selectTaskError);
  }

  ngOnInit(): void {
    // Initialize FormGroup in ngOnInit
    this.todoForm = this.fb.group({
      name: new FormControl('', [Validators.minLength(2), Validators.required]),
    });
       // Log tasks whenever they change
       this.todos$.subscribe(tasks => {
        console.log('Updated tasks after state change:');
        tasks.forEach(task => console.log(`Task ID: ${task.id}, Name: ${task.name}`));
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
    
    editTask(id: string): void {

          
        // Get the todo element by id
        const todoName = document.getElementById(`todo-name-${id}`) as HTMLInputElement;
        
        // Check if the todoName exists and get its value
        if (todoName) {
          const oldTitle = todoName.value; // Get the current value of the todo input
          const newTitle = prompt("Enter new title:", oldTitle); // Use oldTitle as the default in the prompt
    
          // If the user enters a new title and it's not null
          if (newTitle  &&  newTitle.trim().length >= 2){
            this.store.dispatch(editTask({ id, name: newTitle }));
            
          }
          else if (newTitle === null) {
              // Handle the case when the user presses "Cancel"
              console.log('User canceled the edit operation');
            } else if (newTitle.trim().length < 2) {
              // Handle the case where the newTitle is too short
              console.log('Title should be at least 2 characters');
            }
        }
      
    }
    

   
  }

