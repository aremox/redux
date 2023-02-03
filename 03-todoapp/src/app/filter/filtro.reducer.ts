import { Action, createReducer, on } from '@ngrx/store';
import { filtrosValidos, ponerFiltro } from './filtro.action';


export const estadoInicial: filtrosValidos = 'todos';

export const filtroReducer = createReducer<filtrosValidos,Action>(
    estadoInicial,
  on(ponerFiltro, (state, {filtro}) => filtro ),
  );