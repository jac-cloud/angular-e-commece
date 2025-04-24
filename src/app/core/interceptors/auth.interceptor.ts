import { clearToken } from '@/state/actions/token.actions';
import { selectToken } from '@/state/selectors/token.selectors';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  let tokenValue: string | null = null;
  store
    .select(selectToken)
    .subscribe(token => (tokenValue = token))
    .unsubscribe();

  if (tokenValue && !req.headers.has('Authorization')) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${tokenValue}`,
      },
    });
  }

  return next(req).pipe(
    tap({
      error: err => {
        if (err.status === 401) {
          store.dispatch(clearToken());
        }
      },
    }),
  );
};
