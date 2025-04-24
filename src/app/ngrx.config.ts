import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { TokenEffects } from './state/effects/token.effects';
import { tokenReducer } from './state/reducers/token.reducer';

export const ngrxProviders = [provideStore({ token: tokenReducer }), provideEffects([TokenEffects])];
