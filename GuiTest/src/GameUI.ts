/**
 * Created by joketans-pc on 2014/11/20.
 */

class GameUI extends egret.Sprite {
    public   parentView:Main;
    public isMoving:boolean;
    public wheel:WheelPanel;
    public worldPanel:WorldPanel;
    public myScoreText:egret.TextField;


    public myHighScoreText:egret.TextField;
    public gameLength:number = 5;
    public score = 0;
    public transTick = 3;
    public sucBit:egret.Bitmap = null;
    public failedBit:egret.Bitmap = null;
    public runningLine:RunningLine = null;

    public highScore:number = 0;
    public myName:string = null;
    public myAvatarUrl:string = null;
    public versusName:string = null;
    public changeText:egret.TextField;

    public constructor(parent:Main) {
        super();
        this.parentView = parent;
        this.init();
        this.createView();
        this.startGame();
        //展示头顶
        var headView:egret.Sprite = this.createHeadView();
        this.addChild(headView);

        //添加百分比条
        this.runningLine = new RunningLine(this.highScore);
        this.runningLine.y = 105;
        this.addChild(this.runningLine);
        if (GameMap.nowLevel > 1) {
            this.score = GameMap.tempScore;
            this.runningLine.updateValueFast(GameMap.tempScore);
            this.myScoreText.text = GameMap.tempScore + "";
        }
        if (GameMap.nowLevel == 1) {
            var text = Util.text(20, "使用方向按钮控制小白，一定要在小黑前面抢到滑板鞋哦！", 0, 560, 0xffffff, "center", null);
            text.width = Constant.StageW;
            this.changeText = text;
            this.addChild(text);
        } else if (GameMap.nowLevel < 4) {
            var text = Util.text(20, "绿色代表向上现在的位置,大脑赶紧动起来", 0, 560, 0xffffff, "center", null);
            text.width = Constant.StageW;
            this.addChild(text);
        }
    }

    public startGame():void {
        var self = this;
        if (this.transTick > 0 && GameMap.nowLevel == 1) {
            var transView:egret.Sprite = new egret.Sprite();
            Constant.keys = Constant.MyInfo.token;
            transView.x = Constant.StageW / 2;
            transView.y = (Constant.StageH) / 2 - 125;
            var nums:egret.TextField = Util.text(30, this.transTick + "", -15, -15, 0xffffff, "center", null);
            nums.width = 30;
            var shp:egret.Shape = new egret.Shape();
            shp.graphics.lineStyle(0, 0x3984d5);
            shp.graphics.beginFill(0x3984d5, 1);
            shp.graphics.drawCircle(0, 0, 20);
            shp.graphics.endFill();
            transView.addChild(shp);
            transView.addChild(nums);
            var tw = egret.Tween.get(transView);
            tw.to({scaleX: 2, scaleY: 2}, 300).wait(400).call(function () {
                self.removeChild(transView);
                self.transTick = self.transTick - 1;
                self.startGame();
            });
            this.addChild(transView);
        } else {
            this.wheel.touchEnabled = true;
            this.worldPanel.aiTimer.start();
            this.worldPanel.aiRun();
        }
    }

    public finishGame(winner:string):void {
        var self = this;
        this.worldPanel.aiTimer.stop();
        this.worldPanel.endTouch();
        if (winner == "player") {
            GameMap.nowLevel = GameMap.nowLevel + 1;
            self.wheel.touchEnabled = false;
            var totalScore:number = Math.ceil((GameMap.bestSteps / self.worldPanel.myStep) * GameMap.bestScore);
            totalScore = totalScore > GameMap.bestScore ? GameMap.bestScore : totalScore;
            this.score = this.score + totalScore;
            GameMap.tempScore = this.score;
            this.updateScore(this.score);
            GameMap.initMap();
            egret.Tween.get(this).wait(800).call(function () {
                var nextRoundView:NextRoundView = new NextRoundView(GameMap.nowLevel, GameMap.bestScore);
                nextRoundView.x = Constant.StageW;
                nextRoundView.width = Constant.StageW;
                nextRoundView.height = Constant.StageH;
                self.addChild(nextRoundView);
                Util.viewRunInOut(nextRoundView, function () {
                    if (self.worldPanel != null)self.removeChild(self.worldPanel);
                }, function () {
                    self.wheel.touchEnabled = true;
                    self.nextGame();
                })
            })

        } else {
            egret.Tween.get(this).wait(800).call(function () {
                var view:egret.Sprite = self.faildView();
                self.addChild(view);
            })
            this.uploadData();
        }

    }

