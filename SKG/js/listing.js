$(function(){
	$.ajax({
		type:"GET",
		url:"../js/data3.json",
		success: function(res){
			var html = "";
			for(var i = 0 ; i < res[2].child.length; i++){
				html += '<li><a href="#">' + res[2].child[i].title + '</a></li>';
			}
			$(".type_one").html(html);
			$(".type_one").find("li:eq(0)").addClass("type_first");
			$(".type_one").find("li:eq(0)").find("a").addClass("typemore");
			
			var liStr = '<li class = "addLi"><a class="searchmore1 searchmore searchShow1" href="#" style="display: inline";>更多<img src="../img/select_img.png" alt = "更多"/></a><a class="searchmore1 searchHide1" href="#" style="display: none";>收起<img src="../img/select_img2.png" alt = "收起"/></a></li>'
			var ulHtml = $(".type_one").html();
			ulHtml += liStr;
			$(".type_one").html(ulHtml);			
			$(".type_one").find(".addLi").insertAfter($(".type_one").find("li:eq(6)"))
		
			var html = "";
			for(var i = 0 ; i < res[3].child.length; i++){
				html += '<li><a href="#">' + res[3].child[i].title + '</a></li>';
			}
			$(".type_two").html(html);
			$(".type_two").find("li:eq(0)").addClass("type_first");
			$(".type_two").find("li:eq(0)").find("a").addClass("typemore");
			
			var html = "";
			for(var i = 0 ; i < res[4].child.length; i++){
				html += '<li><a href="#">' + res[4].child[i].title + '</a></li>';
			}
			$(".type_three").html(html);
			$(".type_three").find("li:eq(0)").addClass("type_first");
			$(".type_three").find("li:eq(0)").find("a").addClass("typemore");

			var html = "";
			for(var i = 0 ; i < res[5].child.length; i++){
				html += '<li><a href="#">' + res[5].child[i].title + '</a></li>';
			}
			$(".type_four").html(html);
			$(".type_four").find("li:eq(0)").addClass("type_first");
			$(".type_four").find("li:eq(0)").find("a").addClass("typemore");

			var html = "";
			for(var i = 0 ; i < res[6].child.length; i++){
				html += '<li><a href="#">' + res[6].child[i].title + '</a></li>';
			}
			$(".type_five").html(html);
			$(".type_five").find("li:eq(0)").addClass("type_first");
			$(".type_five").find("li:eq(0)").find("a").addClass("typemore");
			
			var liStr = '<li class = "addLi"><a class="searchmore2 searchmore searchShow2" href="#" style="display: inline";>更多<img src="../img/select_img.png" alt = "更多"/></a><a class="searchmore2 searchHide2" href="#" style="display: none";>收起<img src="../img/select_img2.png" alt = "收起"/></a></li>'
			var ulHtml = $(".type_five").html();
			ulHtml += liStr;
			$(".type_five").html(ulHtml);			
			$(".type_five").find(".addLi").insertAfter($(".type_five").find("li:eq(6)"))

			var html = "";
			for(var i = 0 ; i < res[7].child.length; i++){
				html += '<li><a href="#">' + res[7].child[i].title + '</a></li>';
			}
			$(".type_six").html(html);
			$(".type_six").find("li:eq(0)").addClass("type_first");
			$(".type_six").find("li:eq(0)").find("a").addClass("typemore");

			//列表分类显示隐藏
			var checkbol = true;
			var checkbol2 = true
			// 		判断有多少type项
			function set(){
				$(".typepagez_list .searchmore1").click(function(){
					if(checkbol){
						checkbol=false;
						// 显示第二行
						$(".searchHide1").css("display", "inline")
						$(this).css("display", "none")
						$(this).parents(".typepagez_list").stop().animate({"height":"120px"},1000);			
					}
					else{
						
						checkbol=true;
						$(this).css("display", "none")
						$(".searchShow1").css("display", "inline")
						// 隐藏第二行
						$(this).parents(".typepagez_list").stop().animate({"height":"60", "overflow" :"hidden"},1000);

					}
				});
				$(".typepagez_list .searchmore2").click(function(){
					if(checkbol2){
						checkbol2=false;
						// 显示第二行
						$(".searchHide2").css("display", "inline")
						$(this).css("display", "none")
						$(this).parents(".typepagez_list").stop().animate({"height":"120px"},1000);			
					}
					else{
						
						checkbol2=true;
						$(this).css("display", "none")
						$(".searchShow2").css("display", "inline")
						// 隐藏第二行
						$(this).parents(".typepagez_list").stop().animate({"height":"60", "overflow" :"hidden"},1000);

					}
				});
			}
			set()	
		}
	})

})

