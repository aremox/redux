import { Injectable } from '@angular/core';
import { doc, Firestore, setDoc, addDoc, collection } from '@angular/fire/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {
  

  // const newUser = new Usuario( user.uid, nombre, email);
  // const docRef = doc(this.firestore, user.uid, 'usuario');
  // return setDoc(docRef,{...newUser} )

  constructor(private firestore: Firestore, private authService: AuthService) { }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso){
    console.log(ingresoEgreso)
    const id = new Date().getTime()
    const uid: string = this.authService.user.uid!;
    const docRef = doc(this.firestore, uid, 'ingreso-egreso', 'item', `${uid}_${id}`);
    
    return setDoc(docRef,{...ingresoEgreso} ).then( () => console.log('exito!')).catch(err => console.log(err));
  }
}
