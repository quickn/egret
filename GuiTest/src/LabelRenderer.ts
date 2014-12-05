/**
 * Created by Administrator on 2014/12/5.
 */



class LabelRenderer extends egret.gui.ItemRenderer
 {
      public constructor(){
              super();
              this.touchChildren = true;
          }
      public dataChanged():void{
          this.labelDisplay.text = this.data.label;
      }
  }