$(function(){
	$.ajax({
		type: "get",
		url: "../js/data3.json",
		success: function(str){
			getData1()
			$(".a1").click(function(){
				$(".goods_center").find(".button").find("a").attr("id", "");
				$(this).attr("id", "active")
				getData1()
			})
			$(".a2").click(function(){
				$(".goods_center").find(".button").find("a").attr("id", "");
				$(this).attr("id", "active")
				getData1()
				getData2()
			})
			
			
			getData1()
			function getData1(){
				var html = "";
				for(var i = 0 ; i < str[0].goods.length; i++){
					html += '<dd><img src="../img1/' + str[0].goods[i].imgUrl + '" alt="" /><span class = "price">' + str[0].goods[i].price + '</span><a class = "title" href="#">' + str[0].goods[i].title + '</a><p class = "country">' + str[0].goods[i].exportCountries + '<span></span><span></span></p><a class = "evaluate" href="#">' + str[0].goods[i].evaluate + '</a></dd>';
				}
				$(".g_top").find(".main").find("dl").html(html);
				$(".g_top").find(".main").find("dl").find("dd:eq(4)").addClass("d_5")
				var html2 = "";
				for(var i = 0 ; i < str[1].goods.length; i++){
					html2 += '<dd><img src="../img1/' + str[1].goods[i].imgUrl + '" alt="" /><span class = "price">' + str[1].goods[i].price + '</span><a class = "title" href="#">' + str[1].goods[i].title + '</a><p class = "country">' + str[1].goods[i].exportCountries + '<span></span><span></span></p><a class = "evaluate" href="#">' + str[1].goods[i].evaluate + '</a></dd>';
				}
				$(".g_center").find(".main").find("dl").html(html2);
				$(".g_center").find(".main").find("dl").find("dd:eq(4)").addClass("d_5")
				var img = '<img src = "../img1/bg1_country.png" alt = "">'
				var img2 = '<img src = "../img1/bg2_country.png" alt = "">'
				var spanStr = $(".g_center").find(".main").find("dl").find("dd:eq(0)").find(".country").find("span").eq(0).html();
				var spanStr2 = $(".g_center").find(".main").find("dl").find("dd:eq(0)").find(".country").find("span").eq(1).html()
				
				spanStr += img;
				spanStr2 += img2;
				$(".g_center").find(".main").find("dl").find("dd:eq(0)").find(".country").find("span").eq(0).html(spanStr);
				$(".g_center").find(".main").find("dl").find("dd:eq(0)").find(".country").find("span").eq(1).html(spanStr2);
				
				
				$(".g_center").find(".main").find("dl").find("img").mouseover(function(){
					$("this").css({width: "500", height: "500"});
				})
			}

			function getData2(){
				var html = "";
				for(var i = 0 ; i < str[8].goods.length; i++){
					html += '<dd><img src="../img1/' + str[8].goods[i].imgUrl + '" alt="" /><span class = "price">' + str[8].goods[i].price + '</span><a class = "title" href="#">' + str[8].goods[i].title + '</a><p class = "country">' + str[8].goods[i].exportCountries + '<span></span><span></span></p><a class = "evaluate" href="#">' + str[8].goods[i].evaluate + '</a></dd>';
				}
				$(".g_top").find(".main").find("dl").html(html);
				$(".g_top").find(".main").find("dl").find("dd:eq(4)").addClass("d_5");
				var html2 = "";
				for(var i = 0 ; i < str[9].goods.length; i++){
					html2 += '<dd><img src="../img1/' + str[9].goods[i].imgUrl + '" alt="" /><span class = "price">' + str[9].goods[i].price + '</span><a class = "title" href="#">' + str[9].goods[i].title + '</a><p class = "country">' + str[9].goods[i].exportCountries + '<span></span><span></span></p><a class = "evaluate" href="#">' + str[9].goods[i].evaluate + '</a></dd>';
				}
				$(".g_center").find(".main").find("dl").html(html2);
				$(".g_center").find(".main").find("dl").find("dd:eq(4)").addClass("d_5")
				var img = '<img src = "../img1/bg1_country.png" alt = "">';
				var img2 = '<img src = "../img1/bg2_country.png" alt = "">';				
			}
		}
	})
})












