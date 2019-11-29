namespace personas
{
    export abstract class Persona{

        private nombre:string;
        private apellido:string;

        constructor(nombre:string, apellido:string)
        {
            this.nombre = nombre;
            this.apellido = apellido;
        }

         getNombre():string{
             return this.nombre;
         }

         getApellido():string{
             return this.apellido;
         }

    }
}