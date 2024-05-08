import { Component } from '@angular/core';
import { TitlebannerComponent } from "../../layout/titlebanner/titlebanner.component";
import { HeaderComponent } from "../../layout/header/header.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MitreService } from '../../services/mitre.service';
import { CommonModule } from '@angular/common';
import { UsecasesService } from '../../services/usecases.service';
import { CdkPortal } from '@angular/cdk/portal';
import { Router } from '@angular/router';
import { TagInputModule } from 'ngx-chips';
import { Binary } from '@angular/compiler';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-create-use-case',
    standalone: true,
    templateUrl: './create-use-case.component.html',
    styleUrl: './create-use-case.component.css',
    imports: [TitlebannerComponent, HeaderComponent, MatFormFieldModule, MatSelectModule, MatIconModule, TagInputModule, TitlebannerComponent, HeaderComponent, ReactiveFormsModule, FormsModule, CommonModule]
})



export class CreateUseCaseComponent {




    constructor(private mitreService : MitreService, private usecasesService : UsecasesService, private router: Router) { }

    tactics = ["Initial Access",
    "Execution",
    "Persistence",
    "Privilege Escalation",
    "Defense Evasion",
    "Credential Access",
    "Discovery",
    "Lateral Movement",
    "Collection", 
    "Command and Control",
    "Exfiltration",
    "Impact"];


addDetections : boolean = false
addMitigations : boolean = false

    ngOnInit() {



    }

    useCase = {
        title: "",
        description: "",
        mitigation: "",
        playbook: "",
        mitreTechniques: [],
        cncsClass: "",
        cncsType: "",
        phaseTasks: [],
        rules: [],
        attackVectors: [],
        logsources: []
        
    
    }



    taxonomiaCNCS = [
       
    {"Código Malicioso" : ["Sistema Infetado", "Distribuição de Malware", "Servidor C2", "Configuração de Malware"]},
    {"Disponibilidade" : ["Negação de Serviço","Negação de Serviço Distribuída","Configuração Incorreta","Sabotagem","Interrupção"]},


    {"Recolha de Informação" : ["Scanning","Sniffing","Engenharia Social"]},

    {"Intrusão" : ["Comprometimento de Conta Privilegiada", "Comprometimento de Conta Não Privilegiada", "Comprometimento de Aplicação", "Comprometimento de Sistema", "Arrombamento"]},

    {"Tentativa de Intrusão" : ["Exploração de Vulnerabilidade","Tentativa de Login", "Nova assinatura de ataque"]},

    {"Segurança da Informação" : ["Acesso não autorizado",
   "Modificação não autorizada",
    "Perda de dados",
    "Exfiltração de Informação"]},

    {"Fraude" : ["Utilização indevida ou não autorizada de recursos", "Direitos de autor",
    "Utilização ilegítima de nome de terceiros",
    "Phishing"]},

    {"Conteúdo Abusivo" : ["SPAM","Discurso Nocivo","Exploração sexual de menores, racismo e apologia da violência"]},

    {"Vulnerabilidade" : ["Criptografia fraca",
   "Amplificador DDoS",
   " Serviços acessíveis potencialmente indesejados",
    "Revelação de informação",
    "Sistema vulnerável"]},

    {"Outro" : ["Sem Tipo","Indeterminado"]},




    ]

    chavesTaxonomia = this.taxonomiaCNCS.map(objeto => Object.keys(objeto)[0]);

    selectedCategory: string = "";
    selectedSubcategory: string = "";
    selectedCategoryValues: string[] =  [];
  
    updateCNCSValues() {
        const selectedCategoryObject = this.taxonomiaCNCS.find(obj => Object.keys(obj)[0] === this.selectedCategory) as any;
        this.selectedCategoryValues = selectedCategoryObject ? selectedCategoryObject[this.selectedCategory] : [];
        this.selectedSubcategory = ''; // Reset selected subcategory when category changes

        console.log(this.selectedCategoryValues);
      }
    


       createUseCaseForm = new FormGroup({
        title: new FormControl(''),
        description: new FormControl(''),
        mitigation: new FormControl(''),
        playbook: new FormControl(null),
        mitreTechniques: new FormControl(null),
        cncsClass: new FormControl(''),
        cncsType: new FormControl(''),
        phaseTasks: new FormControl(null),
        rules: new FormControl(null),
        attackVectors: new FormControl(null),
        logsources: new FormControl(null)
    });


    createUseCase() {

        const title = this.createUseCaseForm.get('title')?.value;
        const description = this.createUseCaseForm.get('description')?.value;
        const mitigation = this.createUseCaseForm.get('mitigation')?.value;
        const playbook = this.createUseCaseForm.get('playbook')?.value;
        const mitrearray : any = this.createUseCaseForm.get('mitreTechniques')?.value;
        const cncsClass = this.selectedCategory
        const cncsType = this.selectedSubcategory
        
const phaseTasks: any = [
    { phase: "Preparation", tasks: [] },
    { phase: "Detection and Analysis", tasks: [] },
    { phase: "Containment, Eradication and Recovery", tasks: [] },
    { phase: "Post-Event Activity", tasks: [] }
];

        const rules : any = []
        const attackVectorsArray : any = this.createUseCaseForm.get('attackVectors')?.value;

        var mitreTechniques = mitrearray?.map((technique: any) => technique.value);
        var attackVectors = attackVectorsArray?.map((vector: any) => vector.value);



        const useCase = {
            title,
            description,
            mitigation,
            playbook,
            mitreTechniques,
            cncsClass,
            cncsType,
            phaseTasks,
            rules,
            attackVectors,
            
        };


console.log(useCase);
this.usecasesService.createUseCase(useCase).subscribe((response) => {
    console.log(response);

    this.router.navigate(['/manage-use-cases']);
    });
}

}