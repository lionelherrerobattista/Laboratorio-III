namespace vehiculos
{
    export class Camioneta extends Vehiculo{

        private cuatroXcuatro:boolean;

        constructor(id:number, marca:string, modelo:string, precio:number, cuatroXcuatro:boolean)
        {
            super(id, marca, modelo, precio);

            this.cuatroXcuatro = this.cuatroXcuatro;
        }

    }
}