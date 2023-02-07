import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs';
import * as usuariosActions from '../actions/usuarios.actions';
import { UsuarioService } from '../../services/usuario.service';

@Injectable()

export class UsuariosEffects {


    constructor( private actions$: Actions, private usuarioService: UsuarioService){}

    cargarUsuarios$ = createEffect(
        ()=> this.actions$.pipe(
            ofType( usuariosActions.cargarUsuarios),
            mergeMap(
                ()=> this.usuarioService.getUsers()
                .pipe(
                    map(users => usuariosActions.cargarUsuariosSuccess({ usuarios: users})),
                    catchError( async (err) => usuariosActions.cargarUsuariosError({ payload: err }))
                )
            )
        )
    )
}