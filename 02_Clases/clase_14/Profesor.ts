namespace personas
{
    export class Profesor extends Persona{

        private cuil:number;

        constructor(nombre:string, apellido:string, cuil:number)
        {
            super(nombre, apellido);

            this.cuil = cuil;
        }

    }
}