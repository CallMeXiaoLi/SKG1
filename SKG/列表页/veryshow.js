(function($, window){
	//图文展示插件
    $.fn.veryShow = function (options){
    	var defaults = {
			autoInterval : 5000,
			autoSpeed : 400,
			manualSpeed : 400,
			showType : 'lunfade',
			navEvent : 'hover'
    	};

		var _this = this,
			$this = $(this);
		
		this.opts = $.extend(defaults, options);

		//处理每一个展示域
		$.each($this, function(i, n){
			var $ShowArea = $(n);
			var $ShowCon = $ShowArea.find('.ShowCon');
			var $ScrollBox = $ShowArea.find('.ScrollBox');
			var $SliderItem = $ShowArea.find('.SliderItem');
			var $SliderItemOn = $ShowArea.find('.SliderItem.on');
			var $bannerBg= $(".bannerBg_img");
			var $bannerBgOn= $(".bannerBg_img.on");
			var $ShowNav = $ShowArea.find('.ShowNav');
			var $ShowPrev = $ShowArea.find('.ShowPrev');
			var $ShowNext = $ShowArea.find('.ShowNext');
			var $ShowThumbNav = $ShowArea.find('.ShowThumbNav');

			var sliderItemLength = $SliderItem.length;
			var sliderItemWidth = $ShowArea.width();
			var showIndex = $SliderItemOn.index();

			//初始化$ShowCon高宽
			$SliderItem.width(sliderItemWidth);
			$ScrollBox.width(sliderItemWidth * sliderItemLength);

			//初始化$ShowNavItem
			navActive();

			//初始化$SliderItemOn
			if ( $SliderItemOn.length == 0 ) {
				showIndex = 0;
				$SliderItemOn = $SliderItem.eq(0).addClass('on');

			}
			if ( _this.opts.showType == 'hScroll' ) {
				$ScrollBox.css('left', -(showIndex * sliderItemWidth));
			}else if ( _this.opts.showType == 'fade' ) {
				$SliderItem.hide();
				$SliderItemOn.show();

			}
			else if(_this.opts.showType == 'lunfade'){
				$SliderItem.hide();
				$SliderItemOn.show();
			}

			//初始化$SliderItem
			if ( sliderItemLength == 1 ) {
				$ShowPrev.hide();
				$ShowNext.hide();
				$ShowNav.hide();
				//结束处理当前对象
				return $ShowArea;
			}

			//自动播放
			var autoTimer = setInterval(autoPlay, _this.opts.autoInterval);

			//缩略图显示
			$ShowCon.hover(
				function(){
					$ShowThumbNav.stop().animate({'bottom':40,'opacity':'show'},300);
				},
				function(){
					$ShowThumbNav.stop().animate({'bottom':20,'opacity':'hide'},300);
				}
			);

			//导航切换
			var $ShowNavItem = $ShowNav.find('.ShowNavItem');
			if ( _this.opts.navEvent == 'hover' ) {
				$ShowNavItem.mouseenter(function(){
					var $this = $(this);
					var navIndex = $this.index();
					if ( navIndex == showIndex ) {
						return false;
					}
					anyShow('showNav', navIndex, _this.opts.manualSpeed);
				});
			}else if ( _this.opts.navEvent == 'click' ) {
				$ShowNavItem.click(function(){
					var $this = $(this);
					var navIndex = $this.index();
					if ( navIndex == showIndex ) {
						return false;
					}
					anyShow('showNav', navIndex, _this.opts.manualSpeed);
				});
			}

			//左箭头切换
			$ShowPrev.click(function(){
				var $this = $(this);
				if ( showIndex == 0 ) {
					showIndex = sliderItemLength - 1;
				}else {
					showIndex = showIndex - 1;
				}
				anyShow('prevHandler', showIndex, _this.opts.manualSpeed);
			});
			//右箭头切换
			$ShowNext.click(function(){
				var $this = $(this);
				if ( showIndex == sliderItemLength - 1 ) {
					showIndex = 0;
				}else {
					showIndex = showIndex + 1;
				}
				anyShow('nextHandler', showIndex, _this.opts.manualSpeed);
			});

			//展示域，左右箭头hover停止播放
			$ShowArea.hover(
				function(){
					clearInterval(autoTimer);
				},
				function(){
					clearInterval(autoTimer);
					autoTimer = setInterval(autoPlay, _this.opts.autoInterval);
				}
			);
			$ShowPrev.hover(
					function(){
						clearInterval(autoTimer);
					},
					function(){
						clearInterval(autoTimer);
						autoTimer = setInterval(autoPlay, _this.opts.autoInterval);
					}
				);
			$ShowNext.hover(
					function(){
						clearInterval(autoTimer);
					},
					function(){
						clearInterval(autoTimer);
						autoTimer = setInterval(autoPlay, _this.opts.autoInterval);
					}
				);

			//自动播放方法
			function autoPlay(){
				if ( showIndex == sliderItemLength - 1 ) {
					showIndex = 0;
				}else {
					showIndex = showIndex + 1;
				}
				anyShow('autoPlay', showIndex, _this.opts.autoSpeed);
			}
			//导航设置方法
			function navActive(){
				$.each($ShowNav, function(i, n){
					var $ShowNav = $(n);
					var $ShowNavItem = $ShowNav.find('.ShowNavItem');
					$ShowNavItem.removeClass('on').eq(showIndex).addClass('on');
					$bannerBg.removeClass('on').eq(showIndex).addClass('on');
				});
			}
			//公共展示方法
			function anyShow(type, index, speed){
				if ( _this.opts.showType == 'hScroll' ) {
					scrollShow(type, index, speed);
				}else if ( _this.opts.showType == 'fade' ) {
					fadeShow(index, speed);
				}
				else if(_this.opts.showType == 'lunfade'){
					$bannerBg.parent().css({position:"relative"});
					$bannerBg.css({position:"absolute"});
					$SliderItem.parent().css({position:"relative"});
					$SliderItem.css({position:"absolute"});
					fadeLunboShow(index, speed);
				}
			}
			
						
			


			//滚动方法
			function scrollShow(type, index, speed){
				$SliderItem.removeClass('on');
				$SliderItem.eq(index).addClass('on');
				$(".bannerBg_img").removeClass('on');
				$(".bannerBg_img").eq(index).addClass('on');
				
				//重置当前展示索引
				showIndex = index;
				//先重置索引在执行导航定位
				navActive();
				if ( type == 'prevHandler' ) {
					if ( index == sliderItemLength - 1 ) {
						$ScrollBox.css('left',-(index * sliderItemWidth));
					}
				}else if ( type == 'nextHandler' ) {
					if ( index == 0 ) {
						$ScrollBox.css('left',0);
					}
				}else if ( type == 'autoPlay' ) {
					if ( index == 0 ) {
						$ScrollBox.css('left',0);
					}
				}

				$ScrollBox.stop().animate({'left' : -(index * sliderItemWidth)}, speed);



			}
			

			//轮播渐隐方法
			function fadeLunboShow(index, speed){
				if ( ! $SliderItem.is(':animated') ) {
					$bannerBg.stop().removeClass('on').animate({'opacity' : 'hide'}, speed);
					$SliderItem.stop().removeClass('on').animate({'opacity' : 'hide'}, speed);
					$bannerBg.eq(index).animate({'opacity' : 'show'}, speed).addClass('on');
					$SliderItem.eq(index).animate({'opacity' : 'show'}, speed).addClass('on');
					showIndex = index;
					navActive();
				}
			}
			//渐隐方法
			function fadeShow(index, speed){
				if ( ! $SliderItem.is(':animated') ) {
					$SliderItem.removeClass('on').animate({'opacity' : 'hide'}, speed);
					$SliderItem.eq(index).addClass('on').animate({'opacity' : 'show'}, speed);
					showIndex = index;
					navActive();
				}
			}

		});

		return this;
    };
    // 插件结束
})(jQuery, window);