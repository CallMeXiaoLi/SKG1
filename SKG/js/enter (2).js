	/*登录窗验证*/
$(function(){	
	var num = 0;
	
	var _user = JSON.parse(getCookie("user") || "[]");
	$("#loginAccount").blur(function(){
		if($(this).val() == ""){
			$(".boxx").show();
			$(".prompt").html("账号不能为空");
		}else if(_user.account == $(this).val()){
			$(".boxx").hide();
			num++;
		}
		close()
	})
	$("#loginPassword").blur(function(){
		if($(this).val() == ""){
			$(".boxx").show();
			$(".prompt").html("密码不能为空");
		}else if(_user.passWord == $(this).val()){
			$(".boxx").hide();
			num++;
		}
		close()
	})
	
	var _checked = "";
	$(".btn").click(function(){
		//alert(num)	
		 _checked = $(".form2").find(".mind").find(".ck").attr("checked", "checked");
		if(num != 2){
			alert("您的用户名或密码不正确");			
		}else{
			if(_checked){
				setCookie("name",$("#loginAccount").val(), {expires: 7});
				window.open("index.html");
			}
		}
		close()
	})
		
})

function close(){
	$(".close").mouseover(function(){
		$(".close").css("cursor", "pointer")
	}).click(function(){
		$(".boxx").stop().hide();
	})
}


//表单选项跳转
/*$(function(){
	$(".main").find(".form").find("ul").find("li").click(function(){
		$(".main").find(".form").find("ul").find("li").attr("class","");
		$(".main").find(".form").find(".div").css("display", "none");
		$(".main").find(".form").find("ul").find("li").find(".sel").css("display", "none");
		$(this).attr("class", "setBg");		
		$(".main").find(".form").find(".div").eq($(this).index()).css("display", "block");
		$(this).find(".sel").css("display", "block");
	})
})*/