    public updateScore(addScore:number):void {
        this.runningLine.updateValue(addScore);
        this.myScoreText.text = this.score + "";


    }

    public createHeadView():egret.Sprite {
        this.highScore = Constant.MyInfo.playType == "pk" ? Constant.MyInfo.sharedPlayer.score : Constant.MyInfo.userJson.currScore.scoreMax;
        var view:egret.Sprite = new egret.Sprite();
        var shp:egret.Shape = Util.drawRect(Constant.StageW, 125, 0x333333, 0, 0x333333);
        view.addChild(shp);
        var headSprite:egret.Sprite = new egret.Sprite();
        headSprite.y = 15;
        var netHead:NetSprite = new NetSprite(Constant.MyInfo.currPlayer.avatarUrl, 76, 76);
        headSprite.addChild(netHead);
        var head:egret.Bitmap = Util.createBitmapByName("avatar_mine");
        headSprite.addChild(head);
        view.addChild(headSprite);
        var name = Util.text(20, Constant.MyInfo.currPlayer.nick, 90, 20, 0xffffff, null, null);
        var score = Util.text(25, 0 + "", 90, 45, 0xffffff, null, null);
        this.myScoreText = score;
        headSprite.addChild(name);
        headSprite.addChild(score);
        var head:egret.Bitmap = Util.createBitmapByName("avatar_friend");
        var versusHeadSprite:egret.Sprite = new egret.Sprite();
        versusHeadSprite.x = Constant.StageW - head.width;
        versusHeadSprite.y = 15;
        var vUrl:string = Constant.MyInfo.playType == "pk" ? Constant.MyInfo.sharedPlayer.player.avatarUrl : Constant.MyInfo.currPlayer.avatarUrl;
        var vNick:string = Constant.MyInfo.playType == "pk" ? Constant.MyInfo.sharedPlayer.player.nick : "我的历史最高";
        var versusNetHead:NetSprite = new NetSprite(vUrl, 76, 76);
        versusHeadSprite.addChild(versusNetHead);
        versusHeadSprite.addChild(head);
        view.addChild(versusHeadSprite);
        var name = Util.text(20, vNick, -140, 20, 0xffffff, "right", null);
        this.myHighScoreText = Util.text(25, this.highScore + "", -110, 45, 0xffffff, "right", null);
        name.width = 130;
        this.myHighScoreText.width = 100;
        versusHeadSprite.addChild(name);
        versusHeadSprite.addChild(this.myHighScoreText);
        return view;
    }

    public init():void {
        this.isMoving = false;
        this.wheel = new WheelPanel();
        this.addChild(this.wheel);
        GameMap.initMap();
    }

    public createView():void {
        this.wheel.touchEnabled = false;
        this.wheel.x = Constant.StageW / 2;
        this.wheel.y = Constant.StageH - this.wheel.height / 2 - 10;
        var worldPanel:WorldPanel = new WorldPanel(this);
        worldPanel.x = Constant.StageW / 2;
        worldPanel.y = 190 + worldPanel.height / 2;
        this.worldPanel = worldPanel;
        this.wheel.addEventListener("upBtn", worldPanel.upBtn, worldPanel);
        this.wheel.addEventListener("downBtn", worldPanel.downBtn, worldPanel);
        this.wheel.addEventListener("leftBtn", worldPanel.leftBtn, worldPanel);
        this.wheel.addEventListener("rightBtn", worldPanel.rightBtn, worldPanel);
        this.wheel.addEventListener("endTouch", worldPanel.endTouch, worldPanel);
        this.addEventListener(egret.Event.ENTER_FRAME, worldPanel.viewUpdate, worldPanel);
        this.addChild(worldPanel);
    }

