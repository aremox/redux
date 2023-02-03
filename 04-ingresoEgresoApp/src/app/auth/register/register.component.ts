import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import * as ui from '../../shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy{

  registroForm: FormGroup;
  cargando: boolean = false;
  uiSubcripcion!: Subscription

  constructor( private fb: FormBuilder, private authService: AuthService, private router: Router, private store:Store<AppState>){
    this.registroForm = this.fb.group({
      nombre: ['Iván', Validators.required],
      correo: ['arenasmorante@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', Validators.required],
    });
  }
  ngOnDestroy(): void {
    this.uiSubcripcion.unsubscribe();
  }
  ngOnInit(): void {
    this.uiSubcripcion = this.store.select('ui').subscribe( ui => {
      this.cargando = ui.isLoading;
      
    })
  }

  crearUsuario(){

    if(this.registroForm.invalid){return}
    this.store.dispatch(ui.isLoading())
    const {nombre, correo, password} = this.registroForm.value;
   
    this.authService.crearUsuario(nombre,correo,password).then( credenciales => {
      this.store.dispatch(ui.stopLoading())
      this.router.navigateByUrl('/')
    }).catch( err => {
      console.log(JSON.stringify(err))
      this.store.dispatch(ui.stopLoading())
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.code
      })
    })
  }

}
