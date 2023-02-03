import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as actions from '../contador.action';

@Component({
  selector: 'app-nieto',
  templateUrl: './nieto.component.html',
  styleUrls: ['./nieto.component.css']
})
export class NietoComponent implements OnInit{
  // @Input() contador!:number;
  // @Output() cambioContador = new EventEmitter<number>();

  contador!: number;

  constructor(private store: Store<AppState>){}

  ngOnInit(): void {
    this.store.select('contador').subscribe( contador => {
      this.contador = contador;
    }) 
  }

  reset(){
    this.store.dispatch(actions.reset())
  }
}
