import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import {listReducer} from './state/reducers'
import {provideStore} from '@ngrx/store'
export const appConfig: ApplicationConfig = {
  providers: [provideStore({todos:listReducer}),provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay())]
};
