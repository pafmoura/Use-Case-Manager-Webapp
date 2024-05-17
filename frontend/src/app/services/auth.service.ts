import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';

const AUTH_URL = 'http://localhost:8000/accounts/';
const USER_TOKEN = 'user-token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    localStorage.removeItem(USER_TOKEN);
    return this.http.post(AUTH_URL + 'login', { email, password }).pipe(
      map((value) => {
        localStorage.setItem(USER_TOKEN, JSON.stringify(value));
        return of(true);
      }),
      catchError((e) => {
        console.error(e.message);
        return of(false);
      })
    );
  }

  deleteUser(id: any) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${AUTH_URL}deleteUser/${id}`, { headers });
  }

  deleteCompany(id: any) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${AUTH_URL}deleteCompany/${id}`, { headers });
  }

  loggedInInfo() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getAccessToken()}`
    });
  
    return this.http.get(AUTH_URL + 'loggedInInfo', { headers }).pipe(
      tap((value) => {
        console.log(value);
      }),
      catchError((e) => {
        console.error(e.message);
        return of(false);
      })
    );
  }

  refreshToken() {
    let item = localStorage.getItem(USER_TOKEN);
    if (!item) {
      return;
    }
    let tokens = JSON.parse(item);

    return this.http
      .post(AUTH_URL + 'refresh', { refresh: tokens.refresh })
      .pipe(
        map((value: any) => {
          tokens.access = value.access;
          localStorage.setItem(USER_TOKEN, JSON.stringify(tokens));
          return of(true);
        }),
        catchError((e) => {
          console.log(e);
          this.logout();
          return of(false);
        })
      );
  }

  isLogged(): boolean {
    return localStorage.getItem(USER_TOKEN) != null;
  }

  getAccessToken() {
    let item = localStorage.getItem(USER_TOKEN);
    if (item != null) {
      let tokens = JSON.parse(item);
      return tokens.access;
    }
  }

  getRefreshToken() {
    let item = localStorage.getItem(USER_TOKEN);
    if (item != null) {
      let tokens = JSON.parse(item);
      return tokens.refresh;
    }
  }

  logout() {
    localStorage.removeItem(USER_TOKEN);

  }


  createUser(userData: any): Observable<any> {
    
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${AUTH_URL}createUser`, userData, { headers });
  }

  createClient(clientData: any): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${AUTH_URL}createCompany`, clientData, { headers });
  }

  getUsers(): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<any>(`${AUTH_URL}getUsers`, { headers });
  }

  getClients(): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<any>(`${AUTH_URL}getCompanies`, { headers });
  }

  getLogsourcesByClient(clientName: any): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<any>(`${AUTH_URL}getLogsourcesByClient/${clientName}`, { headers });
  }

  


}

export class User {
  id: number = 0;
  username: string = '';
  email: string = '';
  date_joined: string = '';
  last_login: string = '';
  is_admin: boolean = false;
  is_active: boolean = false;
  is_staff: boolean = false;
  is_superuser: boolean = false;
  company: string | null = null;
}