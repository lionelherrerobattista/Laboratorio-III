namespace personas
{
    export class Alumno extends Persona{

        private legajo:string;

        constructor(nombre:string, apellido:string, legajo:string)
        {
            super(nombre, apellido);

            this.legajo = legajo;
        }

        getLegajo():string{
            return this.legajo;
        }



    }
}