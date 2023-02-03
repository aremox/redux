import { createAction, props } from '@ngrx/store';

export type filtrosValidos = 'todos' | 'completados' | 'pendientes'

export const ponerFiltro = createAction(
    '[Filtro] Poner filtro',
    props<{ filtro: filtrosValidos }>()
);