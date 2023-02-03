import { ActionReducerMap } from "@ngrx/store";
import { filtrosValidos } from "./filter/filtro.action";
import { Todo } from "./todos/models/todo.model";
import { todoReducer } from "./todos/todo.reducer";
import { filtroReducer } from './filter/filtro.reducer';

export interface AppState {
    todos: Todo[],
    filtro: filtrosValidos
}

export const appReducers: ActionReducerMap<AppState> = {
    todos: todoReducer,
    filtro: filtroReducer
}