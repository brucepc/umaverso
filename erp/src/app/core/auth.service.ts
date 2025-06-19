import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User, authState } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  
  public readonly currentUser: Observable<User | null> = authState(this.auth);

  constructor() {}

  // Login a user
  login = (email: string, password: string): Promise<any> => {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // Logout the current user
  logout = (): Promise<void> => {
    return signOut(this.auth);
  }
  
  // Register a new user
  register = (email: string, password: string): Promise<any> => {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }
} 