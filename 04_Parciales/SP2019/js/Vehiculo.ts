namespace vehiculos
{
    export abstract class Vehiculo{

        private id:number;
        private marca:string;
        private modelo:string;
        private precio:number;
        

        constructor(id:number, marca:string, modelo:string, precio:number)
        {
            this.id = id;
            this.marca = marca;
            this.modelo = modelo;
            this.precio = precio;
        }

        getId(){
            return this.id;
        }

        getMarca(){
            return this.marca;
        }

        getModelo(){
            return this.modelo;
        }

        getPrecio(){
            return this.precio;
        }


    }
}