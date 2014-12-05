/**
 * Created by Administrator on 2014/12/4.
 */
class ListTest extends egret.gui.SkinnableContainer {



    public constructor(){
        super();
        this.createToggleRendererSkin();
    }


    public createDataGroup():void{
        var sourceArr:any[] = [];
        for (var i:number = 1; i < 5; i++)
         {
             sourceArr.push({label:"item"+i,checked:false});
         }
         //用ArrayCollection包装
         var myCollection:egret.gui.ArrayCollection = new egret.gui.ArrayCollection(sourceArr);

        var dataGroup:egret.gui.DataGroup = new egret.gui.DataGroup();
         dataGroup.dataProvider = myCollection;
         dataGroup.percentWidth = 100;
         dataGroup.percentHeight = 100;
         dataGroup.itemRendererSkinName = "skins.simple.ToggleRendererSkin";
         this.addElement(dataGroup);

        dataGroup.itemRenderer = new egret.gui.ClassFactory(ToggleRenderer);

        this.addElement(dataGroup);
    }


    public createToggleRendererSkin():void{
        var sourceArr:any[] = [];
        for (var i:number = 1; i < 20; i++)
        {
            sourceArr.push({label:"item"+i,checked:false});
        }
        //用ArrayCollection包装
        var myCollection:egret.gui.ArrayCollection = new egret.gui.ArrayCollection(sourceArr);

        var dataList:egret.gui.List = new egret.gui.List();
        dataList.dataProvider = myCollection;
        dataList.percentWidth = 100;
        dataList.percentHeight = 100;
        //判断组件尺寸，确定同时能显示的最大个数
        dataList.useVirtualLayout=true;
        //默认选项
        dataList.selectedIndex = 1;
        dataList.itemRendererSkinName = "skins.simple.ToggleRendererSkin";
        dataList.selectedItem = myCollection.getItemAt(2);//索引从0开始计算，所以2代表第三项数据
        dataList.itemRenderer = new egret.gui.ClassFactory(ToggleRenderer);
        //this.addElement(dataList);

        var vLayout:egret.gui.VerticalLayout = new egret.gui.VerticalLayout();
        vLayout.horizontalAlign = egret.HorizontalAlign.CONTENT_JUSTIFY;
        vLayout.gap = 2;
        dataList.layout = vLayout;

        this.addElement(dataList);

    }


    public createListItem():void{
        //this.skinName = "skin";

        var sourceArr:any[] = [];
        for (var i:number = 1; i < 50; i++)
        {
            sourceArr.push({name:"item"+i});
        }
        //用ArrayCollection包装
        var myCollection:egret.gui.ArrayCollection = new egret.gui.ArrayCollection(sourceArr);
        //创建列表
        var dataList:egret.gui.List = new egret.gui.List();
        dataList.dataProvider = myCollection;
        dataList.percentWidth = 100;
        dataList.percentHeight = 100;
        dataList.labelField = "name";
        //判断组件尺寸，确定同时能显示的最大个数
        dataList.useVirtualLayout=true;
        //默认选项
        dataList.selectedIndex = 1;
        dataList.itemRendererSkinName = "skins.simple.ToggleRendererSkin";
        dataList.selectedItem = myCollection.getItemAt(2);//索引从0开始计算，所以2代表第三项数据
        this.addElement(dataList);

        dataList.addEventListener(egret.gui.IndexChangeEvent.CHANGE,this.listChangeHandler,this);

        dataList.addEventListener(egret.gui.ListEvent.ITEM_CLICK,this.listClickhandler,this);
    }
    public createList():void{
        this.skinName = "screenContentSkins.ListScreenSkin";

        var sourceArr:any[] = [];
        for (var i:number = 1; i < 50; i++)
        {
            sourceArr.push({name:"item"+i});
        }
        //用ArrayCollection包装
        var myCollection:egret.gui.ArrayCollection = new egret.gui.ArrayCollection(sourceArr);
        //创建列表
        var dataList:egret.gui.List = new egret.gui.List();
        dataList.dataProvider = myCollection;
        dataList.percentWidth = 100;
        dataList.percentHeight = 100;
        dataList.labelField = "name";
        //判断组件尺寸，确定同时能显示的最大个数
        dataList.useVirtualLayout=true;
        //默认选项
        dataList.selectedIndex = 1;
        dataList.selectedItem = myCollection.getItemAt(2);//索引从0开始计算，所以2代表第三项数据
        this.addElement(dataList);

        dataList.addEventListener(egret.gui.IndexChangeEvent.CHANGE,this.listChangeHandler,this);

        dataList.addEventListener(egret.gui.ListEvent.ITEM_CLICK,this.listClickhandler,this);
    }

    /**事件侦听*/
    private listChangeHandler(evt:egret.gui.IndexChangeEvent):void {
        var dataList:egret.gui.List = evt.currentTarget;
        console.log(evt.oldIndex+","+evt.newIndex);
        console.log(dataList.selectedItem.name);
    }

    /**事件侦听*/
    private listClickhandler(evt:egret.gui.ListEvent):void {
         var dataList:egret.gui.List = evt.currentTarget;
         console.log(evt.item.name+" clicked");
     }

}