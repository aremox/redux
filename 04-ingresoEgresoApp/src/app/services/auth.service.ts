import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user } from '@angular/fire/auth';
import { Firestore, collection, addDoc, doc, setDoc  } from '@angular/fire/firestore';
//import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { Store } from '@ngrx/store';
import * as authActions from '../auth/auth.actions';
import { getDoc } from '@firebase/firestore';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user: Usuario | null = null;

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

  get user(){
    return {...this._user };
  }

  initAuthListener(){
    return authState(this.auth).subscribe( async fuser => {
      // console.log(fuser);
      // console.log(fuser?.uid);
      // console.log(fuser?.email);
      if(fuser){
        const docRef = doc(this.firestore, fuser.uid, 'usuario');
        const docSnap = (await getDoc(docRef)).data()
        const tempUser = new Usuario(docSnap?.['uid'], docSnap?.['nombre'], docSnap?.['email'])
        this.store.dispatch( authActions.setUser({user: {...tempUser}}))
        this._user = tempUser;

      }else{
        this._user = null;
        this.store.dispatch( authActions.unSetUser());
      }

      
    })
  }

  crearUsuario(nombre: string, email: string, password: string){
    return createUserWithEmailAndPassword(this.auth, email, password).then(({user}) => {
      const newUser = new Usuario( user.uid, nombre, email);
      const docRef = doc(this.firestore, user.uid, 'usuario');
      return setDoc(docRef,{...newUser} )
      
    })

  }

  login(email: string, password: string){
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  logout(){
    return signOut(this.auth)
  }

  isAuth(){
    return authState(this.auth).pipe(
      map( fbUser => fbUser != null )
    )
  }



}
