		var libol=true,checkbol=true;
		$(".typepage_pro ul li .div").hover(
				function(){
					if(libol){
							libol=false;
							$(this).removeClass("down");
							$(this).addClass("on");
							$(this).siblings().removeClass("on");
					}
				},function(){
					libol=true;
					$(this).removeClass("on");
					$(this).addClass("down");
					$(this).siblings().removeClass("down");
				});
		
		
// 		判断有多少type项
var len=$(".typepage_list li").length;
if(len>8){
	$(".typepage_list .searchmore").show();
	$(".typepage_list .searchmore").click(function(){
		if(checkbol){
			checkbol=false;
			// 显示第二行
			$(".typepage_listone").css({"borderBottom":"1px solid #ddd"});
			$(".typepage_listtwo").animate({"height":"60px"},500);
		}
		else{
			checkbol=true;
			// 隐藏第二行
			$(".typepage_listtwo").animate({"height":"0"},500,function(){
				$(".typepage_listone").css({"borderBottom":"none"});
			});
		}
	});
}
else{
	$(".typepage_list .searchmore").hide();
}


$(function(){
	var $window = $(window);
	var $document = $('html, body');
	var $ChannelSubNavWrap = $('.ChannelSubNavWrap');
	var $ChannelSubNav = $('.ChannelSubNav');
	var $SubNavItem = $('.SubNavItem');
	var $ChannelCategory = $('.ChannelCategory');

	var itemIndex = 0;

	var isJump = 0;
	//初始化栏目导航分类标签切换
	$.each($ChannelCategory, function(i, n){
		if ( $window.scrollTop() > $(n).offset().top ) {
			itemIndex = i;
		}
	});
	$SubNavItem.removeClass('on');
//	if ( $window.scrollTop() > $ChannelCategory.eq(0).offset().top - $ChannelSubNav.height() ) {
//		$SubNavItem.eq(itemIndex).addClass('on');
//	}

	$window.scroll(function(){
		//滚动检测栏目分类导航固定显示
		if ( $window.scrollTop() > $ChannelSubNavWrap.offset().top ) {
			$ChannelSubNav.slideDown(300);
		}else {
			$ChannelSubNav.hide();
		}

		//判断如果鼠标触发跳跃滚动，则不执行滚动检测
		if ( isJump == 0 ) {
			//滚动检测栏目导航分类标签切换
			if ( $window.scrollTop() >= parseInt($ChannelCategory.eq(itemIndex).offset().top - $ChannelSubNav.height()) ) {
				if ( itemIndex < $ChannelCategory.length - 1 ) {
					itemIndex = itemIndex + 1;
				}
			}
			if ( $window.scrollTop() < parseInt($ChannelCategory.eq(itemIndex).offset().top - $ChannelSubNav.height()) ) {
				if ( itemIndex > 0 ) {
					itemIndex = itemIndex - 1;
				}
			}
			$SubNavItem.removeClass('on');
			if ( $window.scrollTop() >= parseInt($ChannelCategory.eq(0).offset().top - $ChannelSubNav.height()) ) {
				$SubNavItem.eq(itemIndex).addClass('on');
			}
		}
	});
	$.each($SubNavItem, function(i, n){
		var $n = $(n);
		$n.click(function(){
			var offsettop = parseInt($ChannelCategory.eq(i).offset().top - $ChannelSubNav.height());
			isJump = 1;
			itemIndex = i;
			$document.animate({'scrollTop' : offsettop}, 300, function(){
				$SubNavItem.removeClass('on');
				$n.addClass('on');
				isJump = 0;
			});
		});
	});

});