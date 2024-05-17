import { Component } from '@angular/core';
import { HeaderComponent } from "../../layout/header/header.component";
import { TitlebannerComponent } from "../../layout/titlebanner/titlebanner.component";
import ApexCharts from 'apexcharts';
import { RulesService } from '../../services/rules.service';
import { UsecasesService } from '../../services/usecases.service';
import { RulesPerSyntaxComponent } from "../rules-per-syntax/rules-per-syntax.component";

@Component({
    selector: 'app-statistics-page',
    standalone: true,
    templateUrl: './statistics-page.component.html',
    styleUrl: './statistics-page.component.css',
    imports: [HeaderComponent, TitlebannerComponent, RulesPerSyntaxComponent]
})
export class StatisticsPageComponent {


    constructor(private rulesService : RulesService, private useCasesService : UsecasesService) { }


rules : any;
useCases : any;



   
      

      ngOnInit() {


this.rulesService.getRules().subscribe((value) => {
this.rules = value;

this.useCasesService.getUseCases().subscribe((value) => {

this.useCases = value;


});
});



      }


}
