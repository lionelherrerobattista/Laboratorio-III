namespace Personas{

    export class Profesor extends Persona{

        private cuil:number;

        constructor(nombre:string, apellido:string, edad:number, sexo:string, cuil:number)
        {
            super(nombre, apellido, edad, sexo);

            this.cuil = cuil;
        }

        //Getters
        getcuil():number{
            return this.cuil;
        }

    }
}