namespace animales{

    export function makeSounds():void{
        var miPerro:Dog = new Dog("Toby");
        var miGato:Cat = new Cat("Gato", 7);
    
        //incluyo todos en un array tipado
        var lista:Array<Animal> = new Array<Animal>();
    
        lista.push(miPerro);
        lista.push(miGato);
    
        //recorro el array y ejecuto la función
        lista.forEach(function(animal){
            animal.makeSound();
        })
    }
}
