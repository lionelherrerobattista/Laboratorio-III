var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var animales;
(function (animales) {
    var Cat = /** @class */ (function (_super) {
        __extends(Cat, _super);
        function Cat(name, vidas) {
            var _this = _super.call(this, name) || this;
            if (vidas != undefined) {
                _this.vidas = vidas;
            }
            return _this;
        }
        Cat.prototype.makeSound = function () {
            console.log("Miau! " + this.name);
        };
        return Cat;
    }(animales.Animal));
    animales.Cat = Cat;
})(animales || (animales = {}));
