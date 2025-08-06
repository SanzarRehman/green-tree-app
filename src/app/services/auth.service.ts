import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  totalTrees: number;
  badges: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  // Dummy user data
  private dummyUser: User = {
    id: '123',
    name: 'Green Warrior',
    email: 'greenwarrior@treeplanter.com',
    avatar: 'assets/icon/tree-icon.png',
    totalTrees: 24,
    badges: ['Tree Hero', 'Eco Champion', 'Forest Guardian']
  };

  constructor() {
    // Auto-login for demo purposes
    this.currentUserSubject.next(this.dummyUser);
  }

  login(email: string, password: string): Observable<User> {
    // Simulate API call delay
    return of(this.dummyUser).pipe(delay(1000));
  }

  logout(): Observable<boolean> {
    this.currentUserSubject.next(null);
    return of(true).pipe(delay(500));
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }
}