import { Component } from '@angular/core';
import { TitlebannerComponent } from "../../layout/titlebanner/titlebanner.component";
import { HeaderComponent } from "../../layout/header/header.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MitreService } from '../../services/mitre.service';
import { CommonModule } from '@angular/common';
import { UsecasesService } from '../../services/usecases.service';
import { CdkPortal } from '@angular/cdk/portal';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create-use-case',
    standalone: true,
    templateUrl: './create-use-case.component.html',
    styleUrl: './create-use-case.component.css',
    imports: [TitlebannerComponent, HeaderComponent, TitlebannerComponent, HeaderComponent, ReactiveFormsModule, FormsModule, CommonModule]
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
        mid: "",
        title: "",
        cncs: "",
        tactics: [] as string[],
        description: "",
        mitigations: [] as string[],
        components: [] as string[],
        datasources: [] as string[],
        url: "",
        subtechniques: [] as string[],
        platforms: [] as string[],
    
    }

    createUseCaseForm = new FormGroup({
        mid: new FormControl(""),
        title: new FormControl(""),
        cncs: new FormControl(""),
        tactics: new FormControl(""),
        description: new FormControl(""),
        mitigations: new FormControl(""),
        components: new FormControl(""),
        datasources: new FormControl(""),
        addDetections: new FormControl(""),
        addMitigations: new FormControl(""),
    });

    updateBasedOnMitreID() {

        var id = this.createUseCaseForm.get('mid')?.value;


        if (id) {
            this.mitreService.getTechniqueById(id).subscribe((data) => {
                console.log(data);
                this.useCase.title = data.name;
                this.useCase.description = data.description;

                //select the tactics in the multiple select
                this.useCase.tactics = data.tactics;

                this.useCase.cncs = "";

                this.useCase.components = [];
                this.useCase.datasources = [];

                this.useCase.url = data.url;
                this.useCase.subtechniques = data.sub_techniques;
                this.useCase.platforms = data.platforms;

                
               



               

                
            });
        }

        

    }


 createUseCase() {
    
    var useCase = {
        mid: this.createUseCaseForm.get('mid')?.value,
        title: this.createUseCaseForm.get('title')?.value,
        cncs: this.createUseCaseForm.get('cncs')?.value,
        tactics: this.createUseCaseForm.get('tactics')?.value,
        description: this.createUseCaseForm.get('description')?.value,
        mitigations: [],
    components: [],
    datasources: [],
    url: this.useCase.url,
    subtechniques: this.useCase.subtechniques,
    platforms: this.useCase.platforms,
    



}




        if (useCase.mid) {
            console.log("getting mitigations");
            this.mitreService.getMitigationsByTechniqueId(useCase.mid).subscribe((data) => {
                
                if(this.addMitigations==true)
                useCase.mitigations = data;
                

                if (useCase.mid) {
                this.mitreService.getComponentsByTechniqueId(useCase.mid).subscribe((data) => {

                    if(this.addDetections==true)
                    useCase.components = data;

                    if (useCase.mid) {
                        this.mitreService.getDatasourcesByTechniqueId(useCase.mid).subscribe((data) => {

                            if(this.addDetections==true)
                                console.log(data);
                            useCase.datasources = data;
                     
                            console.log(useCase);
                this.usecasesService.createUseCase(useCase).subscribe((data) => {
                    console.log(data);
                    this.router.navigate(['/manage-use-cases']);

                    
                }
                
                );
                        });}
                
            });
                }
            }
            );
        }
    }
}