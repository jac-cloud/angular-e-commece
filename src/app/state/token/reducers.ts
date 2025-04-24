import { createReducer, on } from '@ngrx/store';
import * as TokenActions from './actions';

export interface TokenState {
  token: string | null;
}

export const initialState: TokenState = {
  token: null,
};

export const tokenReducer = createReducer(
  initialState,
  on(TokenActions.setToken, (state, { token }) => ({ ...state, token })),
  on(TokenActions.clearToken, state => ({ ...state, token: null })),
  on(TokenActions.tokenLoaded, (state, { token }) => ({ ...state, token })),
);
