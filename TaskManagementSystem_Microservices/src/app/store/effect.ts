import { Injectable, inject } from '@angular/core';
import { TaskServiceService } from '../task.service.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TaskActions from './actions';
import { catchError, map, of, switchMap } from 'rxjs';
@Injectable()
export class TaskEffect {
  private api = inject(TaskServiceService);
  action$ = inject(Actions);

  loadProducts$ = createEffect(() =>
    this.action$.pipe(
      ofType(TaskActions.loadTask),
      switchMap(() =>
        this.api.GetTasks().pipe(
          map((res) => TaskActions.loadTaskSuccess({ tasks: res })),
          catchError((error: { message: string }) =>
            of(
                TaskActions.loadTaskFailure({
                errorMessage: 'Fail to load products',
              })
            )
          )
        )
      )
    )
  );
}