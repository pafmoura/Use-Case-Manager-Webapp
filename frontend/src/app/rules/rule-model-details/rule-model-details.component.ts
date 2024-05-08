import { Component } from '@angular/core';
import { RulesService } from '../../services/rules.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HeaderComponent } from "../../layout/header/header.component";
import { TitlebannerComponent } from "../../layout/titlebanner/titlebanner.component";
import { UsecasesService } from '../../services/usecases.service';
import { CodeEditorComponent, CodeEditorModule, CodeModel, CodeModelChangedEvent } from '@ngstack/code-editor';
import {Clipboard} from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-rule-model-details',
    standalone: true,
    templateUrl: './rule-model-details.component.html',
    styleUrl: './rule-model-details.component.css',
    imports: [HeaderComponent, TitlebannerComponent, CodeEditorModule, CommonModule, RouterModule]
})
export class RuleModelDetailsComponent {
  
  constructor( private route: ActivatedRoute, private rulesService: RulesService, private useCaseService : UsecasesService, private clipboard: Clipboard )  {}

code: any = "";
  
  ruleModel :any = {
    title: "",
    useCaseId: "",
    syntax: "",
    type: "",
    ruleCode: ""
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

  theme = 'vs'
  

  
options = {
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


      var newModel = {
        value: this.ruleModel.ruleCode,
        language: '',
        uri: ''
      }
      
        this.selectedModel = JSON.parse(JSON.stringify(newModel));
      
      



      this.useCaseService.getUseCaseById(this.ruleModel.useCaseId).subscribe((data: any) => {
        this.usecase = data;
        console.log(this.usecase);
      });

    });

  }

  copyToClipboard() {

this.clipboard.copy(this.code);

    
  }
}
