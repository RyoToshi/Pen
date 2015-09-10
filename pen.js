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
            console.log("Your writing tool is empty, recharge it");
        }
    } else {
        console.log("Your writing tool is empty, recharge it")
    }
};
//======================Test===========================


function testPen(it, times) {
    for (var i = 0; times > i; i++) {
        it.writeText("Good by brutal world !!!");
    }
}

console.log("____________Pen______________")
console.log("=============================");
var pen = new Pen("red");
testSupply(pen, 14);
pen.rechargeInk();
testSupply(pen, 10);