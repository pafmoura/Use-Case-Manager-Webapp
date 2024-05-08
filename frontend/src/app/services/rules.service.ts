import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const AUTH_URL = 'http://localhost:8000/rules/';

@Injectable({
  providedIn: 'root'
})



export class RulesService {



  constructor(private http: HttpClient) {}


  createRuleModel(ruleModel : any) {
    return this.http.post(`${AUTH_URL}createRuleModel`, ruleModel)
  }

  getRuleModels() {
    return this.http.get(`${AUTH_URL}getRuleModels`)
  }

  getRuleModelsByUseCase(useCaseId: number) {
    return this.http.get(`${AUTH_URL}getRuleModelsByUseCase/${useCaseId}`)
  }

}
