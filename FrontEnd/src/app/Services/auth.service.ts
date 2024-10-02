import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<any>;
  // public currentUser: Observable<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    debugger
    const storedUser = localStorage.getItem('currentUser');
    //const initialUser = storedUser ? JSON.parse(storedUser).data : null;
    const initialUser = storedUser ? JSON.parse(storedUser) : null;
    this.currentUserSubject = new BehaviorSubject<any>(initialUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/User/Login`, { UserName: username, SystemPassword: password })
      .pipe(map(response => {
        if (response.result) {
        
          localStorage.setItem('currentUser', JSON.stringify(response.data));
        
          this.currentUserSubject.next(response.data);
          return response;
        } else {
          throw new Error(response.message || 'Login failed'); // Throw an error if login fails
        }
      }));
  }
  
  logout() {
    
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  public get currentUserId(): string {
    debugger
    const currentUser = this.currentUserValue;
    return currentUser && currentUser ? currentUser.ID || '' : '';
  }

  isAuthenticated(): boolean {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser !== null;
  }
}
