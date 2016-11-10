/*头部下拉事件*/

$(function(){
	function mAccount(){
		
	$(".tp_3").bind({
			mouseover: function(){
				$(".account_list").css("display" ,"block").css("backgroundColor", "#fff");
			},mouseout: function(){
				$(".account_list").css("display" ,"none");
			}
		})
		$(".account_list").find(".a_ft").hover(function(){
			$(this).css("color", "red");
		}, function(){
			$(this).css("color", "black");
		})
	}
	mAccount();
	function phone(){
		$(".tp_4").bind({
			mouseover: function(){
				$(this).find(".span_s").css("backgroundColor", "#fff");
				$(".app_code").css("display", "block");
				$(".a_t").css("color", "#000")
			},mouseout: function(){
				$(this).find(".span_s").css("backgroundColor", "#000");
				$(".app_code").css("display", "none")
				$(".a_t").css("color", "#fff")
			}
		})
	}
	phone()

	//导航动作
	function naavShowHide(){
		$("#nav").find(".nav_ul").find("#id_li1").hover(function(){
			$("#nav").find(".nav_ul").find("#id_li1").find("#me_id").show();
			
		},function(){
			$("#nav").find(".nav_ul").find("#id_li1").find("#me_id").hide();	
		});
		$("#nav").find(".nav_ul").find("#id_li3").hover(function(){
			$("#nav").find(".nav_ul").find("#id_li3").find("#kit_id").stop(true).slideDown(1000);
		},function(){
			$("#nav").find(".nav_ul").find("#id_li3").find("#kit_id").stop(true).slideUp(1000);
		});
		$("#nav").find(".nav_ul").find("#id_li4").hover(function(){
			$("#nav").find(".nav_ul").find("#id_li4").find("#jMachine").stop(true).slideDown(1000);
		},function(){
			$("#nav").find(".nav_ul").find("#id_li4").find("#jMachine").stop(true).slideUp(1000);
		});
	}
	naavShowHide()

	//下拉菜单栏数据获取
	$.ajax({
		url:'../js/data01.json',
		type:'GET',
		success:function(res){
			//所有产品
			var html = '';			
			html += '<h2><a href="javascript:">'+res[0].obj + '</a></h2>' +'<p class = "p2_id">';
			for(var j = 0; j < res[0].child.length; j++){
				html += '<a href="javascript:">'+res[0].child[j].title+'</a>'
			}
			html += '</p>';			
			$("#me_id").find(".menu").find("#menu_id1").html(html);
			$("#me_id").find(".menu").find("#men_id1").attr(".child")
		
			var html = '';			
			html += '<h2><a href="javascript:">'+res[1].obj + '</a></h2>' + '<p class = "p2_id">';
			for(var j = 0; j < res[1].child.length; j++){
				html += '<a href="javascript:">'+res[1].child[j].title+'</a>'
			}
			html += '</p>';				
			$("#me_id").find(".menu").find("#menu_id2").html(html);
			$("#me_id").find(".menu").find("#men_id2").attr(".child")

			var html = '';			
			html += '<h2><a href="javascript:">'+res[2].obj + '</a></h2>' + '<p class = "p2_id">';
			for(var j = 0; j < res[2].child.length; j++){
				html += '<a href="javascript:">'+res[2].child[j].title+'</a>'
			}
			html += '</p>';			
			$("#me_id").find(".menu").find("#menu_id3").html(html);
			$("#me_id").find(".menu").find("#men_id3").attr(".child")

			var html = '';			
			html += '<h2><a href="javascript:">'+res[3].obj + '</a></h2>' + '<p class = "p2_id">';
			for(var j = 0; j < res[3].child.length; j++){
				html += '<a href="javascript:">'+res[3].child[j].title+'</a>'
			}
			html += '</p>';			
			$("#me_id").find(".menu").find("#menu_id4").html(html);
			$("#me_id").find(".menu").find("#men_id4").attr(".child")

			var html = '';			
			html += '<h2><a href="javascript:">'+res[4].obj + '</a></h2>' + '<p class = "p2_id">';
			for(var j = 0; j < res[4].child.length; j++){
				html += '<a href="javascript:">'+res[4].child[j].title+'</a>'
			}
			html += '</p>';			
			$("#me_id").find(".menu").find("#menu_id5").html(html);
			$("#me_id").find(".menu").find("#men_id5").attr(".child")

			var html = '';			
			html += '<h2><a href="javascript:">'+res[5].obj + '</a></h2>' + '<p class = "p2_id">';
			for(var j = 0; j < res[5].child.length; j++){
				html += '<a href="javascript:">'+res[5].child[j].title+'</a>'
			}	
			html += '</p>';		
			$("#me_id").find(".menu").find("#menu_id6").html(html);
			$("#me_id").find(".menu").find("#men_id6").attr(".child")


			
			//厨房电器
			var html = '';
			for(var i = 0; i < res[6].goods.length; i ++){
				
				html += '<li><div class = "div1_id"><a href= "javascript:"><img src = "../img/' + res[6].goods[i].imgUrl + '" alt = ""/></a></div><div class = "div2_id"><p class = "p3_id"><a href= "javascript:">' + res[6].goods[i].title + '</a></p><span class = "span1"><a href= "javascript:">' + res[6].goods[i].price + '</a></span><span class = "span2"><a href = "javascript:">' + res[6].goods[i].details + '</a></span></div></li>'
			}
			$("#kit_id").find(".kit_nav").html(html);
			$("#kit_id").find(".kit_nav").find("li").eq(0).addClass("li_class");
			
			//原汁机
			var html = '';
			for(var i = 0; i < res[7].goods.length; i ++){
				html += '<li><div class = "div1_id"><a href= "javascript:"><img src = "../img/' + res[7].goods[i].imgUrl	+ '" alt = ""/></a></div><div class = "div2_id"><p class = "p3_id"><a href= "javascript:">' + res[7].goods[i].title + '</a></p><span class = "span1"><a href= "javascript:">' + res[7].goods[i].price + '</a></span><span class = "span2"><a href = "javascript:">'  + res[7].goods[i].details + '</a></span></div></li>'
			}
			$("#jMachine").find(".kit_nav").html(html);
			$("#jMachine").find(".kit_nav").find("li").eq(0).addClass("li_class");
		}
	})
	
	
})

