
//获取banner数据
$(function(){
	/*$.get("../js/data.json",{},function(data){
		var _data=JSON.parse(data)
		//alert(_data[0].banner[0])
		getBanner()
		function getBanner(){
			var html = "";
			for(var i = 0 ; i < _data[0].banner.length; i++){
				html += '<li style = "background:url(../img/' + _data[0].banner[i] + ')no-repeat center; background-size:100% 100%"><a href="#"></a></li>';
			}
			$("#banner").find(".bd").html(html);
			$("#banner").find(".bd").find("li").css("backgroundSize", "100% 100% ")
			$("#banner").find(".bd").find("li").eq(0).addClass("clone");
		}
	},"text")*/

	//图片轮播
	
	
		var aBtn = $("#banner").find(".hd").find("ol").find("li");
		var oUl = $("#banner").find(".bd");
		var aLi = oUl.find("li");
		var iNow = 0;
		var timer = 0;
		
		//alert(aLi.width())
		aBtn.click(function(){
			iNow = $(this).index();
			tab();
		})
		
		function tab(){
			
			aBtn.attr("class", "")
			aBtn.eq(iNow).attr("class", "active");
			if(iNow == aLi.size() - 1){
				aBtn.eq(0).attr("class", "active");						
			}
			
			oUl.animate({left: -aLi.outerWidth() * iNow}, function(){
				if(iNow == aLi.size() - 1){
					iNow = 0;
					oUl.css("left", 0);
				}
			})
		}
		//alert(aLi.size())
		timer = setInterval(timerInner, 2000);
		function timerInner(){
			iNow++;
			tab();
			
		}
		
		$("#banner").hover(function(){
			clearInterval(timer);
		},function(){
			timer = setInterval(timerInner, 2000);
		})
	
})

//获取JSON数据
$(function(){
	$.get("../js/data.json",{},function(data){
		var _data=JSON.parse(data)
		goods();
		//alert(_data[4].goods2.length)
		function goods(){
			var html = "";			
			for(var i = 0; i < _data[4].goods2.length; i++){
				html += '<dd><p><a href="#"><img src="../img/' + _data[4].goods2[i].imgUrl + '" alt=""></a></p><h4><a href="#">' +  _data[4].goods2[i].title + '</a></h4><p><a href="#">' +  _data[4].goods2[i].des + '</a></p><span>' + _data[4].goods2[i].price + '</span></dd>';
			}
			var aUl = $("#main").find(".gunwrap").find(".scroll").find(".dl_id").find("ul");
			aUl.find("li:eq(0)").html(html);
			aUl.find("li:eq(2)").html(html);
			aUl.find("li:eq(0)").find("dd:eq(0)").css("borderColor", "#ffab14");
			aUl.find("li:eq(0)").find("dd:eq(1)").css("borderColor", "#83c44e");
			aUl.find("li:eq(0)").find("dd:eq(2)").css("borderColor", "#2196f3");
			aUl.find("li:eq(0)").find("dd:eq(3)").css("borderColor", "#e53935");
			aUl.find("li:eq(0)").find("dd:eq(4)").css("borderColor", "#35e5ba");

			aUl.find("li:eq(2)").find("dd:eq(0)").css("borderColor", "#ffab14");
			aUl.find("li:eq(2)").find("dd:eq(1)").css("borderColor", "#83c44e");
			aUl.find("li:eq(2)").find("dd:eq(2)").css("borderColor", "#2196f3");
			aUl.find("li:eq(2)").find("dd:eq(3)").css("borderColor", "#e53935");
			aUl.find("li:eq(2)").find("dd:eq(4)").css("borderColor", "#35e5ba");
		}	
			var html2 = "";
			for(var i = 0; i < _data[5].goods3.length; i++){
				html2 += '<dd><p><a href="#"><img src="../img/' + _data[5].goods3[i].imgUrl + '" alt=""></a></p><h4><a href="#">' +  _data[5].goods3[i].title + '</a></h4><p><a href="#">' +  _data[5].goods3[i].des + '</a></p><span>' + _data[5].goods3[i].price + '</span></dd>';
			}
			/*var aUl = $("#main").find(".gunwrap").find(".scroll").find(".dl_id").find("ul");*/
			aUl.find("li:eq(1)").html(html2);
			aUl.find("li:eq(1)").find("dd:eq(0)").css("borderColor", "#ffab14");
			aUl.find("li:eq(1)").find("dd:eq(1)").css("borderColor", "#83c44e");
			aUl.find("li:eq(1)").find("dd:eq(2)").css("borderColor", "#2196f3");
			aUl.find("li:eq(1)").find("dd:eq(3)").css("borderColor", "#e53935");
	},"text")
	
	//明星单品轮播
	var oSpan = $("#main").find(".gunwrap").find(".title").find(".button").find("span");
	var aUl = $("#main").find(".gunwrap").find(".scroll").find(".dl_id").find("ul");
	var oLi = aUl.find("li");
	var iNow = 0;
	var timer = 0;
	
	//alert(oSpan.length)
	oSpan.click(function(){
		iNow = $(this).index();
		scroll();
	})
	
	function scroll(){
		
		oSpan.attr("class", "")
		oSpan.eq(iNow).attr("class", "onScroll");
		if(iNow == oLi.size() - 1){
			oSpan.eq(0).attr("class", "onScroll");						
		}
		
		aUl.animate({left: -oLi.outerWidth() * iNow}, function(){
			if(iNow == oLi.size() - 1){
				iNow = 0;
				aUl.css("left", 0);
			}
		})
	}
	//alert(oLi.size())
	timer = setInterval(timerInner, 5000);
	function timerInner(){
		iNow++;
		scroll();
		
	}
	
	aUl.hover(function(){
		clearInterval(timer);
	},function(){
		timer = setInterval(timerInner, 5000);
	})
	
})

