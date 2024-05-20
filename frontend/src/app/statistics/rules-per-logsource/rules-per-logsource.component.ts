import { Component, Input, SimpleChanges } from '@angular/core';
import ApexCharts from 'apexcharts';

@Component({
  selector: 'app-rules-per-logsource',
  standalone: true,
  imports: [],
  templateUrl: './rules-per-logsource.component.html',
  styleUrl: './rules-per-logsource.component.css'
})
export class RulesPerLogsourceComponent {


  @Input() rules: any;
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['rules'] && changes['rules'].currentValue) {
      this.renderChart(changes['rules'].currentValue);
    }
  }


  renderChart(rulesData: any) {

    if(rulesData){

    console.log(rulesData);

    const rulesLogsource = rulesData.flatMap((rule: any) => rule.ruleModel.logsources);


    var rulesLogsourcePercentage = rulesLogsource.reduce((acc: any, curr: any) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {});
    var rulesLogsourcePercentageArray = Object.keys(rulesLogsourcePercentage).map((key) => {
      return rulesLogsourcePercentage[key];
    });

    var rulesLogsourcePercentageArrayLabels = Object.keys(rulesLogsourcePercentage).map((key) => {
      return key;
    });

    var options = {
      series: rulesLogsourcePercentageArray,
      colors: ["#1C64F2", "#16BDCA", "#05c5a4", "#FFA800"],
      chart: {
        height: 420,
        width: "100%",
        type: "pie",
      },
      stroke: {
        colors: ["white"],
        lineCap: "",
      },
      plotOptions: {
        pie: {
          labels: {
            show: true,
          },
        },
      },
      labels: rulesLogsourcePercentageArrayLabels,
      legend: {
        position: "bottom",
      },
    };

 
    const chart = new ApexCharts(document.getElementById("pie-chart2"), options);
    chart.render();
    }




  
}
}
