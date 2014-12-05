/**
 * Created by joketans-pc on 2014/11/12.
 */
class RunningLine extends egret.Sprite {
    public line:egret.Shape = null;
    public lineValue:number = 1;
    public maxValue:number = 1;

    constructor(maxValue:number) {
        super();
        this.maxValue = maxValue;
        this.createView();
    }

    public createView():void {
        this.width = Constant.StageW;
        this.height = 20;
        var backLine:egret.Shape = Util.drawRect(this.width, this.height, 0x3985d4, 0, 0x3985d4);
        this.addChild(backLine);
        this.line = Util.drawRect(1, this.height, 0x0db575, 0, 0x0db575);
        this.addChild(this.line);

    }

    public updateValue(value:number):void {
        if (this.lineValue == this.maxValue)return;
        var totalValue = value + this.lineValue + 1;
        var length = (totalValue / this.maxValue) * Constant.StageW;
        if (totalValue >= this.maxValue) length = Constant.StageW;
        var tw = egret.Tween.get(this.line);
        tw.to({scaleX: length}, 700)
    }

    public updateValueFast(value:number):void {
        if (this.lineValue == this.maxValue)return;
        var totalValue = value + this.lineValue + 1;
        var length = (totalValue / this.maxValue) * Constant.StageW;
        if (totalValue >= this.maxValue) length = Constant.StageW;
        this.line.scaleX = length;
    }
}