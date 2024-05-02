import { Component, ElementRef, ViewChild } from '@angular/core';
import { HeaderComponent } from "../../layout/header/header.component";
import { TitlebannerComponent } from "../../layout/titlebanner/titlebanner.component";
import { ActivatedRoute } from '@angular/router';
import { UsecasesService } from '../../services/usecases.service';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Modal, initFlowbite } from 'flowbite';

@Component({
    selector: 'app-usecase-details',
    standalone: true,
    templateUrl: './usecase-details.component.html',
    styleUrl: './usecase-details.component.css',
    imports: [HeaderComponent, TitlebannerComponent, DecimalPipe, CommonModule]
})
export class UsecaseDetailsComponent {

    usecase: any = {
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

    };

    detection = [] as any;

    constructor(private route: ActivatedRoute, private usecasesService: UsecasesService) { }

    ngOnInit() {
initFlowbite();

        const id = this.route.snapshot.paramMap.get('id');
        console.log(id);

        if (id !== null) {
            this.usecasesService.getUseCaseById(Number(id)).subscribe((data) => {
                this.usecase = data;

                console.log(this.usecase);
                this.getDetection();
            });
        }
    }



    getDetection() {


// Loop pelos componentes do caso de uso
for (let i = 0; i < this.usecase.components.length; i++) {
    const component = this.usecase.components[i];

    // Verifica se o nome do componente está presente nas fontes de dados
    for (let j = 0; j < this.usecase.datasources.length; j++) {
        const datasource = this.usecase.datasources[j];


        if (datasource.components.includes(component.name)) {
            this.detection.push({
                datasourceName: datasource.name,
                datasourceDescription: datasource.description,
                componentName: component.name,
                componentDescription: component.description
            });
        }
    }
}

console.log("aqui");
console.log(this.detection);

    }



  
}
