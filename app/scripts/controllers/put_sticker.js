'use strict';


var stickers;

$(window).on('touchmove.noScroll', function(e) {
    e.preventDefault();
});

angular.module('stickrApp')
  .controller('EditPutStickerCtrl', function ($scope, $http) {
    $http.get('/api/awesomeThings').success(function (awesomeThings) {
        $scope.awesomeThings = awesomeThings;

        $scope.imgTabletop = [{
            'src': 'images/tabletop/surface.png',
            'width': 680,
            'height': 428
          }];
        $scope.backTabletop = [{
            'ref': $scope.imgTabletop[0],
            'x': 0,
            'y': 0,
            'angle': 0,
            'depth': 0
          }];

        $scope.imgStickers = [
          {
            'src': 'images/sticker/stickr_logo.png',
            'width': 160,
            'height': 80
          },
          {
            'src': 'images/sticker/adobe_dreamweaver.png',
            'width': 80,
            'height': 80
          },
          {
            'src': 'images/sticker/adove_ai.png',
            'width': 80,
            'height': 80
          },
          {
            'src': 'images/sticker/adove_fl.png',
            'width': 80,
            'height': 80
          },
          {
            'src': 'images/sticker/adove_ps.png',
            'width': 80,
            'height': 80
          },
          {
            'src': 'images/sticker/akatsuki.png',
            'width': 80,
            'height': 80
          },
          {
            'src': 'images/sticker/colo_01.png',
            'width': 80,
            'height': 80
          },
          {
            'src': 'images/sticker/chatworks.png',
            'width': 160,
            'height': 55
          },
          {
            'src': 'images/sticker/colo_c.png',
            'width': 80,
            'height': 80
          },
          {
            'src': 'images/sticker/ConoHa.png',
            'width': 80,
            'height': 80
          },
          {
            'src': 'images/sticker/corabbit.png',
            'width': 80,
            'height': 80
          },
          {
            'src': 'images/sticker/css3.png',
            'width': 80,
            'height': 80
          },
          {
            'src': 'images/sticker/DMTC.png',
            'width': 80,
            'height': 80
          },
          {
            'src': 'images/sticker/generace.png',
            'width': 80,
            'height': 80
          },
          {
            'src': 'images/sticker/donuts_logo.png',
            'width': 160,
            'height': 70
          },
          {
            'src': 'images/sticker/drecom_hentai.png',
            'width': 160,
            'height': 80
          },
          {
            'src': 'images/sticker/drecom.png',
            'width': 160,
            'height': 80
          },
          {
            'src': 'images/sticker/gaiax.png',
            'width': 160,
            'height': 80
          },
          {
            'src': 'images/sticker/gloops.png',
            'width': 160,
            'height': 99
          },
          {
            'src': 'images/sticker/h1_logo.png',
            'width': 160,
            'height': 30
          },
          {
            'src': 'images/sticker/github.png',
            'width': 80,
            'height': 80
          },
          {
            'src': 'images/sticker/oro.png',
            'width': 80,
            'height': 80
          },
          {
            'src': 'images/sticker/herlock_02.png',
            'width': 160,
            'height': 80
          },
          {
            'src': 'images/sticker/herlock.png',
            'width': 160,
            'height': 80
          },
          {
            'src': 'images/sticker/html5.png',
            'width': 80,
            'height': 80
          },
          {
            'src': 'images/sticker/IMG_3195.png',
            'width': 80,
            'height': 80
          },
          {
            'src': 'images/sticker/img_ss_hamee.png',
            'width': 80,
            'height': 80
          },
          {
            'src': 'images/sticker/javascript.png',
            'width': 80,
            'height': 80
          },
          {
            'src': 'images/sticker/klanb_games.png',
            'width': 160,
            'height': 50
          },
          {
            'src': 'images/sticker/leve_b.png',
            'width': 160,
            'height': 80
          },
          {
            'src': 'images/sticker/leve_w.png',
            'width': 160,
            'height': 80
          },
          {
            'src': 'images/sticker/logo_klab.png',
            'width': 80,
            'height': 80
          },
          {
            'src': 'images/sticker/logo_ver4.png',
            'width': 160,
            'height': 80
          },
          {
            'src': 'images/sticker/mercari.png',
            'width': 80,
            'height': 80
          },
          {
            'src': 'images/sticker/oisix.png',
            'width': 80,
            'height': 80
          },
          {
            'src': 'images/sticker/platform_01.png',
            'width': 160,
            'height': 80
          },
          {
            'src': 'images/sticker/pyfes.png',
            'width': 80,
            'height': 80
          },
          {
            'src': 'images/sticker/yeoman.png',
            'width': 80,
            'height': 80
          },
          {
            'src': 'images/sticker/riak_001.png',
            'width': 80,
            'height': 80
          },
          {
            'src': 'images/sticker/riak_003.png',
            'width': 80,
            'height': 80
          },
          {
            'src': 'images/sticker/riak_004.png',
            'width': 160,
            'height': 80
          },
          {
            'src': 'images/sticker/usagee.png',
            'width': 80,
            'height': 80
          },
          {
            'src': 'images/sticker/wakame.png',
            'width': 80,
            'height': 80
          },
          {
            'src': 'images/sticker/wordpress_logo_b.png',
            'width': 80,
            'height': 80
          },
          {
            'src': 'images/sticker/wordpress_logo.png',
            'width': 80,
            'height': 80
          },
          {
            'src': 'images/sticker/apprits_c1.png',
            'width': 80,
            'height': 80
          },
          {
            'src': 'images/sticker/apprits_c2.png',
            'width': 80,
            'height': 80
          },
          {
            'src': 'images/sticker/apprits_c3.png',
            'width': 80,
            'height': 80
          },
          {
            'src': 'images/sticker/cook.png',
            'width': 80,
            'height': 80
          },
          {
            'src': 'images/sticker/base.png',
            'width': 160,
            'height': 80
          },
          {
            'src': 'images/sticker/pixta_rect.png',
            'width': 160,
            'height': 80
          },
          {
            'src': 'images/sticker/supporters.png',
            'width': 160,
            'height': 80
          }
        ];

        $scope.putStickers = [
          {
            'ref': $scope.imgStickers[0],
            'x': -200,
            'y': -200,
            'depth': 0,
            'angle': 0
          }
        ];

        $scope.selectStickr = function (index) {
            console.log('select:'+index);
            $scope.putStickers.push(
              {
                'ref': $scope.imgStickers[index],
                'x': 100,
                'y': 100,
                'depth': 0,
                'angle': 0
              }
            );

            stickers.push($scope.putStickers[$scope.putStickers.length - 1]);

            var idx = stickers.length - 1;

            stickers[idx].ready = false;
            stickers[idx].selected = false;

            stickers[idx].img = new Image();
            stickers[idx].img.src = stickers[idx].ref.src;
            stickers[idx].img.onload = function () {
                stickers[idx].ready = true;
            };
        };
        $scope.saveCanvas = function () {
          console.log("save");
        };
        $scope.$emit('success');
      });
  });


