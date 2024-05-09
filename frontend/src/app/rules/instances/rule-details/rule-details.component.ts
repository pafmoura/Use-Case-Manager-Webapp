import { Component } from '@angular/core';
import { RulesService } from '../../../services/rules.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HeaderComponent } from "../../../layout/header/header.component";
import { TitlebannerComponent } from "../../../layout/titlebanner/titlebanner.component";
import { UsecasesService } from '../../../services/usecases.service';
import { CodeEditorComponent, CodeEditorModule, CodeModel, CodeModelChangedEvent } from '@ngstack/code-editor';
import {Clipboard} from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-rule-details',
    standalone: true,
    templateUrl: './rule-details.component.html',
    styleUrl: './rule-details.component.css',
    imports: [HeaderComponent, TitlebannerComponent, CodeEditorModule, CommonModule, RouterModule, FormsModule, ReactiveFormsModule]
})
export class RuleDetailsComponent {
selectLogsources: any;
  
  constructor( private authService : AuthService, private route: ActivatedRoute, private rulesService: RulesService, private useCaseService : UsecasesService, private clipboard: Clipboard )  {}

code: any = "";
  
clients : any = [];

selectClient : any;


  rule : any = {}
  usecase: any = {}


  selectedModel : CodeModel = {
    value: this.rule.ruleCode,
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


    this.rulesService.getRuleById(id).subscribe((data: any) => {
      this.rule = data;
      console.log(this.rule);


      var newModel = {
        value: this.rule.ruleCode,
        language: '',
        uri: ''
      }
      
        this.selectedModel = JSON.parse(JSON.stringify(newModel));
      
      



      this.useCaseService.getUseCaseById(this.rule.ruleModel.useCaseId).subscribe((data: any) => {
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



  
}
