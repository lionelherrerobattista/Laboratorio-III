namespace Personas {

    export abstract class Persona{

        private nombre:string;
        private apellido:string;
        private edad:number;
        private sexo:string;

        constructor(nombre:string, apellido:string, edad:number, sexo:string)
        {
            this.nombre = nombre;
            this.apellido = apellido;
            this.edad = edad;
            this.sexo = sexo;
        }

        //Getters
        getNombre():string{

            return this.nombre
        }

        getApellido():string{
            return this.apellido
        }

        getEdad():number{
            return this.edad
        }

        getSexo():string{
            return this.sexo
        }
    }



}