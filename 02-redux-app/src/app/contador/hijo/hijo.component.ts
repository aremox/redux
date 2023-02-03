import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import * as actions from '../contador.action';

@Component({
  selector: 'app-hijo',
  templateUrl: './hijo.component.html',
  styleUrls: ['./hijo.component.css']
})
export class HijoComponent implements OnInit{

  // @Input() contador!: number;
  // @Output() cambioContador = new EventEmitter<number>();
  
  contador!: number;

  constructor( private store: Store<AppState>){}


  ngOnInit(): void {
    this.store.select('contador').subscribe( contador => {
      this.contador = contador;
    }) 
  }

  multiplicar(){
    // this.contador *=2;
    // this.cambioContador.emit(this.contador);
    this.store.dispatch(actions.multiplicar({numero: 2}))
  }

  dividir(){
    // this.contador /=2;
    // this.cambioContador.emit(this.contador);
    this.store.dispatch(actions.dividir({numero: 2}))
  }

  // resetNieto(nuevoContador: number){
  //   this.contador = nuevoContador;
  //   this.cambioContador.emit(this.contador);
  // }
}
