
$(function(){
	var indexpage = new indexPage();

	function strCopy(str,count){
		arr = new Array(count);
		new_str = arr.join(str);
		return new_str;
	}
	var l = $(".index_recommend li").length;
	if((l % 5) == 0){
		var nums = parseInt(l / 5) + 1;
	} else {
		var nums = parseInt(l / 5) + 2;
	}
	var html = strCopy('<span></span>',nums);
	$(".recommend_ctrl_bar").html(html);
	$(".recommend_ctrl_bar span").first().addClass("on");


	$(".index_recommend li").each(function(index){
		if(index < 5){
			$(this).show();
		}
	});

	$(".recommend_ctrl_bar span").hover(function(){
		$(this).siblings().removeClass("on");
		$(this).addClass("on");
		$(".index_recommend li").hide();
		var index = $(".recommend_ctrl_bar span").index($(this));
		var left = 5 * index;
		var right = 5 * (index + 1);
		$(".index_recommend li").each(function(i){
			if(left <= i & i < right){
				$(this).show();
			}
		});
	});
	//index javascript:Mark2
	var winWidth = $(window).width();
	if(winWidth<=1290){
		$(".newUserActityEntry").css("right","0px");
	}else{
		var sideWidth = (winWidth-1000)/2-145;
		$(".newUserActityEntry").css("right",sideWidth+"px");
	}
	
	
	/*首页轮播图背景判断 by Rex  20150806*/
	var $bannerBgColor = $(".bannerBgColor");
	var $img = $(".bannerBg_img");
	
	$("banner_main").load(function(){
	img_addclass_fuc();
	
	}); 
	
	img_addclass_fuc();
	function img_addclass_fuc(){
		//alert($img.length);
			for( i=0;i<$img.length; i++){
				
		 	if($img.eq(i).find("img").width()>20){ 
				$img.eq(i).addClass("wrap_b");
			}else{
				$img.eq(i).addClass("wrap_a");
			} 				
		} 

	}
	//头部轮播图
	$('.SliderRoll').veryShow({
		showType : 'lunfade',
		navEvent : 'hover'
	});
	//商品框架嵌套轮播图
	$('.SliderFade').veryShow({
		showType : 'fade',
		navEvent : 'hover'
	});
	
	
//	明星轮播图
	$(".gun_left").on("click",function(){
		var gunparent=$(this).siblings(".gunwrap");
		var guncount=$(this).siblings(".guncount");
		if(gunparent.find("dl").position().left>=0){
			return false;
		}else if(gunparent.hasClass("gun")){
			return false;
		}else{
			gunparent.addClass("gun");
			gunparent.find("dl").width(gunparent.find("dd").length*(gunparent.find("dd").width()+14));
		}
		gunparent.find("dl").animate({"left": gunparent.find("dl").position().left+(gunparent.width()+14)+"px"},500,function(){gunparent.removeClass("gun");autogun();});
		if(guncount.length>0){
			var count=guncount.find("li.on").index()||0;
			guncount.find("li").removeClass("on");
			guncount.find("li").eq(count-1).addClass("on");
		}
		$(".gun_right").removeClass("on");
		$(this).addClass("on");
	});
	$(".gun_right").on("click",function(){
		var gunparent=$(this).siblings(".gunwrap");
		var guncount=$(this).siblings(".guncount");
		if(gunparent.find("dl").position().left<=-gunparent.find("dl").width()+ (gunparent.width()*1.5+20)){
			return false;
		}else if(gunparent.hasClass("gun")){
			return false;
		}else{
			gunparent.addClass("gun");
			gunparent.find("dl").width(gunparent.find("dd").length*(gunparent.find("dd").width()+14));
		}
		gunparent.find("dl").animate({"left": gunparent.find("dl").position().left- (gunparent.width()+14)+"px"},500,function(){
			gunparent.removeClass("gun");
			autogun();
			});
		if(guncount.length>0){
			var count=guncount.find("li.on").index()||0;
			guncount.find("li").removeClass("on");
			guncount.find("li").eq(count+1).addClass("on");
		}
		$(".gun_left").removeClass("on");
		$(this).addClass("on");
	});
	$(".guncount li").on("click",function(){
		var guntabparent=$(this).parent(".guncount");
		var gunparent=guntabparent.siblings(".gunwrap");
		if(gunparent.hasClass("gun")){
			return false;
		} 
		gunparent.addClass("gun");
		gunparent.find("dl").width(gunparent.find("dd").length*(gunparent.find("dd").width()+14));
		var old_index=guntabparent.find(".on").index();
		guntabparent.find("li").removeClass("on");
		$(this).addClass("on");
		var new_index=guntabparent.find(".on").index();
		var cha=old_index-new_index;
		gunparent.find("dl").animate({"left": gunparent.find("dl").position().left+ (gunparent.width()+14)*cha+"px"},500,function(){
			gunparent.removeClass("gun");
			$(".strar_protuct span").removeClass("on");
			$(".strar_protuct span").eq(new_index).addClass("on");
			autogun();
			});
		
	});
	var guntime="";
	if($(".guncount").length>0){
		autogun();
	}
	
	function autogun(){
		clearTimeout(guntime);
		guntime=setTimeout(function(){
			var nowindex=$(".guncount").find(".on").index();
			if(nowindex>=$(".guncount li").length-1){
				nowindex=0;
			}else{
				++nowindex;
			}
			$(".guncount li").eq(nowindex).click();
		},4000);
	}

	//首页订单提醒
	var $OrderTips = $('.OrderTips');
	var $OrderTipsClose = $('.OrderTipsClose');
	var orderNum = $('.OrderNum').text();

	if ( orderNum > 0 && $.cookie('orderTipsClose') == null ) {
		$OrderTips.animate({'bottom' : 0}, 400);
	}
	$OrderTipsClose.click(function(){
		$OrderTips.animate({'bottom' : -60}, 400);
		$.cookie('orderTipsClose', 1, {path : '/', expires : 1} );
	});
	$(".superfanslist-area a").each(function(){
		$(this).click(function(){
			$(this).parent().siblings().children().each(function(){
				$(this).removeClass("on");
			});
			$(this).addClass("on");
		});
	});
	$(".fanslist-num").each(function(index){
		if(index < 4){
			$(this).children().addClass("red");
		}
	});
	//跳转免费送主页
	$(".gaveFreeIndex").click(function(){
		var url= staticPath+"/storefront/ec/activity/gaveFree/index.html";
		window.open(url);
	});
	
	
	
});
;(function(){
	window.indexPage = function(){
		this.friendlyLink();
	};
	indexPage.prototype={
			friendlyLink:function(){
				
				$(".viewNext").click(function(){

					$(".foot_links").addClass("friendlyLinkAll");
				});	
				
			}
	};
	
})(jQuery,window);





