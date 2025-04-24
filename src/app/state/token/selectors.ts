import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TokenState } from './reducers';

export const selectTokenState = createFeatureSelector<TokenState>('token');

export const selectToken = createSelector(selectTokenState, (state: TokenState) => state.token);
