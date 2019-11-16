//solo declaración
// interface Animal{
//     name:string;
//     makeSound():void;
// }
var animales;
(function (animales) {
    //export para mostrarlo para todo el namespace
    var Animal = /** @class */ (function () {
        function Animal(name) {
            this.name = name;
        }
        Animal.prototype.makeSound = function () { };
        ;
        return Animal;
    }());
    animales.Animal = Animal;
})(animales || (animales = {}));
