import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideStore,provideState } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { listReducer } from './store/reducers';
import { TaskEffect } from './store/effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({ tasks: listReducer }), // Register your store
    provideEffects(TaskEffect), 
    //provideState({ name: 'tasks', reducer: listReducer }),
    provideHttpClient(), // Provide HttpClient for HTTP requests
    provideRouter(routes), // Provide the router configuration
    provideClientHydration(withEventReplay()), // Enable client hydration
  ],
};