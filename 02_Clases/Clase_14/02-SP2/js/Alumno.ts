namespace Personas{

    export class Alumno extends Persona{

        private legajo:number;

        constructor(nombre:string, apellido:string, edad:number, sexo:string, legajo:number)
        {
            super(nombre, apellido, edad, sexo);

            this.legajo = legajo;
        }

        //Getters
        getLegajo():number{
            return this.legajo;
        }

    }
}