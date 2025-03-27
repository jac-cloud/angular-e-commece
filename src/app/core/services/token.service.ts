import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));

  get token$(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.tokenSubject.next(token);
  }

  clearToken() {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
  }
}
