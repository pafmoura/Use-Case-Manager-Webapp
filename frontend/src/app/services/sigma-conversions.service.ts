import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const AUTH_URL = 'http://localhost:8000/sigmaconversions/';

@Injectable({
  providedIn: 'root'
})



export class SigmaConversionsService {



  constructor(private http: HttpClient) {}


  convertSigmaToSplunk(rule : any) {
    return this.http.post(`${AUTH_URL}convertSigmaToSplunk`, {rule: rule})
  }

  convertSigmaToQRadar(rule : any) {
    return this.http.post(`${AUTH_URL}convertSigmaToQRadar`, {rule: rule})
  }

  convertSigmaToElasticLucena(rule : any) {
    return this.http.post(`${AUTH_URL}convertSigmaToElasticLucena`, {rule: rule})
  }
}


