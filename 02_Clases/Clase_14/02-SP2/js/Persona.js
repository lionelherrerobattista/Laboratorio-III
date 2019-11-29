var Personas;
(function (Personas) {
    var Persona = /** @class */ (function () {
        function Persona(nombre, apellido, edad, sexo) {
            this.nombre = nombre;
            this.apellido = apellido;
            this.edad = edad;
            this.sexo = sexo;
        }
        //Getters
        Persona.prototype.getNombre = function () {
            return this.nombre;
        };
        Persona.prototype.getApellido = function () {
            return this.apellido;
        };
        Persona.prototype.getEdad = function () {
            return this.edad;
        };
        Persona.prototype.getSexo = function () {
            return this.sexo;
        };
        return Persona;
    }());
    Personas.Persona = Persona;
})(Personas || (Personas = {}));
