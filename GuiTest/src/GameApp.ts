/**
 * Created by Administrator on 2014/12/5.
 */
class GameApp extends egret.DisplayObjectContainer{

public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

public onAddToStage(event:egret.Event):void{
     var uiStage:egret.gui.UIStage = new egret.gui.UIStage();
      this.addChild(uiStage);

      //创建标题栏背景
      var asset:egret.gui.UIAsset = new egret.gui.UIAsset();
      asset.source = "header-background";
      asset.fillMode = egret.BitmapFillMode.REPEAT;
      asset.percentWidth = 100;
      asset.height = 90;
      uiStage.addElement(asset);

      //创建标题文本
      var title:egret.gui.Label = new egret.gui.Label();
      title.horizontalCenter = 0;
      title.top = 25;
      title.text = "Alert";
      uiStage.addElement(title);

      //创建返回按钮
      var backButton:egret.gui.Button = new egret.gui.Button();
     // backButton.skinName = BackButtonSkin;
      backButton.top = 16;
      backButton.left = 16;
      backButton.label = "Back";
      uiStage.addElement(backButton);

      //创建内容区域容器
      var contentGroup:egret.gui.Group = new egret.gui.Group();
      contentGroup.percentWidth = 100;
      contentGroup.top = 90;
      contentGroup.bottom = 0;
      uiStage.addElement(contentGroup);

      //创建"Show Alert"按钮
      var button:egret.gui.Button = new egret.gui.Button();
      //button.skinName = ButtonSkin;
      button.horizontalCenter = 0;
      button.verticalCenter = 0;
      button.label = "Show Alert";
      contentGroup.addElement(button);
  }
}