import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import * as TokenActions from '../actions/token.actions';

@Injectable()
export class TokenEffects {
  loadToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TokenActions.loadTokenFromStorage),
      map(() => {
        const token = localStorage.getItem('token');
        return TokenActions.tokenLoaded({ token });
      }),
    ),
  );

  setToken$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TokenActions.setToken),
        tap(({ token }) => localStorage.setItem('token', token)),
      ),
    { dispatch: false },
  );

  clearToken$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TokenActions.clearToken),
        tap(() => localStorage.removeItem('token')),
      ),
    { dispatch: false },
  );

  constructor(private actions$: Actions) {}
}
