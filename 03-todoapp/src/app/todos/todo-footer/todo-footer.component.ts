import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { filtrosValidos, ponerFiltro } from '../../filter/filtro.action';
import { borrarCompletados } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit{

  filtroActual: filtrosValidos = 'todos';
  filtros: filtrosValidos[] = ['todos', 'completados', 'pendientes']

  pendientes: number = 0;

  constructor(private store:Store<AppState> ){}

  ngOnInit(): void {
    // this.store.select('filtro').subscribe( filtro => {
    //   this.filtroActual = filtro;
    // })
    this.store.subscribe( state => {
      this.filtroActual = state.filtro;
      this.pendientes = state.todos.filter( todo => !todo.completado).length
    })
  }

  cambiarFiltro(filtro: filtrosValidos){
    
      this.store.dispatch(ponerFiltro({filtro}));
  }

  limpiarCompletados(){
    this.store.dispatch(borrarCompletados());
  }

}
