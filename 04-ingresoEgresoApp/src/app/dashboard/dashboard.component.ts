import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { Usuario } from '../models/usuario.model';
import { setItems } from '../ingreso-egreso/ingreso-egreso.actions';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy{

  userSubs!: Subscription;
  ingresosEgresosSubs!: Subscription;

  constructor( private store: Store<AppState>, private ingresoEgresoService:IngresoEgresoService){}
  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
    this.ingresosEgresosSubs.unsubscribe();
  }


  ngOnInit(): void {
    this.userSubs = this.store.select('user')
              .pipe(
                filter( auth => auth.user != null)
              )
              .subscribe( ({user}) => {
                console.log(user)
                // this.ingresoEgresoService.initIngresosEgresosListener(user!.uid).then( (data: any[]) => {
                //   console.log(data)
                //   this.store.dispatch( setItems({ items: data}))
                // })

                this.ingresosEgresosSubs = this.ingresoEgresoService.getIngresosEgresos(user!.uid).subscribe(data => {
                  this.store.dispatch( setItems({ items: data}))
                })
              })
  }

}
