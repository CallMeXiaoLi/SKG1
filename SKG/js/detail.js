$(function(){
	$(".hd").find("ul").find("li").on("click", function(){
		$(".hd").find("ul").find("li").attr("class", "");
		$(".bd").find("ul").find("li").css("display", "none");
		$(this).attr("class", "on");
		$(".bd").find("ul").find("li").eq($(this).index()).css("display", "list-item")
	})
	
	
})
$(function(){
	$(".bd").find("ul").find("li").on("click", function(){	
		$(".product").find(".pro_top").find("#prodImg").attr("class","zoomIn");
		$(".product").find(".pro_top").find("#prodImg");
		$(".zoomIn").find(".bd").animate({height: "1000px", left: "200.5px", top: "-190.5px", width: "1000px"}, 500);
		$(".next").show();
		
		return false;
	});
	$(".close").on("click", function(){
		$(".product").find(".pro_top").find("#prodImg").attr("class","prodImg");
		$(".product").find(".bd").animate({ height: "510px", left: "178.5px", top: "221px", width: "510px"},10);
		return false;
	});
		
	$("#prodImg").find(".hd").find("ul").find("li:eq(0)").siblings().each(function(i, elem){
		$(elem).click(function(){
			//alert(i)
			$(".prev").show();
			return false;
		});
	});
	$("#prodImg").find(".hd").find("ul").find("li:eq(5)").siblings().each(function(i, elem){
		$(elem).click(function(){
			//alert(i)
			$(".next").show();
			return false;
		});
	});
		
	$("#prodImg").find(".hd").find("ul").find("li:eq(0)").click(function(){
		$(".prev").hide();
	})
	$("#prodImg").find(".hd").find("ul").find("li:eq(5)").click(function(){
		$(".next").hide();
	});	
})


/*详情描述栏吸顶*/
$(function(){
	$(window).on("scroll", function(){
		var top = $(window).scrollTop();
		if(top > 900){

			$(".tabFixed").show();
		}else{
			$(".tabFixed").hide();
		}
		return false;
	})
	$(".prodTabNav").find("li").on("click", function(){
		$(".prodTabNav").find("li").attr("class", "");
		$(this).attr("class", "on");
		$(".prodOnNav").find("li").attr("class", "");
		$(".prodOnNav").find("li").eq($(this).index()).attr("class", "on");
		var z = $("body").offset().top;
		
		$("body").animate({scrollTop : z},4000);

		/*var top = $(window).scrollTop();
		$(window).scroll(function(ev){
			if(-top < -400){
				$(".tabFixed").css("display","black");
				//alert(top)
			}
		})*/
		
		return false;
	})
	
})

/*加入购物车*/
$(function(){
	 function toCar(){
	 	var _num = parseInt($(".none").val());
	 	$(".minus").click(function(){
	 		if($(".none").val() != 1){
	 			_num--;
	 			$(".none").val(_num);
	 		}else{
	 			$(".none").val ===1;
	 		}
	 	})

	 	$(".plus").click(function(){
	 		_num++;
	 		$(".none").val(_num);
	 	})
	 	//点击添加到车库
	 	$("#addtocart").click(function(){
	 		var _obj = {
	 			"id" : "001",
	 			"title":"SKG8068（蓝）电热水壶",
				"price":"179",
				"imgUrl":"product_bg2.jpg",
				"num" : "1"	 			
	 		}
	 		setCookie("cart", JSON.stringify(_obj));
	 		var cars = JSON.parse(getCookie("cart") || "[]");
	 		cars["num"] = _num;
	 		setCookie("cart", JSON.stringify(cars));
	 		//console.log(cars);
	 		$(".carNum").html(cars["num"])
	 		$("#number").html(cars["num"])
	 		alert("已加入购物车，快去看看吧！")

	 	}) 	
	 }
	 toCar()
})


