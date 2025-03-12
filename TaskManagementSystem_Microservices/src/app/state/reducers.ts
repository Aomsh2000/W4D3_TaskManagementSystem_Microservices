import { createReducer, on } from '@ngrx/store'
import { addTask, completeTask, resetTasks, removeTask,editTask } from './actions'

export type Task = {
  id: string
  complete: boolean
  name: string
  isEditing?: boolean;
}
export const initialState: Task[] = []

export const listReducer = createReducer(
  initialState,
  on(addTask, (state, { task }) => [
    ...state,
    {
      id: Date.now().toString(),
      name: task.name,
      complete: task.complete,
      isEditing: false,
    },
  ]),

  on(completeTask, (state, { id }) =>
    state.map(task => (task.id === id ? { ...task, complete: true } : task)),
  ),

  on(removeTask, (state, { id }) => state.filter(task => task.id !== id)),
  on(resetTasks, () => []),
  on(editTask, (state, { id, name }) =>
    state.map(task => 
      task.id === id ? { ...task, name: name } : task
    )
  )
)