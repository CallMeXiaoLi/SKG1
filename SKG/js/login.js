//表单选项跳转
$(function(){
	$(".main").find(".form").find("ul").find("li").click(function(){
		$(".main").find(".form").find("ul").find("li").attr("class","");
		$(".main").find(".form").find(".div").css("display", "none");
		$(".main").find(".form").find("ul").find("li").find(".sel").css("display", "none");
		$(this).attr("class", "setBg");		
		$(".main").find(".form").find(".div").eq($(this).index()).css("display", "block");
		$(this).find(".sel").css("display", "block");
	})
})

$(function(){
	/*$(".main").find(".form").find("ul").find("li:eq(1)").click(function(){
		login_testing();
	});
	$(".main").find(".form").find("ul").find("li:eq(0)").click(function(){
		testing();
	});*/


//获取随机验证码

	testing();
	login_testing();
	//
	function testing(){
		$(".p_span").html(testStr(4)); 
		$(".p_span").click(function(){
			$(this).html(testStr(4));
		})
		
		/*手机号码为11位且为非0开头的数字
		请输入密码
		密码须是6-20位字符之间
		验证码不正确*/
		//手机验证
		
		
		
		var flag = 0 ; 
		$("#mobile").blur(function(){		
			if($(this).val() == ""){
				$(".boxx").show();
				$(".prompt").html("手机号码不能为空");
			}else if(!/^(13|14|15|17|18|)\d{9}$/.test($(this).val())){
				$(".boxx").show();
				$(".prompt").html("手机号码格式错误");
			}else{
				$(".boxx").hide();
				flag++;
			}
			close()
		});
		//设置密码
		$("#password").blur(function(){
			if($(this).val() == ""){
				$(".boxx").show();
				$(".prompt").html("请设置密码");
			}else if(!/^\w+$/.test($(this).val())){
				$(".boxx").show();
				$(".prompt").html("请使用字母、数字组合的密码");
			}else if($(this).val().length < 6 || $(this).val().length > 20){
				$(".boxx").show();
				$(".prompt").html("密码须是6-20位字符之间");
			}else{
				$(".boxx").hide();
				flag++;
			}
			close()
		})
		
		//验证码判断
		$("#test_code").blur(function(){
			if($(this).val() == ""){
				$(".boxx").show();
				$(".prompt").html("验证码不能为空");
			}else if($(this).val() != $(".p_span").html()){
				$(".boxx").show();
				$(".prompt").html("验证码不正确");
			}else{
				$(".boxx").hide();
				flag++;
			}
			close()
		})
		
		//手机验证码验证
		$("#test_codes").blur(function(){
			if($(this).val() == ""){
				$(".boxx").show();
				$(".prompt").html("请输入您的手机验证码");
			}else if(!/\d{4}/.test($(this).val())){
				$(".boxx").show();
				$(".prompt").html("手机验证码不正确");
			}else{
				$(".boxx").hide();
				flag++;
			}
			close();
		})	
		$(".btn").click(function(){
			//alert(flag)
			if(flag == 4 ){			
				var user = {
					"account": $("#mobile").val(),
					"passWord": $("#password").val()
				}
				setCookie("user", JSON.stringify(user));
				//window.location.href = "enter.html";

				
			}
			
		})
	}
	

	/*登录窗验证*/

	function login_testing(){
		var num = 0;
		
		var _user = JSON.parse(getCookie("user") || "[]");
		$("#loginAccount").blur(function(){
			alert(_user.account)
			if($(this).val() == ""){
				$(".boxx").show();
				$(".prompt").html("账号不能为空");
			}else if(_user.account == $(this).val()){
				$(".boxx").hide();
				num++;
				alert(num)	
			}
			close()
		})
		$("#loginPassword").blur(function(){
			/*alert(_user.password);
			alert($(this).val());*/
			if($(this).val() == ""){
				$(".prompt").html("密码不能为空");
			}else if(_user.password == $(this).val()){
				$(".boxx").hide();
				num++;
				alert(num)	
				
			}
			close()
		})
		
		var _checked = "";
		$(".btn").click(function(){
			var _checked = $(".form2").find(".mind").find(".ck").attr("checked");
			if(_checked || num == 2){
				alert(3)	
				setCookie("name",$("#loginAccount").val(), {expires: 7});
				window.location.href = "index.html";
			}else{
				$(".boxx").show();
				$(".prompt").html("您的用户名或密码不正确");
			}
			close()
		})
	}
	
})


function close(){
	$(".close").mouseover(function(){
		$(".close").css("cursor", "pointer")
	}).click(function(){
		$(".boxx").stop().hide();
	})
}

//随机生成验证码
function testStr(n){
	var arr = [];
	for(var i = 0; i < n; i++){
		var num  = parseInt(Math.random() * 100);
		if(num >= 0 && num <= 9){
			arr.push(num);
		}else if(num >= 10 && num <= 35){
			arr.push(String.fromCharCode(num + 87));
		}else if(num >= 65 && num <= 90){
			arr.push(String.fromCharCode(num));
		}else{
			i--;
			continue;
		}
	}
	return arr.join("");
}








