import { Injectable } from '@angular/core';
import { doc, Firestore, setDoc, addDoc, collection, getDoc, query, getDocs, DocumentData, QuerySnapshot, collectionData, deleteDoc } from '@angular/fire/firestore';
import { of, Observable } from 'rxjs';
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
    delete ingresoEgreso.id;
    console.log('servicio crear:',ingresoEgreso)
    const id = new Date().getTime()
    const uid: string = this.authService.user.uid!;
    const docRef = doc(this.firestore, uid, 'ingreso-egreso', 'item', `${uid}_${id}`);
  
    
    return setDoc(docRef,{...ingresoEgreso} ).then( () => console.log('exito!')).catch(err => console.log(err));
  }

  // Estatico 
  async initIngresosEgresosListener(uid: string){

    const colRef = collection(this.firestore, uid, 'ingreso-egreso', 'item');
    const result = await getDocs(query(colRef));
    const data =  this.getArrayFromCollection( result);
    return data;

  }

  // En tiempo real
  getIngresosEgresos(uid: string): Observable<IngresoEgreso[]> {
    const colRef = collection(this.firestore, uid, 'ingreso-egreso', 'item');
    return collectionData(colRef, {idField: 'id'}) as Observable<IngresoEgreso[]>;

  }


  getArrayFromCollection = (collection: QuerySnapshot<DocumentData>) => {
    return collection.docs.map(doc => {
        return { ...doc.data(), id: doc.id };
    });
  }

  async borrarIngresoEgreso(uidItem: string){
    const uid: string = this.authService.user.uid!;
    const colRef = collection(this.firestore, uid, 'ingreso-egreso', 'item');
    return await deleteDoc(doc(colRef, uidItem));
  }
}


