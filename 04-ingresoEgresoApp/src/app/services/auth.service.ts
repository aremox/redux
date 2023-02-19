import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user } from '@angular/fire/auth';
import { Firestore, collection, addDoc, doc, setDoc, onSnapshot } from '@angular/fire/firestore';
//import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, Observable, Subscription } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { Store } from '@ngrx/store';
import * as authActions from '../auth/auth.actions';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user: Usuario | null = null;
  userSubs!: Subscription;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private store: Store
  ) {
  }

  // crearUsuario(nombre: string, email: string, password: string){

  //   const ref = collection(this.firestore, 'usuarios')

  //   return addDoc(ref,{nombre, email, password} )
  // }

  get user() {
    return { ...this._user };
  }

  initAuthListener() {
    authState(this.auth).subscribe(fuser => {
      // console.log(fuser);
      // console.log(fuser?.uid);
      // console.log(fuser?.email);
      if (fuser) {
        const docRef = doc(this.firestore, fuser.uid, 'usuario');
        // estatico
        // const docSnap = (await getDoc(docRef)).data() 

        // tiempo real
        const userUnSubs = onSnapshot(docRef, (doc) => {
          const tempUser = new Usuario(doc.data()?.['uid'], doc.data()?.['nombre'], doc.data()?.['email'])
          this.store.dispatch(authActions.setUser({ user: { ...tempUser } }))
          this._user = tempUser;

        }, err => console.log);



      } else {
        this._user = null;
        this.store.dispatch(ingresoEgresoActions.unSetItems())
        this.store.dispatch(authActions.unSetUser());
      }


    })
  }

  crearUsuario(nombre: string, email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password).then(({ user }) => {
      const newUser = new Usuario(user.uid, nombre, email);
      const docRef = doc(this.firestore, user.uid, 'usuario');
      return setDoc(docRef, { ...newUser })

    })

  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  logout() {
    return signOut(this.auth)
  }

  isAuth() {
    return authState(this.auth).pipe(
      map(fbUser => fbUser != null)
    )
  }



}
