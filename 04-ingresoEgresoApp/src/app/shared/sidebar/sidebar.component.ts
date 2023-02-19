import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  nombre: string = '';
  correo: string = '';

  datosSubs!: Subscription;

  constructor(private authService:AuthService, private router: Router, private store: Store<AppState>){}

  ngOnInit(): void {
   this.datosSubs = this.store.select('user').subscribe( ({user})=>{
      this.nombre = user?.nombre!
      this.correo = user?.email!
    })
  }
  ngOnDestroy(): void {
    this.datosSubs.unsubscribe();
  }

  logout(){
    this.authService.logout().then( resp => this.router.navigateByUrl('/login') ).catch( err => console.log('error: ',JSON.stringify(err)))

  }
}
