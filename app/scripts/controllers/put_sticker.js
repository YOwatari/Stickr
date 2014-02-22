'use strict';

angular.module('stickrApp')
  .controller('EditPutStickerCtrl', function ($scope, $http) {
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
        $scope.awesomeThings = awesomeThings;

        $scope.imgStickers = [{
            'src': 'images/stickr_logo.png',
            'width': 80,
            'height': 80,
        }];

        $scope.putStickers = [];
    });
});

angular.module('stickrApp')
  .directive("sidebarWatch", function () {
    return { 
        restrict: 'A',
        link: function (scope, element) {
            var putStickers = scope.putStickers;

            element.bind('mouseup', function (event) {
                var s = new Sticker(angular.element(element[0]).attr('src'));
                putStickers.push(s);
                console.log(putStickers[0].img.src);
            });        

            var Sticker =  function (imgSrc) {
                var self = this;

                self.img = new Image();
                self.x = 0;
                self.y = 0;
                self.angle = 0; // 普通の角度の値で保存する

                self.ready = false;
                self.selected = false;

                self.img.src = imgSrc;
                self.img.onload = function () {
                    self.width = self.img.width;
                    self.height = self.img.height;
                    self.ready = true;
                };
            };

            Sticker.prototype = {
                contain: function (x, y) {
                    // 点が含まれているのかを判定
                    if(x >= this.x && x <= this.x+this.width){
                        if(y>=this.y && y<=this.y+this.height){
                            return true;        
                        }
                    }
                    return false;
                },
                containRotate: function(x, y){
                    var rad = this.angle / 180 * Math.PI;
                    var r = 20;
                    var tmpX = this.width/2*Math.cos(rad)+this.x+this.width/2;
                    var tmpY = this.width/2*Math.sin(rad)+this.y+this.height/2;

                    // 点が右横の円に含まれているのかを判定
                    if((Math.pow(Math.abs(tmpX-x),2)+Math.pow(Math.abs(tmpY-y),2)) <= Math.pow(r,2)){
                        return true;
                    }
                    return false;
                }
            };
        }
    };
});

