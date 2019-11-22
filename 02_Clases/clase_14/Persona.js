var personas;
(function (personas) {
    var Persona = /** @class */ (function () {
        function Persona(nombre, apellido) {
            this.nombre = nombre;
            this.apellido = apellido;
        }
        return Persona;
    }());
    personas.Persona = Persona;
})(personas || (personas = {}));
