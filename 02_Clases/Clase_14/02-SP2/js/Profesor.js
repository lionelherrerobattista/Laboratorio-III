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
    var Profesor = /** @class */ (function (_super) {
        __extends(Profesor, _super);
        function Profesor(nombre, apellido, edad, sexo, cuil) {
            var _this = _super.call(this, nombre, apellido, edad, sexo) || this;
            _this.cuil = cuil;
            return _this;
        }
        //Getters
        Profesor.prototype.getcuil = function () {
            return this.cuil;
        };
        return Profesor;
    }(Personas.Persona));
    Personas.Profesor = Profesor;
})(Personas || (Personas = {}));
