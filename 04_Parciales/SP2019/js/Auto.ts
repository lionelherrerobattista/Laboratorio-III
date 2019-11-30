namespace vehiculos
{
    export class Auto extends Vehiculo{

        private cantidaPuertas:number;

        constructor(id:number, marca:string, modelo:string, precio:number, cantidadPuertas:number)
        {
            super(id, marca, modelo, precio);

            this.cantidaPuertas = cantidadPuertas;
        }

        getCantidadPuertas(){
            return this.cantidaPuertas;
        }

    }
}