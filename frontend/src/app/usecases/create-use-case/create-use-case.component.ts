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
        playbook: new FormControl(''),  
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

    selectedFile: File | null = null;
    onFileSelected(event: Event): void {
        console.log('File selected');
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.selectedFile = input.files[0];
            console.log('File selected:', this.selectedFile);
        }
    
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

    if(this.selectedFile != null){
        useCase.playbook = this.selectedFile;
    }

    const useCaseData = new FormData();
    useCaseData.append('title', useCase.title);
    useCaseData.append('description', useCase.description);
    useCaseData.append('mitigation', useCase.mitigation);
    useCaseData.append('playbook', useCase.playbook);
    useCaseData.append('mitreTechniques', JSON.stringify(useCase.mitreTechniques));
    useCaseData.append('cncsClass', useCase.cncsClass);
    useCaseData.append('cncsType', useCase.cncsType);
    useCaseData.append('attackVectors', JSON.stringify(useCase.attackVectors));
    useCaseData.append('rules', JSON.stringify(useCase.rules));
    useCaseData.append('phaseTasks', JSON.stringify(useCase.phaseTasks));


            this.usecasesService.createUseCase(useCaseData).subscribe({
                next: () => {
                    this.router.navigate(['/manage-use-cases']);
                },
                error: (error) => {
                    console.error('Erro ao criar o Use Case', error);
                }
            });
        }
    }

