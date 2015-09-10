/***
 * Ручка
 * @param color - цвет задается как в css
 * @constructor
 */
function Pen(color) {
    this.color = color;
    this.inkValue = 100; //кол-во пасты в ручке
    this.rechargeInk = function () {
        this.inkValue = 100;
    }; //end constructor

Pen.prototype.writeText = function (text) {
    if (this.inkValue > 0) {
        colorfulConsole(text.slice(0, this.inkValue),this.color);
        this.inkValue -= text.length;
        if (this.inkValue === 0) {
            console.log("Your pen is empty. please, recharge it");
        }
    } else {
        console.log("Your pen is empty. please, recharge it")
    }
};
//======================Test===========================


function testPen(it, times) {
    for (var i = 0; times > i; i++) {
        it.writeText("Bye bye");
    }
}

/***
 * Ручка становится автоматической
 * @param color - цвет задается как в css
 * @constructor
 */
function AutomaticPen(color) {
    Pen.apply(this, arguments);
    this.turnOn = false;
    this.turn = function () {
        return this.turnOn = !this.turnOn;
    };
}

AutomaticPen.prototype = Object.create(Pen.prototype);
AutomaticPen.prototype.constructor = AutomaticPen;


AutomaticPen.prototype.writeText = function (text) {
    if (this.turnOn) {
        Pen.prototype.writeText.apply(this, arguments);
    } else {
        console.log("Pen is turned off, turnOn it and write");
    }
    return this;
};




console.log("             Pen             ")
console.log("\n=============================");
var pen = new Pen("red");
testPen(pen, 14);
pen.rechargeInk();
testPen(pen, 10);

console.log("      AutomaticPen             ")
console.log("\n=============================");

var ap = new AutomaticPen("green");
console.log("Is Pen a prototype of AutomaticPen? "+Pen.prototype.isPrototypeOf(ap));
testPen(ap, 11);
ap.turn();
testPen(ap, 10);
ap.rechargeInk();
testPen(ap, 2);
