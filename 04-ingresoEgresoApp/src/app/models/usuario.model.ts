import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler';
export class Usuario {
    constructor(
        public uid: string,
        public nombre: string,
        public email: string
    ){}
}