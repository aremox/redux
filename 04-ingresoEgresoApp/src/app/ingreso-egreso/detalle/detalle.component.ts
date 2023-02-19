import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { StateWithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit, OnDestroy{

  ingresosEgresos: IngresoEgreso[] = [];
  ingresosEgresosSubs!: Subscription;

  constructor( private store:Store<StateWithIngreso>, private ingresoEgresoService:IngresoEgresoService ){}


  ngOnDestroy(): void {
    this.ingresosEgresosSubs.unsubscribe();
  }


  ngOnInit(): void {
    this.ingresosEgresosSubs = this.store.select('ingresosEgresos').subscribe(({items})=>{
      if(items.length != 0){
        this.ingresosEgresos = items
      }
    })
  }


  borrar(item: IngresoEgreso){
    this.ingresoEgresoService.borrarIngresoEgreso(item.id!)
    .then(() => Swal.fire({
      title: 'Borrado',
      text: `Borrado de ${item.descripcion}`,
      icon: 'success'
    }))
    .catch( err => Swal.fire({
      title: 'Error',
      text: err.message,
      icon: 'error'
    }))
  }

}