// Canvasのイベント受け取り
angular.module('stickrApp')
  .directive('canvasWatch', function () {
    return {
        restrict: 'A',
        link: function (scope, element) {
            //scaling all image
            var scaleWidth = 1;//canvas size/backTopWidth(900)
            var scaleHeight = 1;
            var ctx = element[0].getContext('2d');
            // タップ位置
            var lastX = 0;
            var lastY = 0;
            var currentX = 0;
            var currentY = 0;
            //定数　ステッカーの選択状態を表す
            var NonClicked = -1;
            var OneClicked = 0;
            var MoveClicked = 1;
            var RotateClicked = 2;
            var OrderClicked = 3;
            var clickedType = NonClicked; //クリックされた種類を保存

            var imagePowerWidth = 1.0;//画像の縮尺幅
            var imagePowerHeight = 1.0;//画像の縮尺高さ
            
            var width = angular.element(ctx).attr('width');
            var height = angular.element(ctx).attr('height');
            var bTabletop;
            //event type=0:touch type=1:mouse
            var eventType=-1;

            var FPS = function (target) {
                this.target = target;
                this.interval = 1000 / target;
                this.checkpoint = new Date();
                this.fps = 0;
            };
            FPS.prototype = {
                check: function () {
                    // fps計算
                    var now = new Date();
                    this.fps = 1000 / (now - this.checkpoint);
                    //this.checkpoint = new Date();
                    this.checkpoint = now;
                },
                getFPS: function() {
                    // fps取得
                    return this.fps.toFixed(2);
                },
                getInterval: function () {
                    // インターバル取得
                    var elapsed = new Date() - this.checkpoint;
                    return this.interval - elapsed > 10 ? this.interval - elapsed : 10;
                }
            };

            var fps = new FPS(30);

            function loop () {
                fps.check();
                new CanvasDraw(stickers);
                setTimeout(loop, fps.getInterval());
            }

            scope.$on('success', function () {
                stickers = loadStickers(scope.putStickers);
                bTabletop = loadStickers(scope.backTabletop);
                loop();
            });

            function loadStickers (pStickers) {
                var tmpStickers = [];

                if (pStickers === undefined || pStickers === null) {
                    return;
                }
                pStickers.forEach(function (pSticker) {
                    tmpStickers.push(pSticker);
                });
                tmpStickers.forEach(function (tmpSticker) {
                    tmpSticker.ready = false;
                    tmpSticker.selected = false;

                    tmpSticker.img = new Image();
                    tmpSticker.img.src = tmpSticker.ref.src;
                    tmpSticker.img.onLoad = function () {
                        tmpSticker.ready = true;
                    };
                });
                return tmpStickers;
            }

            function contain (sticker, x, y) {
                var rad = sticker.angle * Math.PI / 180; //ラジアン角;
                var coordinateX1 = sticker.img.width/2*scaleWidth*Math.cos(rad);
                var coordinateX2 = sticker.img.height/2*scaleHeight*Math.sin(rad);
                var coordinateY1 = sticker.img.width/2*scaleWidth*Math.sin(rad);
                var coordinateY2 = sticker.img.height/2*scaleHeight*Math.cos(rad);

                var lx = -coordinateX1-coordinateX2+sticker.x+sticker.img.width/2*scaleWidth;
                var rx = coordinateX1+coordinateX2+sticker.x+sticker.img.width/2*scaleWidth;
                var uy = -coordinateY1+coordinateY2+sticker.y+sticker.img.height/2*scaleHeight;
                var by = coordinateY1-coordinateY2+sticker.y+sticker.img.height/2*scaleHeight;
                // 点が含まれているのかを判定

                if(x >= Math.min(lx,rx) && x <= Math.max(lx,rx)) {
                  if(y >= Math.min(uy,by) && y <= Math.max(uy,by)) {
                    return true;
                  }
                }
                return false;
            }

            function containRotate (sticker, x, y){
                var rad = sticker.angle / 180 * Math.PI;
                var r = 20;
                var coordinateX1 = sticker.img.width/2*scaleWidth*Math.cos(rad);
                var coordinateY1 = sticker.img.width/2*scaleWidth*Math.sin(rad);
                
                var centerX = coordinateX1+sticker.x+sticker.img.width/2*scaleWidth,
                    centerY = coordinateY1+sticker.y+sticker.img.height/2*scaleHeight;
                // 点が右横の円に含まれているのかを判定
                if((Math.pow(Math.abs(centerX-x),2)+Math.pow(Math.abs(centerY-y),2)) <= Math.pow(r,2)){
                    return true;
                }
                return false;
              }

            function containOrder (sticker, x, y){
                var rad = sticker.angle / 180 * Math.PI;
                var r = 20;
                var coordinateX1 = sticker.img.width/2*scaleWidth*Math.cos(rad);
                var coordinateY1 = sticker.img.width/2*scaleWidth*Math.sin(rad);
                var centerX = -coordinateX1+sticker.x+sticker.img.width/2*scaleWidth,
                    centerY = -coordinateY1+sticker.y+sticker.img.height/2+scaleHeight;
                // 点が右横の円に含まれているのかを判定
                if((Math.pow(Math.abs(centerX-x),2)+Math.pow(Math.abs(centerY-y),2)) <= Math.pow(r,2)){
                  return true;
                }
                return false;
            }

            /* 以下 マウスイベント */
            element.bind('mousedown', function (event) {
                if(eventType == -1){
                  eventType = 1;  
                } 
                if(eventType!=1){
                  return ;
                }
                console.log("mouse down");
                console.log(event);
                // クリック位置を記録
                if (event.offsetX!==undefined) {
                  lastX = event.offsetX;
                  lastY = event.offsetY;
                } else { // Firefox compatibility
                  lastX = event.layerX - event.currentTarget.offsetLeft;
                  lastY = event.layerY - event.currentTarget.offsetTop;
                }
                currentX = lastX;
                currentY = lastY;
                console.log('lastX:'+lastX+'last:'+lastY);
                downEvent();
            });

            element.bind('touchstart',function (event){
              if(eventType == -1){
                  eventType = 0;  
              }
              if(eventType!=0){
                  return ;
              }
              console.log("touch start");
              console.log(event);
                // タップ位置を記録
                if (event.originalEvent.touches[0].pageX!==undefined) {
                  lastX = event.originalEvent.touches[0].pageX - event.currentTarget.offsetLeft;
                  lastY = event.originalEvent.touches[0].pageY - event.currentTarget.offsetTop;
                }
                currentX = lastX;
                currentY = lastY;
                console.log('lastX:'+lastX+'last:'+lastY);
                downEvent();
                $(window).off('.noScroll');
            });

            element.bind('mousemove', function (event) {
                // タップ位置を取得
                if(event.offsetX!==undefined){
                  currentX = event.offsetX;
                  currentY = event.offsetY;
                } else {
                  currentX = event.layerX - event.currentTarget.offsetLeft;
                  currentY = event.layerY - event.currentTarget.offsetTop;
                }
                moveEvent();
            });

            element.bind('touchmove', function (event) {
                // タップ位置を取得
                if(event.originalEvent.touches[0].pageX!==undefined){
                  console.log("if");
                  currentX = event.originalEvent.touches[0].pageX - event.currentTarget.offsetLeft;
                  currentY = event.originalEvent.touches[0].pageY - event.currentTarget.offsetTop;
                }
                moveEvent();
                console.log(currentX);
            });

            element.bind('mouseup', function (event) {
                if(eventType!=1){
                  return ;
                }
                // タップ位置を記録
                if (event.offsetX!==undefined) {
                  currentX = event.offsetX;
                  currentY = event.offsetY;
                } else { // Firefox compatibility
                  currentX = event.layerX - event.currentTarget.offsetLeft;
                  currentY = event.layerY - event.currentTarget.offsetTop;
                }
                upEvent();
            });

            element.bind('touchend', function (event) {
                if(eventType!=0){
                  return ;
                }
                upEvent();
                console.log("end");
                console.log(currentX);
            });

            element.bind('mouseout', function (event) {
                outEvent();
            });

            function downEvent(){
              clickedType = NonClicked;
                stickers.forEach(function (sticker,index) {
                    console.log("sticker"+index+": "+sticker.selected);
                    console.log("sticker angle: "+sticker.angle);
                    //どれかが選択状態
                    if(clickedType!=NonClicked){
                        sticker.selected = false;
                    }else{
                        //スティッカーがすでに選択状態の時
                        if(sticker.selected){
                            if (containRotate(sticker, lastX, lastY)) {
                                clickedType = RotateClicked;
                            } else if(containOrder(sticker,lastX,lastY)){
                                clickedType = OrderClicked;
                            }else if(contain(sticker, lastX, lastY)) {
                                clickedType = MoveClicked;
                            //どこにも含まれていない場合
                            }else{
                              //もし現在選択中のものが再選択されなかったら選択を解除
                              sticker.selected = false;  
                            }
                          //ステッカーが選択状態じゃなくて、マウスの選択範囲に含まれている時
                        }else if(contain(sticker, lastX, lastY)) {
                            sticker.selected = true;
                            clickedType = OneClicked;
                        }else{
                            sticker.selected = false;
                        }
                    }
              });
            }

            function moveEvent(){
              stickers.forEach(function (sticker) {
                if (sticker.selected) {
                  if (clickedType == RotateClicked) {
                    var tmpAngle = (kakudo(currentX-lastX,currentY-lastY))%360;
                    if(!isNaN(parseInt(tmpAngle))){
                      sticker.angle = tmpAngle;
                    }
                  } else if (clickedType == MoveClicked) {
                    // 現在、選択中の画像をクリックしている場合
                    sticker.x = currentX-sticker.img.width/2*scaleWidth;
                    sticker.y = currentY-sticker.img.height/2*scaleHeight;
                  }
                }
              });
            }

            function upEvent(){
              stickers.forEach(function (sticker,index) {
                  if(clickedType!=NonClicked && clickedType!=OneClicked){
                    if (sticker.selected) {
                      //回転
                      if (clickedType == RotateClicked) {
                        var tmpAngle = (kakudo(currentX-lastX,currentY-lastY))%360;
                        if(isNaN(parseInt(tmpAngle))){
                          sticker.angle = 0;
                        }else{
                          sticker.angle = tmpAngle;
                        }
                      //並び替え
                      }else if(clickedType == OrderClicked){
                        sticker.depth++;
                        console.log("depth="+sticker.depth);
                      //移動
                      }else if(clickedType == MoveClicked) {
                        if(currentX<=5){
                          stickers.splice(index, 1);
                          console.log("delete: "+index);
                        }else{
                          // 現在、選択中の画像をクリックしている場合
                          sticker.x = currentX-sticker.img.width/2*scaleWidth;
                          sticker.y = currentY-sticker.img.height/2*scaleHeight;  
                        }
                      }
                    }
                    sticker.selected = false;
                  }
                });
                lastX = currentX;
                lastY = currentY;
                clickedType = NonClicked;
            }

            function outEvent(){
              if(clickedType == MoveClicked){
                stickers.forEach(function (sticker,index) {
                  if(sticker.selected){
                    if(currentX<=5){
                        sticker.selected = false;
                        stickers.splice(index, 1);
                        console.log("delete: "+index);
                        clickedType = NonClicked;
                    }
                  }
                });
              }
            }


            function kakudo (x, y) {
                var s;
                var deg;
                s = Math.acos(x/Math.sqrt(x*x+y*y));
                s = (s/Math.PI)*180.0;
                if (y < 0) {
                  s = 360 - s;
                }
                deg = Math.floor(s);
                if ((s-deg)>=0.5) {
                  deg++;
                }
                return deg;
            }

            //write draw method
            //draw select frame
            function drawFrame(sticker,ctx){
                var rad = sticker.angle * Math.PI / 180; //ラジアン角;
                var coordinateX1 = sticker.img.width/2*scaleWidth*Math.cos(rad);
                var coordinateX2 = sticker.img.height/2*scaleHeight*Math.sin(rad);
                var coordinateY1 = sticker.img.width/2*scaleWidth*Math.sin(rad);
                var coordinateY2 = sticker.img.height/2*scaleHeight*Math.cos(rad);
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.moveTo(-coordinateX1-coordinateX2+sticker.x+sticker.img.width/2*scaleWidth, -coordinateY1+coordinateY2+sticker.y+sticker.img.height/2*scaleHeight);
                ctx.lineTo(coordinateX1-coordinateX2+sticker.x+sticker.img.width/2*scaleWidth, coordinateY1+coordinateY2+sticker.y+sticker.img.height/2*scaleHeight);
                ctx.lineTo(coordinateX1+coordinateX2+sticker.x+sticker.img.width/2*scaleWidth, coordinateY1-coordinateY2+sticker.y+sticker.img.height/2*scaleHeight);
                ctx.lineTo(-coordinateX1+coordinateX2+sticker.x+sticker.img.width/2*scaleWidth, -coordinateY1-coordinateY2+sticker.y+sticker.img.height/2*scaleHeight);
                ctx.lineTo(-coordinateX1-coordinateX2+sticker.x+sticker.img.width/2*scaleWidth, -coordinateY1+coordinateY2+sticker.y+sticker.img.height/2*scaleHeight);
                ctx.strokeStyle = '#0F0F0F';
                ctx.stroke();
                ctx.closePath();
            }
            function drawRotateCircle(sticker,ctx){
                var rad = sticker.angle * Math.PI / 180; //ラジアン角;
                var coordinateX1 = sticker.img.width/2*scaleWidth*Math.cos(rad);
                var coordinateY1 = sticker.img.width/2*scaleWidth*Math.sin(rad);
                ctx.beginPath();
                ctx.arc(coordinateX1+sticker.x+sticker.img.width/2*scaleWidth,coordinateY1+sticker.y+sticker.img.height/2*scaleHeight,20, 0, Math.PI *2, false);
                ctx.fillStyle = 'rgb(192, 80, 77)'; // 赤
                ctx.fill();
                ctx.closePath();
            }
            function drawOrderCircle(sticker,ctx){
                var rad = sticker.angle * Math.PI / 180; //ラジアン角;
                var coordinateX1 = sticker.img.width/2*scaleWidth*Math.cos(rad);
                var coordinateY1 = sticker.img.width/2*scaleWidth*Math.sin(rad);
                ctx.beginPath();
                ctx.arc(-coordinateX1+sticker.x+sticker.img.width/2*scaleWidth,-coordinateY1+sticker.y+sticker.img.height/2*scaleHeight,20, 0, Math.PI *2, false);
                ctx.fillStyle = 'rgb(77, 80, 192)'; // 青
                ctx.fill();
                ctx.closePath();
                //矢印を書く
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.moveTo(-coordinateX1+sticker.x+sticker.img.width/2*scaleWidth,-coordinateY1+15+sticker.y+sticker.img.height/2*scaleHeight);
                ctx.lineTo(-coordinateX1+sticker.x+sticker.img.width/2*scaleWidth,-coordinateY1-15+sticker.y+sticker.img.height/2*scaleHeight);
                ctx.lineTo(-coordinateX1-15+sticker.x+sticker.img.width/2*scaleWidth,-coordinateY1+0+sticker.y+sticker.img.height/2*scaleHeight);
                ctx.lineTo(-coordinateX1+sticker.x+sticker.img.width/2*scaleWidth,-coordinateY1-15+sticker.y+sticker.img.height/2*scaleHeight);
                ctx.lineTo(-coordinateX1+15+sticker.x+sticker.img.width/2*scaleWidth,-coordinateY1+0+sticker.y+sticker.img.height/2*scaleHeight);
                ctx.strokeStyle = '#FFFFFF';
                ctx.stroke();
                ctx.closePath();
            }
            // 描画
            function CanvasDraw (tmp) {
                //console.log("clickedType"+clickedType);
                var stickers = tmp;
                var ctx = element[0].getContext('2d');
                ctx.clearRect(0, 0, element[0].width, element[0].height);
                // 以下画像の読み込みが完了しているなら
                ctx.drawImage(bTabletop[0].img, bTabletop[0].x, bTabletop[0].y,element[0].width, element[0].height);
                
                scaleWidth = element[0].width/bTabletop[0].img.width;
                scaleHeight = element[0].height/bTabletop[0].img.height;
                if(clickedType==MoveClicked){
                  if(currentX<=5){
                    ctx.beginPath();
                    ctx.fillStyle = 'rgb(192, 80, 77)'; // 赤
                    ctx.fillRect(0, 0, 20, element[0].height);
                    ctx.closePath();
                  }
                }
                //配列を深さの浅い順にソート
                stickers.sort(
                  function(s1,s2){
                      if( s1.depth < s2.depth ) return -1;
                        if( s1.depth > s2.depth ) return 1;
                        return 0;
                    }
                );
                stickers.forEach(function (sticker) {
                    if (!sticker.ready) {
                      return;
                    }
                    var rad = sticker.angle * Math.PI / 180; //ラジアン角;
                    //canvasの状態を一旦保存
                    ctx.save();
                    //画像の縦横半分の位置へtranslate
                    ctx.translate((sticker.x+sticker.img.width/2*scaleWidth), (sticker.y+sticker.img.height/2*scaleHeight));
                    //変形マトリックスに回転を適用
                    ctx.rotate(rad);
                    //translateした分戻して原点を0，0に
                    ctx.translate( -1 * (sticker.x+sticker.img.width/2*scaleWidth), -1 *(sticker.y+sticker.img.height/2*scaleHeight));
                    // 以下画像の読み込みが完了しているなら
                    ctx.drawImage(sticker.img, sticker.x, sticker.y,sticker.img.width*scaleWidth,sticker.img.height*scaleHeight);
                    //canvasの状態を元に戻す
                    ctx.restore();

                    // 選択状態なら
                    if(sticker.selected) {
                      // 選択中の枠をかく
                      drawFrame(sticker,ctx);
                      // 回転選択用の枠をかく
                      drawRotateCircle(sticker,ctx);
                      // 画像入れ替え用の枠をかく
                      drawOrderCircle(sticker,ctx);
                    }
                    // 枠を描画
                }, ctx); // for each
              } // draw
          } // link function
      }; // return
  });
