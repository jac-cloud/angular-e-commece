import { TokenEffects } from '@/state/token/effects';
import { tokenReducer } from '@/state/token/reducers';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';

export const ngrxProviders = [provideStore({ token: tokenReducer }), provideEffects([TokenEffects])];
