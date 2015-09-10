/***
 * Ручка-трансформер
 * created by Bolkhovskiy Alexey
 * 10.09.2015
 */


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

/***
 * Механический карандаш
 * @param color - цвет задается как в css
 * @constructor
 */

function MechanicalPencil(color) {
    AutomaticPen.apply(this, arguments);
    this.writtenText = "";
}
MechanicalPencil.prototype = Object.create(AutomaticPen.prototype);
MechanicalPencil.prototype.constructor = MechanicalPencil;

MechanicalPencil.prototype.eraseble = true;
MechanicalPencil.prototype.writeText = function (text) {
    var oldInkLevel = this.inkValue;
    AutomaticPen.prototype.writeText.apply(this, arguments);
    var difference = oldInkLevel - this.inkValue;

    if (difference !== 0) {
        if (text.length > difference) {
            this.writtenText = text.slice.apply(0, difference);
        } else {
            this.writtenText = text;
        }
    }
    // return this;
};
/***
 * Удаляет промежутки написаного текста (ластик на карандаше)
 * @param start - начинает стирать этого символа
 * @param stop - заканчивает стирать
 */

MechanicalPencil.prototype.eraseWrittenText = function (start, stop) {
    if (this.erasable) {
        if (this.writtenText.length > 0 && (stop < this.writtenText.length)) {
            var tmp = this.writtenText;
            var empty = " ";
            for (var i = start; stop > i; i++) {
                empty = empty + " ";
            }
            this.writtenText = tmp.substring(0, start) + empty + tmp.substring(stop + 1);
            colorfulConsole(this.writtenText,this.color);
        } else {
            console.log("You must write some text, and then erase it");
        }
    } else {
        console.log("You can't erase this text");
    }
    return this;
};

/***
 * авторучка с множеством паст (MultiColor)
 * @param colorArray - масив цветов ["red", "#000000", "green"]
 * @constructor
 */
function MultiColorPen(colorArray) {
    MechanicalPencil.apply(this, arguments);
    this.colorArray = colorArray;
    this.inkValueArray = [100];
    this.currentColor = 0;
    this.color = this.colorArray[this.currentColor];

}

MultiColorPen.prototype = Object.create(MechanicalPencil.prototype);
MultiColorPen.prototype.constructor = MultiColorPen;

MechanicalPencil.prototype.erasable = false;
MultiColorPen.prototype.switchColor = function () {
    var tempNum = this.currentColor;
    if (this.colorArray.length >= tempNum + 1) {
        tempNum++;
    } else {
        tempNum = 0;
    }
    if (this.inkValueArray[tmpNum] === undefined) {
        this.inkValueArray.push(100);
    }
    this.inkValueArray[this.currentColor]=this.inkValue;
    this.currentColor = tempNum;
    this.color = this.colorArray[this.currentColor];
    this.inkValue = this.inkValueArray[this.currentColor];
    colorfulConsole(" " + this.color + " color selected",this.color);
};



//========================Testing========================

console.log("             Pen             ")
console.log("\n========================");
var pen = new Pen("red");
testPen(pen, 14);
pen.rechargeInk();
testPen(pen, 10);

console.log("      AutomaticPen             ")
console.log("\n========================");

var ap = new AutomaticPen("blue");
console.log("Hmm...Is Pen a prototype of AutomaticPen? "+Pen.prototype.isPrototypeOf(ap));
testPen(ap, 11);
ap.turn();
testPen(ap, 10);
ap.rechargeInk();
testPen(ap, 2);

console.log("\n=======MultiColorPen=======");

var mcp = new MultiColorPen(["red", "blue", "green"]);
mcp.writeText("Hello mad world! ^.^");
testSupply(mcp, 10);
mcp.turn();
testSupply(mcp, 10);
mcp.switchColor();
testSupply(mcp, 10);
mcp.switchColor();
testSupply(mcp, 10);
mcp.rechargeInk();
mcp.switchColor();
mcp.switchColor();
mcp.switchColor();
testSupply(mcp, 5);
mcp.switchColor();
mcp.rechargeInk();
testSupply(mcp, 3);
mcp.erasWrittenText(5, 10);