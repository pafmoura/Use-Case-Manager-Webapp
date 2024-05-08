import { ChangeDetectorRef, Component, ɵformatRuntimeError } from '@angular/core';
import { HeaderComponent } from "../../layout/header/header.component";
import { TitlebannerComponent } from "../../layout/titlebanner/titlebanner.component";
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Type } from 'class-transformer';
import { CodeEditorComponent, CodeEditorModule, CodeModel, CodeModelChangedEvent } from '@ngstack/code-editor';
import {editor, Range} from 'monaco-editor'
import { UsecasesService } from '../../services/usecases.service';
import { RulesService } from '../../services/rules.service';


@Component({
    selector: 'app-create-rule-model',
    standalone: true,
    templateUrl: './create-rule-model.component.html',
    styleUrl: './create-rule-model.component.css',
    imports: [HeaderComponent, TitlebannerComponent, CommonModule, FormsModule, ReactiveFormsModule, CodeEditorModule ]
})
export class CreateRuleModelComponent {

usecases : any = ['Vazio'];


constructor(private useCasesService : UsecasesService, private rulesService : RulesService) { }



ngOnInit() {

  this.useCasesService.getUseCases().subscribe((data) => {
    this.usecases = data;
  })

}

selectedUseCase : any = "SIEM";
selectedSyntax : any = "";

code : any = "";



types = {
  SIEM: ['Sigma Rule', 'Splunk Rule', 'QRadar Rule'],
  SOAR: ['YARA Rule']
};



typeKeys() {
  return Object.keys(this.types);
}

syntaxesForSelectedType() {
  if (this.selectedType === 'SIEM') {
    return this.types.SIEM;
  } else if (this.selectedType === 'SOAR') {
    return this.types.SOAR;
  }
  return []; 
}


selectedType: any = "SIEM";

setDefaultCode() {

  
  this.defaultCode = this.examples[this.selectedSyntax];


var newModel = {
  value: this.defaultCode,
  language: '',
  uri: ''
}

  this.selectedModel = JSON.parse(JSON.stringify(newModel));


}

  async onSyntaxChanged() {



  this.setDefaultCode();



}


  defaultCode = ``

  createRuleModel() {
    
    var ruleModel = {
      title: this.createRuleModelForm.value.title,
      useCaseId: this.selectedUseCase,
      syntax: this.selectedSyntax,
      type: this.selectedType,
      ruleCode: this.selectedModel.value
    }
    console.log(ruleModel);

this.rulesService.createRuleModel(ruleModel).subscribe((data) => {
  console.log(data);
});




  }

  ruleModel :any = {
    title: "",
    useCaseId: "",
    syntax: "",
    type: "",
    ruleCode: ""
}

createRuleModelForm = new FormGroup({
  title: new FormControl(''),
  selectedUseCase: new FormControl(''),
  selectedSyntax: new FormControl(''),
  selectedType: new FormControl(''),

})



options = {
  language: 'YAML',
  
  
  minimap: {
    enabled: true,
  },
  automaticLayout: true,
dragAndDrop: true,


}

selectedModel : CodeModel = {
  value: this.defaultCode,
  language: 'YAML',
  uri: ''
}

theme = 'vs'

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
}



examples: { [key: string]: string } = {
  'Sigma Rule': `title: um título curto e capitalizado com menos de 50 caracteres
  status: experimental
  description: Uma descrição do que sua regra é destinada a detectar
  references:
      - Uma lista de todas as referências que podem ajudar um leitor ou analista a entender o significado de uma regra acionada
  tags:
      - attack.execution  # exemplo de categoria MITRE ATT&CK
      - attack.t1059      # exemplo de ID da técnica MITRE ATT&CK
      - car.2014-04-003   # exemplo de ID do CAR
  author: Michael Haag, Florian Roth, Markus Neis  # exemplo, uma lista de autores
  date: 06/04/2018  # Data da regra
  logsource:                      # importante para o mapeamento de campos em arquivos de configuração pré-definidos ou adicionais
      category: process_creation  # Neste exemplo, escolhemos a categoria 'process_creation'
      product: windows            # o produto respectivo
  detection:
      selection:
          NomeDoCampo: 'ValorString'
          NomeDoCampo: ValorInteiro
          NomeDoCampo|modificador: 'Valor'
      condition: seleção
  fields:
      - campos na fonte de log que são importantes para investigar mais a fundo
  falsepositives:
      - descrever possíveis condições de falsos positivos para ajudar os analistas em sua investigação
  level: um dos cinco níveis (informational, low, medium, high, critical)
  `,
  'Splunk Rule': `# Título da Regra: [TÍTULO DA REGRA]

  # ID da Regra: [ID_DA_REGRA]
  
  # Descrição:
  # Descreva brevemente o que essa regra detecta e por que é importante.
  
  # Autor: [NOME_DO_AUTOR]
  
  # Nível de Severidade: [NÍVEL_DE_SEVERIDADE]
  
  # Categoria: [CATEGORIA_DA_REGRA]
  
  # Tags: [TAGS_RELACIONADOS]
  
  # Ambiente: [AMBIENTE_RECOMENDADO]
  
  # Condições de Detecção:
  
  # Substitua os placeholders abaixo pelos campos e valores relevantes dos seus dados.
  
  index=[NOME_DO_INDICE]
  sourcetype=[TIPO_DE_FONTE_DE_DADOS]
  | [AÇÃO_DE_PESQUISA_OU_FILTRO]
  | [OUTRA_AÇÃO_DE_PESQUISA_OU_FILTRO_SE_NECESSÁRIO]
  | [CONDICIONAL_ADICIONAL_SE_NECESSÁRIO]
  
  # Consequências:
  # Descreva as possíveis consequências ou impactos da atividade detectada.
  
  # Recomendações de Mitigação:
  # Forneça orientações sobre como lidar com a atividade detectada ou como mitigar os possíveis riscos.
  
  # Referências:
  # Inclua quaisquer referências relevantes ou recursos adicionais relacionados a esta regra.
  `,
  'QRadar Rule': `# Nome da regra
  name: "Nome da Regra"
  
  # Descrição da regra
  description: |
    Descrição da atividade ou ameaça que esta regra detecta.
  
  # Lista de regras (pode haver várias)
  rules:
  
    # Regra 1
    - rule_name: "Nome da Regra 1"
      description: "Descrição da Regra 1"
  
      # Condição da regra
      when:
        # Condições de correspondência do evento
        - "Condição de Correspondência 1"
        - "Condição de Correspondência 2"
        # ...
      
      # Ações a serem executadas quando a regra corresponder
      then:
        # Ação 1
        - "Ação 1"
        # Ação 2
        - "Ação 2"
        # ...
notes: |
  Notas adicionais sobre a regra, referências, etc.
      `,
}

}