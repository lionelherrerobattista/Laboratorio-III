var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Personas;
(function (Personas) {
    var Alumno = /** @class */ (function (_super) {
        __extends(Alumno, _super);
        function Alumno(nombre, apellido, edad, sexo, legajo) {
            var _this = _super.call(this, nombre, apellido, edad, sexo) || this;
            _this.legajo = legajo;
            return _this;
        }
        //Getters
        Alumno.prototype.getLegajo = function () {
            return this.legajo;
        };
        return Alumno;
    }(Personas.Persona));
    Personas.Alumno = Alumno;
})(Personas || (Personas = {}));
