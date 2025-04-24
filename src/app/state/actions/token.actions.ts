import { createAction, props } from '@ngrx/store';

export const setToken = createAction('[Token] Set Token', props<{ token: string }>());
export const clearToken = createAction('[Token] Clear Token');
export const loadTokenFromStorage = createAction('[Token] Load Token From Storage');
export const tokenLoaded = createAction('[Token] Token Loaded', props<{ token: string | null }>());
