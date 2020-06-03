import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styleUrls: ['./grafico-dona.component.css']
})
export class GraficoDonaComponent implements OnInit {

  @Input() dataGrafico : any = {};

  // Doughnut
  public doughnutChartLabels: Label[] = [];
  public doughnutChartData: MultiDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';

  leyenda: string = '';

  constructor() {}

  ngOnInit(): void {
    console.log(this.dataGrafico);
    this.doughnutChartLabels = this.dataGrafico.labels;
    this.doughnutChartData = this.dataGrafico.data;
    this.doughnutChartType = this.dataGrafico.type;
    this.leyenda = this.dataGrafico.leyenda;
  }

}
