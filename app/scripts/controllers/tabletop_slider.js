			$(function() {
				//caching
				//main wrapper
				var $tabletop			= $('#tabletop')
				//overlay
				var $img_overlay			= $('#img_overlay');
				//image loading
				var $img_loading			= $('#img_loading');
				//next and previous buttons
				var $next_button			= $('#next_button');
				var $prev_button			= $('#prev_button');
				//close button
				var $close_button			= $('#close_button');
				//main container for the img structure
				var $img_Container 	= $('#img_Container');
				//jquery ui slider
				var $scrollWrapper	= $('#scrollWrapper');
				//total number of images
				var nmb_images=0;
				//which makers is clicked (index)
				var maker_idx=-1;
				//scroller wrapper
				var $img_Scroller	= $('#img_Scroller');
				//jquery ui slider
				var $slider				= $('#slider');
				//the links of the makers (the cities)
				var $makers		= $('#makerList > li');
				//current image being viewed
				var current				= 0;

				//some control flags:
				//prevent fast clicks on next and previous
				var photo_nav			= true;
				
				//User clicks on a city / maker;
				$makers.bind('click',function(){
					$makers.removeClass('current');
					var $maker 		= $(this);
					$maker.addClass('current');
					var maker_index 	= $maker.index();
					if(maker_idx == maker_index) return;
					maker_idx			= maker_index;
					//close the maker and slider if opened
					if($img_Container.data('opened')==true){
						$scrollWrapper.fadeOut();
						$img_Container.stop()
										  .animate({'height':'0px'},200,function(){
											openMaker($maker);
										  });
					}				  
					else
						openMaker($maker);
				});
					
				//opens a maker after cliking on a city / maker
				function openMaker($maker){
					//current gets reseted
					current				= 0;				  
					//wrapper of each content div, where each image is
					var $fp_content_wrapper = $img_Container.find('.container:nth-child('+parseInt(maker_idx+1)+')');
					//hide all the other galleries thumbs wrappers
					$img_Container.find('.container').not($fp_content_wrapper).hide();
					//and show this one
					$fp_content_wrapper.show();
					//total number of images
					nmb_images			= $fp_content_wrapper.children('div').length;
					//calculate width,
					//padding left 
					//and padding right for content wrapper
					var w_width 	= 0;
					var padding_l	= 0;
					var padding_r	= 0;
					//center of screen
					var center		= $(window).width()/2;
					var one_divs_w  = 0;
					/*
					Note:
					the padding left is the center minus half of the width of the first content div
					the padding right is the center minus half of the width of the last content div
					*/
					$fp_content_wrapper.children('div').each(function(i){
						var $div 		= $(this);
						var div_width	= $div.width(); 
						w_width			+=div_width;
						//if first one, lets calculate the padding left
						if(i==0)
							padding_l = center - (div_width/2);
						//if last one, lets calculate the padding right
						if(i==(nmb_images-1)){
							padding_r = center - (div_width/2);
							one_divs_w= div_width;
						}	
					}).end().css({
						'width'				: w_width + 'px',
						'padding-left' 		: padding_l + 'px',
						'padding-right' 	: padding_r + 'px'
					});
					
					//scroll all left;
					$img_Scroller.scrollLeft(w_width);
					
					//innitialize the slider
					$slider.slider('destroy').slider({
						orientation	: 'horizontal',
						max			: w_width -one_divs_w,//total width minus one content div width
						min			: 0,
						value		: 0,
						slide		: function(event, ui) {
							$img_Scroller.scrollLeft(ui.value);
						},
						stop: function(event, ui) {
							//stop sliding 
							//of the window stays centered
							checkClosest();
						}
					});
					//open the maker and show the slider
					$img_Container.animate({'height':'240px'},200,function(){
						$(this).data('opened',true);
						$scrollWrapper.fadeIn();
					});
					
					//scroll all right;
					$img_Scroller.stop()
									 .animate({'scrollLeft':'0px'},2000,'easeInOutExpo');

					//User clicks on a content div (image)
					$fp_content_wrapper.find('.content')
									 .bind('click',function(e){
						var $current 	= $(this);
						//track the current one
						current			= $current.index();
						//center and show this image
						//the second parameter set to true means we want to 
						//display the picture after the image is centered on the screen
						centerImage($current,true,600);
						e.preventDefault();
					});					
				}
				
				//while the maker scrolls we want that the slider scrolls as well
				$img_Scroller.scroll(function(){
					$slider.slider('value',parseInt($img_Scroller.scrollLeft(),10));
				});
				
				//User clicks next button (preview mode)
				$next_button.bind('click',function(){
					if(photo_nav){
						photo_nav = false;
					navigate(1);
					}	
				});
				
				//User clicks previous button (preview mode)
				$prev_button.bind('click',function(){
					if(photo_nav){
						photo_nav = false;
					navigate(0);
					}	
				});
				
				//User clicks next button (thumbs)
				$('#next_img').click(function(){
					slideThumb(1);
				});
				
				//User clicks previous button (thumbs)
				$('#prev_img').click(function(){
					slideThumb(0);
				});
				
				//User clicks close button
				$close_button.bind('click',function(){
					if(!photo_nav) return;
					//windows scroll if any
					var windowS 		= $(window).scrollTop();
					//the large image being viewed
					var $large_img		= $('#preview');
					//the current thumb
					var $current 		= $img_Scroller.find('.container:nth-child('+parseInt(maker_idx+1)+')')
														   .find('.content:nth-child('+parseInt(current+1)+')');
					//offset values of current thumb
					var current_offset	= $current.offset();
					//the large image will animate in the direction of the center
					//after that it is removed from the DOM
					$large_img.stop().animate({
						'top'			: current_offset.top + windowS + 'px',
						'left'			: $(window).width()/2 - $current.width()/2 + 'px',
						'width'			: $current.width() + 'px',
						'height'		: $current.height() + 'px',
						'opacity'		: 0
					},800,function(){
						$(this).remove();
					//hide the overlay, and the next, previous and close buttons
					hidePreviewFunctions();
				});
				
					
				});
				
				//centers an image and opens it if open is true
				function centerImage($obj,open,speed){
					//the offset left of the element
					var obj_left 			= $obj.offset().left;
					//the center of the element is its offset left plus 
					//half of its width
					var obj_center 			= obj_left + ($obj.width()/2);
					//the center of the window
					var center				= $(window).width()/2;
					//how much the scroller has scrolled already
					var currentScrollLeft 	= parseFloat($img_Scroller.scrollLeft(),10);
					//so we know that in order to center the image,
					//we must scroll the center of the image minus the center of the screen,
					//and add whatever we have scrolled already
					var move 				= currentScrollLeft + (obj_center - center);
					if(move != $img_Scroller.scrollLeft()) //try 'easeInOutExpo'
						$img_Scroller.stop()
										 .animate({scrollLeft: move}, speed,function(){
							if(open)
								enlarge($obj);
						});
					else if(open)
						enlarge($obj);
				}
				
				//shows the large image
				//first we position the large image on top of the thumb
				//and then, we animate it to the maximum we can get 
				//based on the windows size
				function enlarge($obj){
					//the image element
					var $thumb = $obj.find('img');
					//show loading image
					$img_loading.show();
					//preload large image
					$('<img id="preview" />').load(function(){
						var $large_img 	= $(this);
						
						//confirm there's no other large one
						$('#preview').remove();
						
						$large_img.addClass('preview');
						//now let's position this image on the top of the thumb
						//we append this image to the tabletop div
						var obj_offset 	= $obj.offset();
						$large_img.css({
							'width'	: $thumb.width() + 'px',
							'height': $thumb.height() + 'px',
							'top'	: obj_offset.top + 'px',
							'left'	: obj_offset.left + 5 + 'px'//5 of margin
						}).appendTo($tabletop);
						//getFinalValues gives us the maximum possible width and height
						//for the large image based on the windows size.
						//those values are saved on the element using the jQuery.data()
						getFinalValues($large_img);
						var largeW 	= $large_img.data('width');
						var largeH 	= $large_img.data('height');
						//windows width, height and scroll
						var $window = $(window);
						var windowW = $window.width();
						var windowH = $window.height();
						var windowS = $window.scrollTop();
						//hide the image loading
						$img_loading.hide();
						//show the overlay
						$img_overlay.show();
						//now animate the large image
						$large_img.stop().animate({
							'top'		: windowH/2 -largeH/2 + windowS + 'px',
							'left'		: windowW/2 -largeW/2 + 'px',
							'width'		: largeW + 'px',
							'height'	: largeH + 'px',
							'opacity'	: 1
						},800,function(){
							//after the animation, 
							//show the next, previous and close buttons
							showPreviewFunctions();
						});
					}).attr('src',$thumb.attr('alt'));
				}
				
				//shows next or previous image
				//1 is right;0 is left
				function navigate(way){
					//show loading image
					$img_loading.show();
					if(way==1){
						++current;
						var $current = $img_Scroller.find('.container:nth-child('+parseInt(maker_idx+1)+')')
														.find('.content:nth-child('+parseInt(current+1)+')');
						if($current.length == 0){
							--current;
							$img_loading.hide();
							photo_nav = true;
							return;
						}
					}
					else{
						--current;
						var $current = $img_Scroller.find('.container:nth-child('+parseInt(maker_idx+1)+')')
														.find('.content:nth-child('+parseInt(current+1)+')');
						if($current.length == 0){
							++current;
							$img_loading.hide();
							photo_nav = true;
							return;
						}
					}
						
					//load large image of next/previous content div
					$('<img id="preview" />').load(function(){
						$img_loading.hide();
						var $large_img 		= $(this);
						var $preview 	= $('#preview');
						
						//make the current one slide left if clicking next
						//make the current one slide right if clicking previous
						var animate_to 		= -$preview.width();
						var animate_from	= $(window).width();
						if(way==0){
							animate_to 		= $(window).width();
							animate_from	= -$preview.width();
						}
						
						//now we want that the thumb (of the last image viewed) 
						//stays centered on the screen
						centerImage($current,false,1000);
						
						$preview.stop().animate({'left':animate_to+'px'},500,function(){
							$(this).remove();
							$large_img.addClass('preview');
							getFinalValues($large_img);
							var largeW 	= $large_img.data('width');
							var largeH 	= $large_img.data('height');
							var $window	= $(window);
							var windowW = $window.width();
							var windowH = $window.height();
							var windowS = $window.scrollTop();
							$large_img.css({
								'width'	: largeW+'px',
								'height': largeH+'px',
								'top'	: windowH/2 -largeH/2 + windowS + 'px',
								'left'		: animate_from + 'px',
								'opacity' 	: 1	
							}).appendTo($tabletop)
							  .stop()
							  .animate({'left':windowW/2 -largeW/2+'px'},500,function(){photo_nav = true;});
						});
					}).attr('src',$current.find('img').attr('alt'));	
				}
				
				//show the next, previous and close buttons
				function showPreviewFunctions(){
					$next_button.stop().animate({'right':'0px'},500);
					$prev_button.stop().animate({'left':'0px'},500);
					$close_button.show();
				}
				
				//hide the overlay, and the next, previous and close buttons
				function hidePreviewFunctions(){
					$next_button.stop().animate({'right':'-50px'},500);
					$prev_button.stop().animate({'left':'-50px'},500);
					$close_button.hide();
					$img_overlay.hide();
				}
				
				function getFinalValues($image){
					var widthMargin		= 0
					var heightMargin 	= 20;
					var $window			= $(window);
					var windowH      	= $window.height()-heightMargin;
					var windowW      	= $window.width()-widthMargin;
					var theImage     = new Image();
					theImage.src     = $image.attr("src");
					var imgwidth     = theImage.width;
					var imgheight    = theImage.height;

					if((imgwidth > windowW)||(imgheight > windowH)){
						if(imgwidth > imgheight){
							var newwidth = windowW;
							var ratio = imgwidth / windowW;
							var newheight = imgheight / ratio;
							theImage.height = newheight;
							theImage.width= newwidth;
							if(newheight>windowH){
								var newnewheight = windowH;
								var newratio = newheight/windowH;
								var newnewwidth =newwidth/newratio;
								theImage.width = newnewwidth;
								theImage.height= newnewheight;
							}
						}
						else{
							var newheight = windowH;
							var ratio = imgheight / windowH;
							var newwidth = imgwidth / ratio;
							theImage.height = newheight;
							theImage.width= newwidth;
							if(newwidth>windowW){
								var newnewwidth = windowW;
								var newratio = newwidth/windowW;
								var newnewheight =newheight/newratio;
								theImage.height = newnewheight;
								theImage.width= newnewwidth;
							}
						}
					}
					$image.data('width',theImage.width);
					$image.data('height',theImage.height);
				}
				
				//slides right or left
				function slideThumb(way){
					if(way==1){
						++current;
						var $next = $img_Scroller.find('.container:nth-child('+parseInt(maker_idx+1)+')')
													 .find('.content:nth-child('+parseInt(current+1)+')');
						if($next.length > 0)
							centerImage($next,false,600);
						else{
							--current;
							return;
						}	
					}
					else{
						--current;
						var $prev = $img_Scroller.find('.container:nth-child('+parseInt(maker_idx+1)+')')
													 .find('.content:nth-child('+parseInt(current+1)+')');
						if($prev.length > 0)
							centerImage($prev,false,600);
						else{
							++current;
							return;
						}
					}
				}

				//picture to the center 
				function checkClosest(){
					var center 				= $(window).width()/2;
					var current_distance 	= 99999999;
					var idx					= 0;	
					$container				= $img_Scroller.find('.container:nth-child('+parseInt(maker_idx+1)+')');
					$container.find('.content').each(function(i){
						var $obj 		= $(this);
						//offset left
						var obj_left 	= $obj.offset().left;
						// offset left plus half of its width
						var obj_center 	= obj_left + ($obj.width()/2);
						var distance	= Math.abs(center-obj_center);
						if(distance < current_distance){
							current_distance 	= distance;
							idx					= i;
						}	
					});
					var $new_current 	= $container.find('.content:nth-child('+parseInt(idx+1)+')');
					current 			= $new_current.index();
					centerImage($new_current,false,200);
				}
			});
