namespace personas
{
    export class Profesor extends Persona{

        private cuil:string;

        constructor(nombre:string, apellido:string, cuil:string)
        {
            super(nombre, apellido);

            this.cuil = cuil;
        }

        getCuil():string{
            return this.cuil;
        }

    }
}