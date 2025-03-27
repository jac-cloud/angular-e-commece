import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { switchMap, tap } from 'rxjs';
import { TokenService } from '../services/token.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);

  return tokenService.token$.pipe(
    switchMap(token => {
      if (token && !req.headers.has('Authorization')) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      return next(req).pipe(
        tap({
          error: err => {
            if (err.status === 401) {
              tokenService.clearToken();
            }
          },
        }),
      );
    }),
  );
};
