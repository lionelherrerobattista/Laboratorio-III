

//solo declaración
// interface Animal{
//     name:string;
//     makeSound():void;
// }

namespace animales
{
    //export para mostrarlo para todo el namespace
    export abstract class Animal{
        public name:string;
    
        constructor(name:string)
        {
            this.name = name;
        }
    
        makeSound(){};
    }
    
}
