var personas;
(function (personas) {
    var Persona = /** @class */ (function () {
        function Persona(nombre, apellido) {
            this.nombre = nombre;
            this.apellido = apellido;
        }
        Persona.prototype.getNombre = function () {
            return this.nombre;
        };
        Persona.prototype.getApellido = function () {
            return this.apellido;
        };
        return Persona;
    }());
    personas.Persona = Persona;
})(personas || (personas = {}));
