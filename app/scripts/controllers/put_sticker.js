'use strict';

angular.module('stickrApp').controller('EditPutStickerCtrl', function ($scope, $http) {
    $http.get('/api/awesomeThings').success(function (awesomeThings) {
        $scope.awesomeThings = awesomeThings;

        $scope.imgStickers = [
        {
            'src': 'images/stickr_logo_small.png',
            'width': 80,
            'height': 80
        }];

        $scope.putStickers = [
        {
            'ref': $scope.imgStickers[0],
            'x': 10,
            'y': 10,
            'angle': 0,
            'depth': 0
        }, {
            'ref': $scope.imgStickers[0],
            'x': 100,
            'y': 100,
            'angle': 0,
            'depth': 0
        }, {
            'ref': $scope.imgStickers[0],
            'x': 200,
            'y': 200,
            'angle': 0,
            'depth': 0
        }];

        $scope.$emit('success');
    });
});


// Canvasのイベント受け取り
angular.module('stickrApp').directive('canvasWatch', function () {
    return {
        restrict: 'A',
        link: function (scope, element) {
            var ctx = element[0].getContext('2d');

            // タップ位置
            var lastX = 0;
            var lastY = 0;
            var currentX = 0;
            var currentY = 0;

            var nowSelected = false;   // どれか2回めの選択がされているか
            var anySelected = false;   // 一つでもクリックされているか
            var moveClicked = false;   // 移動用にクリックをしているか
            var rotateClicked = false; // 回転用にクリックをしているか

            var width = angular.element(self).attr('width');
            var height = angular.element(self).attr('height');
            var stickers;

            scope.$on('success', function (){
                console.log('aaa');
                console.log(scope);
                console.log(scope.putStickers);
                stickers = load_stickers(scope.putStickers);                
            });

            function load_stickers (pStickers) {
                    var tmp_stickers = [];

                    if (pStickers === undefined || pStickers === null) {
                        return 
                    }

                    pStickers.forEach(function (pSticker) {
                        tmp_stickers.push(pSticker);
                    });

                    tmp_stickers.forEach(function (tmp_sticker) {
                        tmp_sticker.ready = true;
                        tmp_sticker.selected = false;

                        tmp_sticker.img = new Image();
                        tmp_sticker.img.src = tmp_sticker.ref.src;
                        tmp_sticker.img.onLoad = function () {
                            tmp_sticker.ready = true;
                        };
                    });
                return tmp_stickers;
            };          

            function contain (sticker, x, y) {
                // 点が含まれているのかを判定
                if(x >= sticker.x && x <= sticker.x+sticker.img.width){
                    if(y>=sticker.y && y<=sticker.y+sticker.img.height){
                        return true;        
                    }
                }
                return false;
            };

            function containRotate (sticker, x, y){
                var rad = sticker.angle / 180 * Math.PI;
                var r = 20;
                var tmpX = sticker.img.width/2*Math.cos(rad)+sticker.x+sticker.img.width/2,
                    tmpY = sticker.img.width/2*Math.sin(rad)+sticker.y+sticker.img.height/2;
                // 点が右横の円に含まれているのかを判定
                if((Math.pow(Math.abs(tmpX-x),2)+Math.pow(Math.abs(tmpY-y),2)) <= Math.pow(r,2)){
                    return true;
                }
                return false;
            }

            /* 以下 マウスイベント */
            element.bind('mousedown', function (event) {
                console.log("down");
                // タップ位置を記録
                if (event.offsetX!==undefined) {
                    lastX = event.offsetX;
                    lastY = event.offsetY;
                } else { // Firefox compatibility
                    lastX = event.layerX - event.currentTarget.offsetLeft;
                    lastY = event.layerY - event.currentTarget.offsetTop;
                }
                console.log("lastX:"+lastX+"last:"+lastY);
                // 一つしかクリックさせない
                anySelected = false;
                moveClicked = false;
                rotateClicked = false;

                stickers.forEach(function (sticker) {
                    if (anySelected) {
                        // どれか一つが選択されている時
                        // 他を全て選択解除
                        sticker.selected = false;
                    } else if (nowSelected) {
                        // 現在なにかが選択されている状態
                        if (sticker.selected) {
                            if (containRotate(sticker, lastX, lastY)) {
                                rotateClicked = true;
                                anySelected = true;
                            } else if(contain(sticker, lastX, lastY)) {
                                moveClicked = true;
                                anySelected = true;
                            } else {
                                nowSelected = false;
                                sticker.selected = false;
                            }
                        }
                    } else {
                        // 何も選択されていない
                        if(contain(sticker, lastX, lastY)){
                            console.log("contain");
                            sticker.selected = true;
                            nowSelected = true;
                            anySelected = true;
                        }
                    }
                });

                if (!anySelected) {
                    nowSelected = false;
                }

                CanvasDraw(stickers);
            });

            element.bind('mousemove', function (event) {
                console.log("move");
                // タップ位置を取得
                if(event.offsetX!==undefined){
                    currentX = event.offsetX;
                    currentY = event.offsetY;
                } else {
                    currentX = event.layerX - event.currentTarget.offsetLeft;
                    currentY = event.layerY - event.currentTarget.offsetTop;
                }

                stickers.forEach(function (sticker) {
                    if (sticker.selected) {
                        if (rotateClicked) {
                            sticker.angle = (kakudo(currentX-lastX,currentY-lastY))%360;
                        } else if (moveClicked) {
                            // 現在、選択中の画像をクリックしている場合
                            sticker.x = currentX-sticker.img.width/2;
                            sticker.y = currentY-sticker.img.height/2;
                        }
                    }
                });

                lastX = currentX;
                lastY = currentY;

                CanvasDraw(stickers);
            });

            element.bind('mouseup', function (event) {
                console.log("up");
                // タップ位置を記録
                if (event.offsetX!==undefined) {
                    currentX = event.offsetX;
                    currentY = event.offsetY;
                } else { // Firefox compatibility
                    currentX = event.layerX - event.currentTarget.offsetLeft;
                    currentY = event.layerY - event.currentTarget.offsetTop;
                }

                stickers.forEach(function (sticker) {
                    if (sticker.selected) {
                        if (rotateClicked) {
                            sticker.angle = (kakudo(currentX-lastX,currentY-lastY))%360;
                            sticker.selected = false;
                            nowSelected = false;    
                        } else if(moveClicked) {
                            // 現在、選択中の画像をクリックしている場合
                            sticker.x = currentX-sticker.img.width/2;
                            sticker.y = currentY-sticker.img.height/2;
                            sticker.selected = false;
                            nowSelected = false;    
                        }
                    }
                });

                lastX = currentX;
                lastY = currentY;

                CanvasDraw(stickers);
            });

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
            };

            // 描画
            function CanvasDraw (stickers) {
                var ctx = element[0].getContext('2d');

                ctx.clearRect(0, 0, element[0].width, element[0].height);

                stickers.forEach(function (sticker, i) {
                    if (!sticker.ready) {
                        return;
                    }
                    var rad = sticker.angle * Math.PI / 180; //ラジアン角;

                    //canvasの状態を一旦保存
                    ctx.save();
                    //画像の縦横半分の位置へtranslate
                    ctx.translate((sticker.x+sticker.img.width/2), (sticker.y+sticker.img.height/2));
                    //変形マトリックスに回転を適用
                    ctx.rotate(rad);
                    //translateした分戻して原点を0，0に
                    ctx.translate( -1 * (sticker.x+sticker.img.width/2), -1 *(sticker.y+sticker.img.height/2));
                    // 以下画像の読み込みが完了しているなら
                    ctx.drawImage(sticker.img, sticker.x, sticker.y);
                    //canvasの状態を元に戻す
                    ctx.restore();

                    // 選択状態なら？
                    if(sticker.selected) {
                        // this.ctx.fill();
                        ctx.lineWidth = 3;
                        // 選択中の枠をかく
                        ctx.beginPath();
                        var rad = sticker.angle / 180 * Math.PI;
                        ctx.moveTo(-sticker.img.width/2*Math.cos(rad)-sticker.img.height/2*Math.sin(rad)+sticker.x+sticker.img.width/2, -sticker.img.width/2*Math.sin(rad)+sticker.img.height/2*Math.cos(rad)+sticker.y+sticker.img.height/2);
                        ctx.lineTo(sticker.img.width/2*Math.cos(rad)-sticker.img.height/2*Math.sin(rad)+sticker.x+sticker.img.width/2, sticker.img.width/2*Math.sin(rad)+sticker.img.height/2*Math.cos(rad)+sticker.y+sticker.img.height/2);
                        ctx.lineTo(sticker.img.width/2*Math.cos(rad)+sticker.img.height/2*Math.sin(rad)+sticker.x+sticker.img.width/2, sticker.img.width/2*Math.sin(rad)-sticker.img.height/2*Math.cos(rad)+sticker.y+sticker.img.height/2);
                        ctx.lineTo(-sticker.img.width/2*Math.cos(rad)+sticker.img.height/2*Math.sin(rad)+sticker.x+sticker.img.width/2, -sticker.img.width/2*Math.sin(rad)-sticker.img.height/2*Math.cos(rad)+sticker.y+sticker.img.height/2);
                        ctx.lineTo(-sticker.img.width/2*Math.cos(rad)-sticker.img.height/2*Math.sin(rad)+sticker.x+sticker.img.width/2, -sticker.img.width/2*Math.sin(rad)+sticker.img.height/2*Math.cos(rad)+sticker.y+sticker.img.height/2);
                        ctx.strokeStyle = "#0F0F0F";
                        ctx.stroke();
                        ctx.closePath();

                        // 回転選択用の枠をかく
                        ctx.beginPath();
                        ctx.arc(sticker.img.width/2*Math.cos(rad)+sticker.x+sticker.img.width/2, sticker.img.width/2*Math.sin(rad)+sticker.y+sticker.img.height/2,
                        20, 0, Math.PI *2, false);
                        ctx.fillStyle = 'rgb(192, 80, 77)'; // 赤
                        ctx.fill();
                        ctx.closePath();
                    }
                    // 枠を描画
                }, ctx); // for each
            }; // draw
        } // link function
    }; // return
});