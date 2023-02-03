import { Action, createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import { borrar, borrarCompletados, crear, editar, toggle, toggleAll } from './todo.actions';

export const estadoInicial: Todo[] = [
  new Todo('Salvar al mundo'),
  new Todo('Vencer a Tanos'),
  new Todo('Comprar traje de Ironman'),
  new Todo('Robar escudo del Capitan America'),
];

export const todoReducer = createReducer<Todo[],Action>(
    estadoInicial,
  on(crear, (state, {texto}) => [...state, new Todo(texto)] ),
  on(toggle, (state, {id}) => {
    return state.map( todo =>{
      if(todo.id === id){
        return {
          ...todo,
          completado: !todo.completado
        }
      }else{
        return todo;
      }
    })
  } ),
  on(editar, (state, {id, texto}) => {
    return state.map( todo =>{
      if(todo.id === id){
        return {
          ...todo,
          texto
        }
      }else{
        return todo;
      }
    })
  } ),
  on(borrar, (state, {id}) => {
    return state.filter( todo => todo.id !== id)
  } ),
  on(toggleAll, (state, {completado}) => {
    return state.map( todo =>{
        return {
          ...todo,
          completado
        }
    })
  } ),
  on(borrarCompletados, (state,) => {
    return state.filter( todo => !todo.completado)
  } ),
);