    public nextGame():void {
        this.parentView.restartGame();
    }

    /***
     *游戏结束上传数据
     */
    public uploadData():void {
        var self = this;
        Util.getRequest(getHost() + "/brainRotationworld/tk?token=" + Constant.MyInfo.token, function (data:string) {
            Util.getRequest(getHost() + "/brainRotationworld/sd?token=" + Constant.MyInfo.token + "&score=" + self.score, function (data:string) {

            });
        });
    }

    public faildView():egret.Sprite {
        var scaleXVal:number = 0;
        var tipsText:string = null;
        if (this.score >= this.highScore) {
            scaleXVal = 300;
            tipsText = "you_win";
        } else {
            scaleXVal = this.score * 300 / this.highScore;
            tipsText = "you_lose";
        }

        var self = this;
        var view:egret.Sprite = new egret.Sprite();
        var shp:egret.Shape = Util.drawRect(Constant.StageW, Constant.StageH, 0x363951, 0, 0x363951);
        view.addChild(shp);
        var goodJob = Util.createBitmapByName(tipsText);
        goodJob.x = (Constant.StageW - goodJob.width) / 2;
        goodJob.y = 50;
        view.addChild(goodJob);


        var shareBtn:egret.Sprite = Util.shapeBtn("邀请好友PK", 0xfefefe, 0x0db575);
        shareBtn.touchEnabled = true;
        shareBtn.x = 50;
        shareBtn.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            self.getShareUrl("oneGuy", tipsText);
        }, this);
        shareBtn.y = 560;
        view.addChild(shareBtn);

        var restartBtn:egret.Sprite = Util.shapeBtn("周排行榜", 0x8e2c06, 0xe4cc6b);
        view.addChild(restartBtn);
        restartBtn.x = 350;
        restartBtn.y = 560;
        restartBtn.touchEnabled = true;
        restartBtn.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            window.location.href = getHost() + "/rank?gameCode=brainRotationworld&token=" + Constant.MyInfo.token;
        }, this);
        var weekRank:egret.Bitmap = Util.createBitmapByName("restart");
        weekRank.touchEnabled = true;
        weekRank.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            GameMap.nowLevel = 1;
            var obj:Main = <Main>self.parent;
            obj.restartGame();
        }, this);
        view.addChild(weekRank);
        weekRank.x = (Constant.StageW - weekRank.width) / 2
        weekRank.y = 680;

        var mineHead:egret.Sprite = this.resultHead("mine", Constant.MyInfo.currPlayer.avatarUrl, Constant.MyInfo.currPlayer.nick, Constant.MyInfo.currPlayer.province);
        mineHead.y = 270;
        mineHead.x = 60;
        view.addChild(mineHead);
        var vUrl:string = Constant.MyInfo.playType == "pk" ? Constant.MyInfo.sharedPlayer.player.avatarUrl : Constant.MyInfo.currPlayer.avatarUrl;
        var vNick:string = Constant.MyInfo.playType == "pk" ? Constant.MyInfo.sharedPlayer.player.nick : "我的历史最高";
        var highScoreHead:egret.Sprite = Constant.MyInfo.playType == "pk" ? this.resultHead("friend", vUrl, vNick, Constant.MyInfo.sharedPlayer.player.province)
            :
            this.resultHead("highScore", Constant.MyInfo.currPlayer.avatarUrl, "历史最高", Constant.MyInfo.currPlayer.province);

        highScoreHead.y = 270;
        highScoreHead.x = 480;
        view.addChild(highScoreHead);
        var totalBar:egret.Sprite = new egret.Sprite();
        var myScoreLabel:egret.TextField = Util.text(30, "SCORE", 0, -30, 0xb3b9c4, "left", null);
        var myScore:egret.TextField = Util.text(25, this.score + "", 10, 0, 0xb3b9c4, "center", null);
        totalBar.addChild(myScore);
        totalBar.addChild(myScoreLabel);
        totalBar.y = 450;
        totalBar.x = 50;
        var highScoreLine:egret.Shape = Util.drawRect(300, 60, 0x385d4, 0, 0x385d4);
        highScoreLine.y = -30;
        highScoreLine.x = 120;
        totalBar.addChild(highScoreLine);
        var myScoreLine:egret.Shape = Util.drawRect(1, 60, 0xdb575, 0, 0xdb575);
        myScoreLine.y = -30;
        myScoreLine.x = 120;
        totalBar.addChild(myScoreLine);
        var tw = egret.Tween.get(myScoreLine);
        tw.to({scaleX: scaleXVal}, 1000);

        var highScoreLabel:egret.TextField = Util.text(30, "SCORE", 430, -30, 0xb3b9c4, "left", null);
        var highScore:egret.TextField = Util.text(25, this.highScore + "", 440, 0, 0xb3b9c4, "center", null);
        totalBar.addChild(highScoreLabel);
        totalBar.addChild(highScore);

        view.addChild(totalBar);
        return view;

    }

    /**
     * 得到分享的URL
     */
    public getShareUrl(type:string, tips:string):void {
        var self = this;
        var ui:GuideToShareUI = new GuideToShareUI();
        ui.y = -125;
        this.addChild(ui);
        var desc = "";
        if (type == "oneGuy") desc = Util.getFunnyWords();
        else desc = Util.getFunnyWordsWithName(Constant.MyInfo.sharedPlayer.player.nick, tips);
        Util.getRequest(getHost() + "/brainRotationworld/pkUrlGet/" + this.score + "?token=" + Constant.MyInfo.token, function (obj:any) {
            console.log("获取分享的URL:" + obj.data.url);
            WeixinApi.ready(function (api:WeixinApi) {
                var info:WeixinShareInfo = new WeixinShareInfo();
                info.title = "";
                info.desc = desc;//分享的内容 长度不能超过1K
                info.link = obj.data.url;//分享的连接
                info.imgUrl = "http://wx.kx88.cn/static/brainRotationworld/img/logo.jpg"; //分享图片的地址 图片大小不能超过32k，要加http开头
                var back = new WeixinShareCallbackInfo();
                back.all = function () {
                    setEventName(Constant.GameName, "游戏正常分享", "");
                    self.removeChild(ui);
                };
                back.confirm = function () {
                    setEventName(Constant.GameName, "游戏正常分享", "");
                    self.removeChild(ui);
                }
                api.shareToFriend(info, back);
                api.shareToTimeline(info, back);
            })
        })
    }

    /**
     * 结果头像
     * @returns {null}
     */
        //TODO key in here
    public  resultHead(type:string, avatarUrl:string, name:string, province:string):egret.Sprite {
        var view:egret.Sprite = new egret.Sprite();
        var bit:egret.Bitmap = null;
        if (type == "friend")bit = Util.createBitmapByName("avatar_friend_2");
        else if (type == "mine")bit = Util.createBitmapByName("avatar_mine_2");
        else if (type == "highScore")bit = Util.createBitmapByName("avatar_highScore_2");
        var nameText:egret.TextField = Util.text(20, name, -60, 85, 0xffffff, "center", null);
        nameText.width = 200;
        view.addChild(nameText);
        var provinceText:egret.TextField = Util.text(20, province, -60, 110, 0xffffff, "center", null);
        provinceText.width = 200;
        view.addChild(provinceText)
        var netHead:NetSprite = new NetSprite(avatarUrl, 76, 76);
        view.addChild(netHead);
        view.addChild(bit);

        return view;
    }

}