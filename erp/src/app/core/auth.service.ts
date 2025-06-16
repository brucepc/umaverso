import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  
  // Observable to get the current user
  public readonly currentUser: Observable<User | null>;

  constructor() {
    this.currentUser = new Observable(subscriber => {
      const unsubscribe = onAuthStateChanged(this.auth, user => {
        subscriber.next(user);
      });
      // Unsubscribe when the observable is unsubscribed
      return unsubscribe;
    });
  }

  // Login a user
  login(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // Logout the current user
  logout(): Promise<void> {
    return signOut(this.auth);
  }
  
  // Register a new user
  register(email: string, password: string): Promise<any> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }
} 