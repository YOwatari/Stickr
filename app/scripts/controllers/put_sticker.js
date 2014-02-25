'use strict';

var stickers;

angular.module('stickrApp').controller('EditPutStickerCtrl', function ($scope, $http) {
    $http.get('/api/awesomeThings').success(function (awesomeThings) {
        $scope.awesomeThings = awesomeThings;

        $scope.imgTabletop = [{
            'src': 'images/tabletop/Mac_11in.png',
            'width': 900,
            'height': 576
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
            'width': 80,
            'height': 80
        },
        {    
            'src': 'images/sticker/adobe_dreamweaver.png',
            'width': 100,
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
            'src': 'images/sticker/chatworks.png',
            'width': 80,
            'height': 80
        },
        {
            'src': 'images/sticker/colo_01.png',
            'width': 80,
            'height': 80
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
            'src': 'images/sticker/donuts_logo.png',
            'width': 80,
            'height': 80
        },
        {
            'src': 'images/sticker/drecom_hentai.png',
            'width': 80,
            'height': 80
        },
        {
            'src': 'images/sticker/drecom.png',
            'width': 80,
            'height': 80
        },
        {
            'src': 'images/sticker/gaiax.png',
            'width': 80,
            'height': 80
        },
        {
            'src': 'images/sticker/generace.png',
            'width': 80,
            'height': 80
        },
        {
            'src': 'images/sticker/github.png',
            'width': 80,
            'height': 80
        },
        {
            'src': 'images/sticker/gloops.png',
            'width': 80,
            'height': 80
        },
        {
            'src': 'images/sticker/h1_logo.png',
            'width': 80,
            'height': 80
        },
        {
            'src': 'images/sticker/herlock_02.png',
            'width': 80,
            'height': 80
        },
        {
            'src': 'images/sticker/herlock.png',
            'width': 80,
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
            'width': 80,
            'height': 80
        },
        {
            'src': 'images/sticker/leve_b.png',
            'width': 80,
            'height': 80
        },
        {
            'src': 'images/sticker/leve_w.png',
            'width': 80,
            'height': 80
        },
        {
            'src': 'images/sticker/logo_klab.png',
            'width': 80,
            'height': 80
        },
        {
            'src': 'images/sticker/logo_ver4.png',
            'width': 80,
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
            'src': 'images/sticker/oro.png',
            'width': 80,
            'height': 80
        },
        {
            'src': 'images/sticker/platform_01.png',
            'width': 80,
            'height': 80
        },
        {
            'src': 'images/sticker/pyfes.png',
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
            'width': 80,
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
            'src': 'images/sticker/yeoman.png',
            'width': 80,
            'height': 80
        }
        ];

        $scope.putStickers = [{
            'ref': $scope.imgStickers[12],
            'x': 80,
            'y': 80,
            'depth': 0,
            'angle': 0
        }];

        $scope.selectStickr = function (index) {
            console.log("select");
            $scope.putStickers.push({
                'ref': $scope.imgStickers[index],
                'x': 100,
                'y': 100,
                'depth': 0,
                'angle': 0
            });

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
            var b_tabletop;

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
                    this.checkpoint = new Date();
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
                CanvasDraw(stickers);
                setTimeout(loop, fps.getInterval());
            };

            scope.$on('success', function (){
                stickers = load_stickers(scope.putStickers);
                b_tabletop = load_stickers(scope.backTabletop);
                loop();
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
                        tmp_sticker.ready = false;
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

                //CanvasDraw(stickers);
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

                //lastX = currentX;
                //lastY = currentY;

                //CanvasDraw(stickers);
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

                //CanvasDraw(stickers);
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
            function CanvasDraw (tmp) {
                var stickers = tmp;
                var ctx = element[0].getContext('2d');

                ctx.clearRect(0, 0, element[0].width, element[0].height);

                var rad = b_tabletop[0].angle * Math.PI / 180; //ラジアン角;
                //canvasの状態を一旦保存
                ctx.save();
                //画像の縦横半分の位置へtranslate
                ctx.translate((b_tabletop[0].x+400), (b_tabletop[0].y+225));
                //変形マトリックスに回転を適用
                ctx.rotate(rad);
                //translateした分戻して原点を0，0に
                ctx.translate( -1 * (b_tabletop[0].x+400), -1 *(b_tabletop[0].y+225));
                // 以下画像の読み込みが完了しているなら
                ctx.drawImage(b_tabletop[0].img, b_tabletop[0].x, b_tabletop[0].y, element[0].width, element[0].height);
                //canvasの状態を元に戻す
                ctx.restore();

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