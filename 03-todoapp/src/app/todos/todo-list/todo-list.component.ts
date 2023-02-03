import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo.model';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { filtrosValidos } from '../../filter/filtro.action';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  filtroActual: filtrosValidos = 'todos';

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    //   this.store.select('todos').subscribe( todos => {
    //     this.todos = todos;
    //   })
    // }
    this.store.subscribe(state => {
      this.filtroActual = state.filtro;
      this.todos = state.todos;
    })
  }


}
