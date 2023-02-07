import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as ui from '../shared/ui.actions';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.css']
})
export class IngresoEgresoComponent implements OnInit, OnDestroy{

  ingresoForm!: FormGroup;
  tipo: string = 'ingreso';
  cargando: boolean = false;
  loadingSubs: Subscription | undefined;


  constructor( private fb: FormBuilder, private ingresoEgresoService: IngresoEgresoService, private store: Store<AppState>){}
  
  ngOnDestroy(): void {
    this.loadingSubs?.unsubscribe();
  }

  ngOnInit(): void {

    this.loadingSubs = this.store.select('ui')
      .subscribe(({ isLoading}) => {
        this.cargando = isLoading
      })

    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required],
    })
    
  }

  guardar(){

    this.store.dispatch(ui.isLoading())

    setTimeout(() => {
      console.log("paso por aqui")
      this.store.dispatch(ui.stopLoading())
    }, 2500);

    return

    if ( this.ingresoForm.invalid){return;}
    console.log(this.ingresoForm.value)

    const {descripcion, monto} = this.ingresoForm.value

    const ingresoEgreso = new IngresoEgreso(descripcion,monto,this.tipo);

    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso).then( () => {
      this.ingresoForm.reset();
      Swal.fire('Registro creado', descripcion, 'success')
    }).catch( err => {
      Swal.fire('Error', err, 'error')
    })
  }



}
