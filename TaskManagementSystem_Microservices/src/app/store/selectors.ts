import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Task,TaskState } from './reducers'

export const selectTodoState = createFeatureSelector<TaskState>('tasks');

export const selectAllTodos = createSelector(
  selectTodoState,
  (state: TaskState) => state.tasks,
)

export const selectCompletedTodos = createSelector(
  selectAllTodos,
  (todos: Task[]) => todos.filter(todo => todo.complete),
)

export const selectIncompleteTodos = createSelector(
  selectAllTodos,selectAllTodos,
  (todos: Task[]) => todos.filter(todo => !todo.complete),
)


export const selectTaskError = createSelector(
  selectTodoState,
  (state: TaskState) => state.error
);
