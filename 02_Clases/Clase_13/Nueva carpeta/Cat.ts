namespace animales{

    export class Cat extends Animal{
    
        private vidas:number;
    
        constructor(name:string, vidas:number)
        {
            super(name);
            if(vidas != undefined)
            {
                this.vidas = vidas;
            }
            
        }
    
        makeSound(){
            console.log("Miau! " + this.name);
        }
    }
}
