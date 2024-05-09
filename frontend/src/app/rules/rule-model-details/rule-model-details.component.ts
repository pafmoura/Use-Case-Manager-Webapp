import { Component } from '@angular/core';
import { RulesService } from '../../services/rules.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HeaderComponent } from "../../layout/header/header.component";
import { TitlebannerComponent } from "../../layout/titlebanner/titlebanner.component";
import { UsecasesService } from '../../services/usecases.service';
import { CodeEditorComponent, CodeEditorModule, CodeModel, CodeModelChangedEvent } from '@ngstack/code-editor';
import {Clipboard} from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-rule-model-details',
    standalone: true,
    templateUrl: './rule-model-details.component.html',
    styleUrl: './rule-model-details.component.css',
    imports: [HeaderComponent, TitlebannerComponent, CodeEditorModule, CommonModule, RouterModule, FormsModule, ReactiveFormsModule]
})
export class RuleModelDetailsComponent {
selectLogsources: any;
  
  constructor( private authService : AuthService, private route: ActivatedRoute, private rulesService: RulesService, private useCaseService : UsecasesService, private clipboard: Clipboard )  {}

code: any = "";
  
clients : any = [];

selectClient : any;


  ruleModel :any = {
    title: "",
    useCaseId: "",
    syntax: "",
    type: "",
    ruleCode: "empty"
}
  usecase: any = {
    title: "",
    description: "",
    mitreTechniques: [],
  }


  selectedModel : CodeModel = {
    value: this.ruleModel.ruleCode,
    language: 'YAML',
    uri: ''
  }

  selectedModelModal : CodeModel = {
    value: 'teste',
    language: 'YAML',
    uri: ''
  }

  theme = 'vs'
  themeModal = 'vs'

  
options = {
  language: 'YAML',
  fontSize: 15,
  minimap: {
    enabled: true,
  },
  automaticLayout: true,
dragAndDrop: true,


}

optionsModal = {
  language: 'YAML',
  fontSize: 15,
  minimap: {
    enabled: true,
  },
  automaticLayout: true,
dragAndDrop: true,


}


onEditorLoaded(editor: CodeEditorComponent) {
  console.log('loaded', editor);
}

onCodeModelChanged(event: CodeModelChangedEvent) {
  console.log('code model changed', event);

  setTimeout(() => {
    event.sender.formatDocument();
  }, 100);
}

onCodeChanged(value : any) {
  this.code = value;
}

  ngOnInit() {

    var id = this.route.snapshot.params['id']


    this.rulesService.getRuleModelById(id).subscribe((data: any) => {
      this.ruleModel = data;
      console.log(this.ruleModel);

      this.createRuleForm.get('modalCode')?.setValue(this.ruleModel.ruleCode);


      var newModel = {
        value: this.ruleModel.ruleCode,
        language: '',
        uri: ''
      }
      
        this.selectedModel = JSON.parse(JSON.stringify(newModel));
      
      



      this.useCaseService.getUseCaseById(this.ruleModel.useCaseId).subscribe((data: any) => {
        this.usecase = data;
        console.log(this.usecase);

        this.authService.getClients().subscribe((data: any) => {
          this.clients = data
        });
      });

    });

  }

  copyToClipboard() {

this.clipboard.copy(this.code);

    
  }



  createRule(){
 var rule = {
  ruleModel : this.ruleModel.id,
  ruleCode : this.createRuleForm.get('modalCode')?.value,
  logsources: this.createRuleForm.get('logsources')?.value,
  client: this.createRuleForm.get('client')?.value

 
  }

  console.log(rule);
  console.log(this.clients)

this.rulesService.createRule(rule).subscribe((data: any) => {
  console.log(data);

});

}

 createRuleForm = new FormGroup({
  modalCode: new FormControl(this.ruleModel.ruleCode),
  logsources: new FormControl(null),
  client: new FormControl('')
 })
  
}
