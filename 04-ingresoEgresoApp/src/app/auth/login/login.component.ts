import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as ui from '../../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;

  cargando: boolean = false;
  uiSubcripcion: Subscription | undefined

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private store:Store<AppState>) {
    this.loginForm = this.fb.group({
      correo: ['arenasmorante@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', Validators.required],
    });
  }
  ngOnDestroy(): void {
    this.uiSubcripcion?.unsubscribe();
  }
  ngOnInit(): void {
    this.uiSubcripcion = this.store.select('ui').subscribe( ui => {
      this.cargando = ui.isLoading;
     
    })
  }



  login(){
    if(this.loginForm.invalid){return}

    this.store.dispatch(ui.isLoading())

    const {correo, password} = this.loginForm.value;
    this.authService.login(correo,password).then( credenciales => {
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