//吸顶菜单
$(function(){
	function goTop(){
		$(".suckTopMemu").find("li").hover(function(){
			$(this).find("._blank").show();
			$(this).find(".siteQRCode").show();
		},function(){
			$(this).find("._blank").hide();
			$(this).find(".siteQRCode").hide();
		})	
		$(window).scroll(function(){
			var top = $(document).scrollTop()
			
			if(top > 800 ){
				$(".suckTopMemu").show();
			}else{
				$(".suckTopMemu").hide();
			}
		})
		$(".suckTopMemu").find(".toTop").click(function(){
			var h = $("body").offset().top;
			
			$("body").animate({scrollTop : h},4000);
		})
		return false;
	}
	goTop()
})



function func(data){
	var oUl = document.getElementById("search");
	var html = "";
	if(data.s.length){
	oUl.style.display = "block";
		for(var i = 0; i < data.s.length; i++){
			html += '<li><a target="_blank" href="http://www.baidu.com/s?wd='+data.s[i]+'">'+ data.s[i] +'</a></li>';
		}
		oUl.innerHTML = html;
	}else{
		oUl.style.display = "none";
	}
}

		
		
window.onload = function(){
	var txt = document.getElementById("search_keywords_id");
	var oUl = document.getElementById("search");
	var op = document.getElementById("nav_search")
	txt.onfocus = function(){
		op.style.zIndex = -1;
	}
	txt.onblur = function(){
		op.style.zIndex = 0;
	}
	txt.onkeyup = function(){
		if(this.value != ""){
			var oScript = document.createElement("script");
			oScript.src = 'http://suggestion.baidu.com/su?wd='+this.value+'&cb=func';
			document.body.appendChild(oScript);
		}else{
			oUl.style.display = "none";
		}
	}
}
