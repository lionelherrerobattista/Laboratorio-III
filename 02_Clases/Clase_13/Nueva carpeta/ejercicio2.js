var animales;
(function (animales) {
    function makeSounds() {
        var miPerro = new animales.Dog("Toby");
        var miGato = new animales.Cat("Gato", 7);
        //incluyo todos en un array tipado
        var lista = new Array();
        lista.push(miPerro);
        lista.push(miGato);
        //recorro el array y ejecuto la función
        lista.forEach(function (animal) {
            animal.makeSound();
        });
    }
    animales.makeSounds = makeSounds;
})(animales || (animales = {}));
