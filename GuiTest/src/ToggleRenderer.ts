/**
 * Created by Administrator on 2014/12/5.
 */


class ToggleRenderer extends egret.gui.ItemRenderer
{
    public title:egret.gui.Label;
    public head:egret.gui.Label;
    public price:egret.gui.Label;
    //public myButton:egret.gui.Button;
    public UIAsset:egret.gui.UIAsset;
    public constructor(){
        super();
        this.touchChildren = true;
    }
    public dataChanged():void{
        console.log("data"+JSON.stringify(this.data));
        this.UIAsset.source = RES.getRes("avator");
        this.title.text = "幸福时光 商务休闲男装 加厚免烫衬衫男 修身格子条纹加绒男 保暖长袖衬衣男 C13 藏青加绒 XL";
        this.head.text = "拍下138元！加绒加厚衬衫！时尚又保暖！支持货到付款！包邮！";
        this.price.text = "￥138.00";
    }

}

