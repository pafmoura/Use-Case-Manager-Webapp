import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const AUTH_URL = 'http://localhost:8000/usecases/';


@Injectable({
  providedIn: 'root'
})
export class UsecasesService {

  constructor(private http: HttpClient) {}

  createUseCase(useCase: any) {
    return this.http.post<any>(`${AUTH_URL}createUseCase`, useCase);
  }

  



}
