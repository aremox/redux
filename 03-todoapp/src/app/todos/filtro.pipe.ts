import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from './models/todo.model';
import { filtrosValidos } from '../filter/filtro.action';

@Pipe({
  name: 'filtroTodo'
})
export class FiltroPipe implements PipeTransform {

  transform(value: Todo[], filtro?: filtrosValidos): Todo[] {
    
    console.log(value)

    switch( filtro){
      case 'completados':
        return value.filter( todo => todo.completado);
      case 'pendientes':
        return value.filter( todo => !todo.completado);
      case 'todos':
        return value;
      default:
        return value;
    }
  }

}
