import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  nombre: string = '';
  correo: string = '';

  datosSubs!: Subscription;

  constructor(private store: Store<AppState>){}

  ngOnInit(): void {
    this.datosSubs = this.store.select('user').subscribe( ({user})=>{
       this.nombre = user?.nombre!
       this.correo = user?.email!
     })
   }
   ngOnDestroy(): void {
     this.datosSubs.unsubscribe();
   }

}
