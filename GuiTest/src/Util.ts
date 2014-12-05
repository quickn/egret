/**
 * Created by joketans-pc on 2014/11/10.
 */
class Util {
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
    public static createBitmapByName(name:string):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * x,y等比缩放
     * @param obj
     * @param size
     */
    public static scale(obj:egret.DisplayObject, size:number) {
        obj.scaleX = size;
        obj.scaleY = size;
    }

    public static anchorCenter(obj:egret.DisplayObject) {
        obj.anchorX = 0.5;
        obj.anchorY = 0.5;
    }

    public static text(size:number, content:string, x:number, y:number, color:number, align:any, valign:any) {
        var text:egret.TextField = new egret.TextField();
        text.text = content;
        if (size != null)
            text.size = size;
        if (color != null)
            text.textColor = color;
        if (align)
            text.textAlign = align;
        if (x)
            text.x = x;
        if (y)
            text.y = y;
        if (valign != null)
            text.verticalAlign = valign;
        return text;
    }

    public static shapeBtn(text:string, textcolor:number, color:number):egret.Sprite {
        var btn:egret.Sprite = new egret.Sprite();

        btn.width = 250;
        btn.height = 70;
        var shp:egret.Shape = new egret.Shape();
        shp.graphics.beginFill(color, 1);
        shp.graphics.drawRect(0, 0, btn.width, btn.height);
        shp.graphics.endFill();
        var tf:egret.TextField = Util.text(30, text, 0, 0, textcolor, "center", "middle");
        tf.width = btn.width;
        tf.height = btn.height;
        btn.addChild(shp);
        btn.addChild(tf);
        return btn;
    }

    /**
     * 简单从0,0 画图开始
     * @param width
     * @param height
     * @param color
     * @returns {egret.Shape}
     */
    public static drawRect(width:number, height:number, color:number, borderSize:number, borderColor:number):egret.Shape {
        var shp:egret.Shape = new egret.Shape();
        shp.graphics.beginFill(color, 1);
        if (borderSize != null && borderSize != 0)
            shp.graphics.lineStyle(borderSize, borderColor);
        shp.graphics.drawRect(0, 0, width, height);
        shp.graphics.endFill();
        return shp;
    }

    /**
     *
     * @param borderSize
     * @param borderColor
     * @param insideColor
     * @param radiusVal
     * @returns {egret.Shape}
     */
    public static drawCircle(borderSize:number, borderColor:number, insideColor:number, radiusVal:number, x:number, y:number):egret.Shape {
        var shp:egret.Shape = new egret.Shape();
        shp.x = x;

        shp.graphics.lineStyle(borderSize, borderColor);
        shp.graphics.beginFill(insideColor, 1);
        shp.graphics.drawCircle(0, 0, radiusVal);
        shp.graphics.endFill();
        return shp;
    }

    public static viewRunInOut(view:egret.DisplayObjectContainer, finishIn:Function, finishOut:Function):void {
        var tw = egret.Tween.get(view);
        tw.wait(600).to({x: 0}, 500, egret.Ease.backIn).wait(700).call(function () {
            finishIn();
        }).to({x: -Constant.StageW}, 500, egret.Ease.backInOut).call(function () {
            finishOut();
        })
    }

    /**
     * 请求网络
     * @param endFunc
     */
    public static getRequest(url:string, endFunc):void {
        var url:string = url;
        var loader:egret.URLLoader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        loader.addEventListener(egret.Event.COMPLETE, function (event:egret.Event) {
            var loader:egret.URLLoader = <egret.URLLoader> event.target;
            var data:egret.URLVariables = loader.data;
            console.log(data.toString());
            var jsonObj:any = JSON.parse(data.toString());
            if (jsonObj.status = 200) {
                endFunc(jsonObj);
            } else if (jsonObj.status != 200) {
                Util.consoleRequestErr(url, data.toString());
            }
        }, this);
        loader.load(new egret.URLRequest(url));
    }

    public static backTest(endFunc):void {
        var jsonObj:any = JSON.parse('{"success":true,"data":{"url":"http://305603fa.ngrok.com/brain/share/recordId:21"},"status":200} ');
        if (jsonObj.status = 200) {
            endFunc(jsonObj);
        }
    }

    public static toGen(symbol:number, val:number, tVal:number):number {
        var totalVal:number = tVal;
        switch (symbol) {
            case 1:
                totalVal = totalVal + totalVal;
                break;
            case 2:
                totalVal = totalVal - val;
                break;
            case 3:
                totalVal = totalVal * val;
                break;
        }

        return totalVal;
    }

    /**
     * 记录request错误
     * @param url
     * @param response
     */
    public static consoleRequestErr(url:string, response:string):void {
        console.log("request err--url:" + url + ",response:" + response);
    }

    public static getFunnyWords():string {
        var words:Array<string> = ["国外流行的锻炼大脑游戏，靠谱吗？", "逻辑能力锻炼，这么高端?", "马德，这什么滑板鞋？！居然这么奇葩！", "逻辑这种东西，不多练练怎么行?", "我要打10个，点进来和我PK！"]
        var rIdx = Math.floor(Math.random() * words.length);
        return words[rIdx];
    }

    public static getFunnyWordsWithName(name:string, tips:string):string {
        var words:Array<string> = ["我跟你PK了" + name + "你造吗？", name + " 你觉得我的这个成绩怎么样?"]
        if (tips == "you_win") {
            words = words.concat([name + " 你还是太年轻,哈哈", "太弱了," + name + "你造吗？", "简直不堪一击呀，" + name]);
        } else {
            words = words.concat([name + " 再下服了", name + ",阿西吧!这一定是我手机问题", name + " 再来一局！"]);
        }
        var rIdx = Math.floor(Math.random() * words.length);
        return words[rIdx];
    }
}