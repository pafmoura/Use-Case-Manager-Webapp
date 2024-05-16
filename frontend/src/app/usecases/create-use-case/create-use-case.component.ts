import { Component } from '@angular/core';
import { TitlebannerComponent } from "../../layout/titlebanner/titlebanner.component";
import { HeaderComponent } from "../../layout/header/header.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
    styleUrls: ['./create-use-case.component.css'],
    imports: [TitlebannerComponent, HeaderComponent, MatFormFieldModule, MatSelectModule, MatIconModule, TagInputModule, TitlebannerComponent, HeaderComponent, ReactiveFormsModule, FormsModule, CommonModule]

})
export class CreateUseCaseComponent {
    constructor(private mitreService: MitreService, private usecasesService: UsecasesService, private router: Router) { }

    chavesTaxonomia = ["Código Malicioso", "Disponibilidade", "Recolha de Informação", "Intrusão", "Tentativa de Intrusão", "Segurança da Informação", "Fraude", "Conteúdo Abusivo", "Vulnerabilidade", "Outro"];
    selectedCategory: string = '';
    selectedSubcategory: string = '';
    selectedCategoryValues: string[] = [];

    createUseCaseForm = new FormGroup({
        title: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        mitigation: new FormControl('', Validators.required),
        playbook: new FormControl('', [Validators.required, Validators.pattern('(https?://.*)')]),  // URL pattern validation
        mitreTechniques: new FormControl([], Validators.required),
        cncsClass: new FormControl('', Validators.required),
        cncsType: new FormControl('', Validators.required),
        attackVectors: new FormControl([], Validators.required)
    });

    taxonomiaCNCS : any = [
        {"Código Malicioso": ["Sistema Infetado", "Distribuição de Malware", "Servidor C2", "Configuração de Malware"]},
        {"Disponibilidade": ["Negação de Serviço", "Abuso de Recursos", "Outros"]},
        {"Recolha de Informação": ["Scanners de Vulnerabilidades", "Falsificação de Identidade"]},
        {"Intrusão": ["Exploração de Vulnerabilidades", "Comprometimento de Contas", "Obtenção de Credenciais"]},
        {"Tentativa de Intrusão": ["Tentativa de Exploração de Vulnerabilidades"]},
        {"Segurança da Informação": ["Roubo de Informação", "Exfiltração de Dados", "Alteração de Informação"]},
        {"Fraude": ["Burlas"]},
        {"Conteúdo Abusivo": ["SPAM", "Phishing"]},
        {"Vulnerabilidade": ["Sistema Vulnerável", "Aplicação Vulnerável"]},
        {"Outro": ["Outro"]}
    ];

    updateCNCSValues() {
        this.selectedCategory = this.createUseCaseForm.get('cncsClass')?.value || '';
        this.selectedCategoryValues = this.taxonomiaCNCS.find((entry: { [x: string]: any; }) => entry[this.selectedCategory])?.[this.selectedCategory] || [];
    }

    createUseCase() {

       var useCase : any = this.createUseCaseForm.value;

       useCase.rules = [];
       useCase.phaseTasks = [
        { phase: "Preparation", tasks: [] },
        { phase: "Detection and Analysis", tasks: [] },
        { phase: "Containment, Eradication and Recovery", tasks: [] },
        { phase: "Post-Event Activity", tasks: [] }
    ];

       if(useCase.mitreTechniques != null){
       useCase.mitreTechniques = useCase.mitreTechniques?.map((technique:any) => technique.value);
    }

    if(useCase.attackVectors != null){
        useCase.attackVectors = useCase.attackVectors?.map((vector:any) => vector.value);
    }



            this.usecasesService.createUseCase(this.createUseCaseForm.value).subscribe({
                next: () => {
                    this.router.navigate(['/manage-use-cases']);
                },
                error: (error) => {
                    console.error('Erro ao criar o Use Case', error);
                }
            });
        }
    }

