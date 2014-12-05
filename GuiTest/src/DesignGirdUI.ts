/**
 * Created by joketans-pc on 2014/11/24.
 */
class DesignGirdUI extends egret.Sprite {
    public constructor() {
        super();
        this.createView();
    }

    public   createView():void {
        this.width = 600;
        this.height = 377;
        var rect = Util.drawRect(this.width, this.height, 0x626778, null, null);
        this.addChild(rect);
        this.touchEnabled = true;
        var testArray:Array<GridObject> = new Array<GridObject>();
        for (var i:number = 0; i < 40; i++) {
            var row = Math.floor(i / 8);
            var col = i % 8;
            var lineOffsetRow = row * 2;
            var lineOffesetCol = col * 2;
            for (var k:number = 1; k < 8; k++) {
                var grid = new GridObject();
                grid.x = k * 9 + lineOffesetCol + col * 72;
                grid.y = (72 - 2) / 2 + row * 72 + lineOffsetRow;
                this.addChild(grid);
                testArray.push(grid);
            }


            var col = Math.floor(i / 8);
            var row = i % 8;
            var lineOffsetRow = row * 2;
            var lineOffesetCol = col * 2;
            for (var k:number = 1; k < 8; k++) {
                if (k == 4) continue;
                var grid = new GridObject();
                this.addChild(grid);
                grid.x = (72 - 2) / 2 + row * 72 + lineOffsetRow;
                grid.y = k * 9 + lineOffesetCol + col * 72;
                testArray.push(grid);
            }
        }

        var btn:egret.TextField=Util.text(30,"导出",100,400,0xff0000,"center",null);
        btn.touchEnabled=true;
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
            var text:string = "";
            for (var l:number = 0; l < testArray.length; l++) {
                text = text + testArray[l].code + ",";
            }
            console.log("array:" + text);
        },this);
        this.addChild(btn);


    }
}
