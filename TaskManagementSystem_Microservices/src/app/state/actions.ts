import { createAction, props } from '@ngrx/store'
import { Task } from './reducers'

export const addTask = createAction(
  '[List] Add Task',
  props<{ task: Omit<Task, 'id'> }>(),
)
export const completeTask = createAction(
  '[List] Complete Task',
  props<{ id: string }>(),
)
export const removeTask = createAction(
  '[List] Remove Task',
  props<{ id: string }>(),
)
export const resetTasks = createAction('[List] Reset')
export const editTask = createAction(
  '[List] Edit Task',
  props<{ id: string,name:string }>(),
)