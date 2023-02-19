import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit, OnDestroy{

  // Doughnut
  public doughnutChartLabels: string[] = [ 'Ingresos', 'Egresos' ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: []
  };

  ingresos: number = 0;
  egresos: number = 0;

  totalEgresos: number = 0;
  totalIngresos: number = 0;

  estadisticasSubs!: Subscription;

  constructor( private store:Store<AppState>){}
 
  ngOnInit(): void {
   this.estadisticasSubs = this.store.select('ingresosEgresos')
    .subscribe(({items})=> {
      this.generarEstadisticas(items);
    })
  }
  
  ngOnDestroy(): void {
    this.estadisticasSubs.unsubscribe();
  }


  generarEstadisticas(items: IngresoEgreso[]){

    this.totalEgresos = 0;
    this.totalIngresos = 0;

    for (const item of items) {
      if( item.tipo === 'ingreso'){
        this.totalIngresos += item.monto;
        this.ingresos ++;
      }else {
        this.totalEgresos += item.monto;
        this.egresos ++;
      }
    }
    this.doughnutChartData.datasets = [ {data: [this.totalIngresos, this.totalEgresos], backgroundColor: [
      '#44ff44',
      '#ff0000',
    ],
    hoverOffset: 4 }]
  }

  //public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartType: ChartType = 'pie';

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log('click: ',event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log('hover: ',event, active);
  }
}
