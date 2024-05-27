import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const AUTH_URL = 'http://localhost:8000/usecases/';


@Injectable({
  providedIn: 'root'
})
export class UsecasesService {

  constructor(private http: HttpClient) {}

  createUseCase(useCase: FormData) {
    return this.http.post<any>(`${AUTH_URL}createUseCase`, useCase, {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data'
      })
    });
  }


  getUseCases() {
    return this.http.get<any>(`${AUTH_URL}getUseCases`);

  }

  deleteUseCase(id: number) {
    return this.http.post<any>(`${AUTH_URL}deleteUseCase/${id}`,{});
  }

  getUseCaseById(id: number) {
    return this.http.get<any>(`${AUTH_URL}getUseCaseById/${id}`);
  }

  updatePhaseTasks(id: number, phaseTasks: any) {
    return this.http.post<any>(`${AUTH_URL}updatePhaseTasks/${id}`, phaseTasks);
  }

  updateUseCase(id: number, useCase: any) {
    return this.http.post<any>(`${AUTH_URL}updateUseCase/${id}`, useCase);
  }

  getTechniqueTacticBasedOnListIds(ids: any) {
    return this.http.get<any>(`${AUTH_URL}getTechniqueTacticBasedOnListIds/?ids=`+ids.join(',') );
  }
  

  



}
