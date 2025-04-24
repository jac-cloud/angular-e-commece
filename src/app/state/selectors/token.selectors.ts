import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TokenState } from '../reducers/token.reducer';

export const selectTokenState = createFeatureSelector<TokenState>('token');

export const selectToken = createSelector(selectTokenState, (state: TokenState) => state.token);
