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

  getRules() {
    return this.http.get(`${AUTH_URL}getRules`)
  }

  getRuleModelsByUseCase(useCaseId: number) {
    return this.http.get(`${AUTH_URL}getRuleModelsByUseCase/${useCaseId}`)
  }

  getRuleModelById(id: number) {
    return this.http.get(`${AUTH_URL}getRuleModelById/${id}`)
  }

  deleteRuleModelById(id: number) {
    return this.http.post(`${AUTH_URL}deleteRuleModelById/${id}`, id)
  }

  createRule(rule : any) {
    return this.http.post(`${AUTH_URL}createRule`, rule)
  }

  getRuleById(id: number) {
    return this.http.get(`${AUTH_URL}getRuleById/${id}`)
  }

 
}
