import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user } from '@angular/fire/auth';
import { Firestore, collection, addDoc, doc, setDoc  } from '@angular/fire/firestore';
//import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';



@Injectable({
  providedIn: 'root'
})
export class AuthService {



  constructor( 
    private auth: Auth,
    private firestore: Firestore
    ) {
  }

  // crearUsuario(nombre: string, email: string, password: string){

  //   const ref = collection(this.firestore, 'usuarios')

  //   return addDoc(ref,{nombre, email, password} )
  // }

  initAuthListener(){
    return authState(this.auth).subscribe( fuser => {
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