/* Canvasのイベントリスナー */
angular.module('stickrApp')
  .directive("canvasWatch", function(){
    return {
        restrict: "A",
        link: function (scope, element, attr, ctrl) {
          var self = element[0];
          var ctx = element[0].getContext('2d');

          // タップ位置
          var lastX;
          var lastY;
          var currentX;
          var currentY;

          var nowSelected = false;   // どれか2回めの選択がされているか
          var anySelected = false;   // 一つでもクリックされているか
          var moveClicked = false;   // 移動用にクリックをしているか
          var rotateClicked = false; // 回転用にクリックをしているか

          // Canvas has Data
          self.stickers = [];

          element.bind('mousedown', function (event) {
            console.log(scope.putStickers[0].img.src);
            // タップ位置を記録
            if (event.offsetX!==undefined) {
                lastX = event.offsetX;
                lastY = event.offsetY;
            } else { // Firefox compatibility
                lastX = event.layerX - event.currentTarget.offsetLeft;
                lastY = event.layerY - event.currentTarget.offsetTop;
            }

            // 一つしかクリックさせない
            anySelected = false;
            moveClicked = false;
            rotateClicked = false;

            self.stickers.forEach(function (sticker) {
                if (anySelected) {
                    // どれか一つが選択されている時
                    // 他を全て選択解除
                    sticker.selected = false;
                } else if (nowSelected) {
                    // 現在なにかが選択されている状態
                    if (sticker.selected) {
                        if (sticker.containRotate(lastX, lastY)) {
                            rotateClicked = true;
                            anySelected = true;
                        } else if(sticker.contain(lastX, lastY)) {
                            moveClicked = true;
                            anySelected = true;
                        } else {
                            nowSelected = false;
                            sticker.selected = false;
                        }
                    }
                } else {
                    // 何も選択されていない
                    if(sticker.contain(lastX, lastY)){
                        sticker.selected = true;
                        nowSelected = true;
                        anySelected = true;
                    }
                }
            });

            if (!anySelected) {
                nowSelected = false;
            }
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

            self.stickers.forEach(function (sticker) {
                if (sticker.selected) {
                    if (rotateClicked) {
                        sticker.angle = (kakudo(currentX-lastX,currentY-lastY))%360;
                    } else if (moveClicked) {
                        // 現在、選択中の画像をクリックしている場合
                        sticker.x = currentX-sticker.width/2;
                        sticker.y = currentY-sticker.height/2;
                    }
                }
            });

            lastX = currentX;
            lastY = currentY;
          });

          element.bind('mouseup', function(event){
            // タップ位置を記録
            if (event.offsetX!==undefined) {
                currentX = event.offsetX;
                currentY = event.offsetY;
            } else { // Firefox compatibility
                currentX = event.layerX - event.currentTarget.offsetLeft;
                currentY = event.layerY - event.currentTarget.offsetTop;
            }

            self.stickers.forEach(function (sticker) {
                if (sticker.selected) {
                    if (rotateClicked) {
                        sticker.angle = (kakudo(currentX-lastX,currentY-lastY))%360;
                        sticker.selected = false;
                        nowSelected = false;    
                    } else if(moveClicked) {
                        // 現在、選択中の画像をクリックしている場合
                        sticker.x = currentX-sticker.width/2;
                        sticker.y = currentY-sticker.height/2;
                        sticker.selected = false;
                        nowSelected = false;    
                    }
                }
            });

            lastX = currentX;
            lastY = currentY;
          });

          // canvas reset
          function reset(){
            element[0].width = element[0].width; 
          }

          /*ベクトルの角度を計算*/
          function kakudo () {
            var s;
            var deg;
            console.log("x:"+x+"y:"+y);
            s = Math.acos(x/Math.sqrt(x*x+y*y)); /*角度θを求める*/

            s = (s/Math.PI)*180.0; /* ラジアンを度に変換 */

            if (y<0) {
                /* θ＞πの時 */
                s=360-s;
            }

            deg=Math.floor(s);

            if ((s-deg)>=0.5) {
                /*小数点を四捨五入*/
                deg++;
            }

            return deg; /*角度θを返す*/
          }

          // ステッカー追加
          function add (sticker) {
            self.stickers.push(sticker);
          }

          // 描画
          function draw () {
            self.ctx.clearRect(0, 0, this.width, this.height);

            self.stickers.forEach(function (sticker, i) {
                if (!sticker.ready) {
                    return;
                }
                var rad = sticker.angle * Math.PI / 180; //ラジアン角;

                //canvasの状態を一旦保存
                self.ctx.save();

                //画像の縦横半分の位置へtranslate
                self.ctx.translate((sticker.x+sticker.width/2), (sticker.y+sticker.height/2));
                //変形マトリックスに回転を適用
                self.ctx.rotate(rad);
                //translateした分戻して原点を0，0に
                self.ctx.translate( -1 * (sticker.x+sticker.width/2), -1 *(sticker.y+sticker.height/2));
                // 以下画像の読み込みが完了しているなら
                self.ctx.drawImage(sticker.img, sticker.x, sticker.y);
                //canvasの状態を元に戻す
                self.ctx.restore();

                // 選択状態なら？
                if(sticker.selected) {
                    // this.ctx.fill();
                    this.ctx.lineWidth = 3;
                    // 選択中の枠をかく
                    this.ctx.beginPath();
                    var rad = sticker.angle / 180 * Math.PI;
                    this.ctx.moveTo(-sticker.width/2*Math.cos(rad)-sticker.height/2*Math.sin(rad)+sticker.x+sticker.width/2, -sticker.width/2*Math.sin(rad)+sticker.height/2*Math.cos(rad)+sticker.y+sticker.height/2);
                    this.ctx.lineTo(sticker.width/2*Math.cos(rad)-sticker.height/2*Math.sin(rad)+sticker.x+sticker.width/2, sticker.width/2*Math.sin(rad)+sticker.height/2*Math.cos(rad)+sticker.y+sticker.height/2);
                    this.ctx.lineTo(sticker.width/2*Math.cos(rad)+sticker.height/2*Math.sin(rad)+sticker.x+sticker.width/2, sticker.width/2*Math.sin(rad)-sticker.height/2*Math.cos(rad)+sticker.y+sticker.height/2);
                    this.ctx.lineTo(-sticker.width/2*Math.cos(rad)+sticker.height/2*Math.sin(rad)+sticker.x+sticker.width/2, -sticker.width/2*Math.sin(rad)-sticker.height/2*Math.cos(rad)+sticker.y+sticker.height/2);
                    this.ctx.lineTo(-sticker.width/2*Math.cos(rad)-sticker.height/2*Math.sin(rad)+sticker.x+sticker.width/2, -sticker.width/2*Math.sin(rad)+sticker.height/2*Math.cos(rad)+sticker.y+sticker.height/2);
                    this.ctx.strokeStyle = "#0F0F0F";
                    this.ctx.stroke();
                    this.ctx.closePath();

                    // 回転選択用の枠をかく
                    this.ctx.beginPath();
                    this.ctx.arc(sticker.width/2*Math.cos(rad)+sticker.x+sticker.width/2,
                    sticker.width/2*Math.sin(rad)+sticker.y+sticker.height/2,
                    20, 0, Math.PI *2, false);
                    this.ctx.fillStyle = 'rgb(192, 80, 77)'; // 赤
                    this.ctx.fill();
                    this.ctx.closePath();
                }
                // 枠を描画
            }, this);
          }
        }
  };
});
