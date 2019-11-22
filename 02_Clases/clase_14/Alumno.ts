namespace personas
{
    export class Alumno extends Persona{

        private legajo:number;

        constructor(nombre:string, apellido:string, legajo:number)
        {
            super(nombre, apellido);

            this.legajo = legajo;
        }



    }
}