//获取图片数据
$(function(){
	$.get("../js/data.json",{},function(data){
		var ser = JSON.parse(data);	
		ad();
		bg();
		fitting_top();
		netTV();
		function ad(){
			var html = "";
			for(var i = 0; i < ser[1].img.length; i++){
				html += '<li><a href="#"><img src="../img/' +  ser[1].img[i] + '" alt=""></a></li>';
			}
			$("#main").find(".wrap").html(html);
		}

		function bg(){
			var html = "";
			var html2 = "";
			html += '<a href="#"><img src="../img/' +  ser[6].bg[0] + '" alt=""/></a>';

			html2 += '<a href="#"><img src="../img/' +  ser[6].bg[1] + '" alt=""/></a>';
			$(".g_top").find(".li1").find("li").html(html);
			$(".g_center").find(".li2").find("li").html(html2);
		}
		
		function fitting_top(){
			var str = "";			
			for(var i = 0 ; i < ser[2].shoopping.length; i++){
				str += '<dd><a href="#"><img class = "img" src="../img/' + ser[2].shoopping[i].imgUrl + '" alt=""/></a><h4><a href="#">' + ser[2].shoopping[i].title + '</a></h4><p>' + ser[2].shoopping[i].price + '</p><span>' + ser[2].shoopping[i].evaluate + '</span></dd>';
			} 
			var str2 = "";
			for(var j = 0; j < ser[3].shoopping.length; j++){
				str2 += '<dd><a href="#"><img class = "img" src="../img/' + ser[3].shoopping[j].imgUrl + '" alt=""/></a><h4><a href="#">' + ser[3].shoopping[j].title + '</a></h4><p>' + ser[3].shoopping[j].price + '</p><span>' + ser[3].shoopping[j].evaluate + '</span></dd>'
			}
			$(".fitting").find(".g_top").find(".li1").find("dl").html(str);
			$(".fitting").find(".g_center").find(".li2").find("dl").html(str2);
		}

		function netTV(){
			var string = "";
			for(var i = 0; i < ser[7].tv.length; i++){
				string += '<dd><p><img src="../img/' + ser[7].tv[i].imgUrl + '" alt="" /><a class = "bg" href = "#"></a></p><a class = "a" href ="#">' + ser[7].tv[i].des + '</a><span>' + ser[7].tv[i].explain + '</span></dd>';
			}
			$(".netTV").find("dl").html(string);
		}	

	}, "text")
})



		
		