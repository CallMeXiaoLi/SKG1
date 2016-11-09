$(function(){
	$.ajax({
		type:"GET",
		url:"../js/data03.json",
		success: function(res){
			var html = "";
			for(var i = 0 ; i < res[2].child.length; i++){
				html += '<li><a href="#">' + res[2].child[i].title + '</a></li>';
			}
			$(".type_one").html(html);
			$(".type_one").find("li:eq(0)").addClass("type_first");
			$(".type_one").find("li:eq(0)").find("a").addClass("typemore");
			
			var liStr = '<li class = "addLi"><a class="searchmore searchShow" href="#" style="display: inline";>更多<img src="../img/select_img.png" alt = "更多"/></a><a class="searchmore searchHide" href="#" style="display: none";>收起<img src="../img/select_img2.png" alt = "收起"/></a></li>'
			var ulHtml = $(".type_one").html();
			ulHtml += liStr;
			$(".type_one").html(ulHtml);
			//alert(ulHtml)
			$(".type_one").find(".addLi").insertAfter($(".type_one").find("li:eq(6)"))
			




				
			var checkbol = true;
			// 		判断有多少type项
			function set(){
				$(".typepagez_list .searchmore").click(function(){
					if(checkbol){
						checkbol=false;
						var checkbol2 = true
						// 显示第二行
						$(this).siblings(".searchHide").css("display", "inline")
						$(this).css("display", "none")
						$(this).parents(".typepagez_list").stop().animate({"height":"120px"},1000);			
					}
					else{				
						checkbol=true;
						$(this).css("display", "none")
						$(this).siblings(".searchShow").css("display", "inline")
						// 隐藏第二行
						$(this).parents(".typepagez_list").stop().animate({"height":"60", "overflow" :"hidden"},1000);
					}
				});
			}
			set()	
		}
	});
})
















/*$(function(){
	var checkbol = true;
	// 		判断有多少type项
	function set(){
		$(".typepagez_list .searchmore").click(function(){
			if(checkbol){
				checkbol=false;
				var checkbol2 = true
				// 显示第二行
				$(this).siblings(".searchHide").css("display", "inline")
				$(this).css("display", "none")
				$(this).parents(".typepagez_list").stop().animate({"height":"120px"},1000);			
			}
			else{				
				checkbol=true;
				$(this).css("display", "none")
				$(this).siblings(".searchShow").css("display", "inline")
				// 隐藏第二行
				$(this).parents(".typepagez_list").stop().animate({"height":"60", "overflow" :"hidden"},1000);
			}
		});
	}
	set()
})*/