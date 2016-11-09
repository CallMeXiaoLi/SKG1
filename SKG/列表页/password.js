$(function(){
	//注册登录对应切换
	var $PassBoxTabTrigger = $('#PassBox .TabTrigger');
	$('.RegisterBox').click(function(){
		$PassBoxTabTrigger.eq(0).click();
	});
	$('.LoginBox').click(function(){
		$PassBoxTabTrigger.eq(1).click();
	});
	
	
	var $PassBox = $('#PassBox');
//忘记密码
	var $ForgetPasswordBox = $('#ForgetPasswordBox');
	$('.ForgetPassword').click(function(){
		/* dialogClose($(this).parents('.DialogFrame'));
		dialogShow($ForgetPasswordBox); */
		window.open(__ctxPath + "/storefront/member/toFindPassword.html");
	});
	//忘记密码-返回登录
	$('.BackLogin').click(function(){
		dialogClose($(this).parents('.DialogFrame'));
		$PassBoxTabTrigger.eq(1).click();
		dialogShow($PassBox);
	});
	//忘记密码-返回注册
	$('.BackRegister').click(function(){
		dialogClose($(this).parents('.DialogFrame'));
		$PassBoxTabTrigger.eq(0).click();
		dialogShow($PassBox);
	});
	
	//忘记密码
	$('.ForgetPasswordCheck').formCheck({
		showMsg : function(verifyResult){
			if ( verifyResult.status ) {
				verifyResult.obj.removeClass('error');
			}else {
				verifyResult.obj.addClass('error');
				showTipsBox(this, verifyResult.msg);
			}
		},
		success : function(){
			checkValidCode(this, "forgetPwd");
		}
	});
	//显示密码是否可见性
	$(document).on("click","#togglePassword1", function(){
		var inp,val;
		inp = $("#setPwd1");
		val = inp.val();
		$(this).toggleClass("on");
		if($(this).hasClass("on")){
			$(".set_pwd").html('<input value="'+val+'" type="password" id="setPwd1" class="itext IText password" placeholder="密码须是6-20位字母、数字或符号" verify-data="password" tabindex="2">');
		}else{
			$(".set_pwd").html('<input value="'+val+'" type="text" id="setPwd1" class="itext IText password" placeholder="密码须是6-20位字母、数字或符号" verify-data="password" tabindex="2">');
		} 
	})

	$(document).on("click","#togglePassword2", function(){
		var inp,val;
		inp = $("#setPwd2");
		val = inp.val();
		$(this).toggleClass("on");
		if($(this).hasClass("on")){
			$(".set_pwd2").html('<input value="'+val+'" type="password" id="setPwd2" class="itext IText password" placeholder="密码须是6-20位字母、数字或符号" verify-data="password" tabindex="2">');
		}else{
			$(".set_pwd2").html('<input value="'+val+'" type="text" id="setPwd2" class="itext IText password" placeholder="密码须是6-20位字母、数字或符号" verify-data="password" tabindex="2">');
		} 
	})
	
	$(document).on("click","#togglePassword3", function(){
		var inp,val;
		inp = $("#setPwd3");
		val = inp.val();
		$(this).toggleClass("on");
		if($(this).hasClass("on")){
			$(".set_pwd3").html('<input value="'+val+'" type="password" id="setPwd3" class="itext IText password" placeholder="密码须是6-20位字母、数字或符号" verify-data="password" tabindex="2">');
		}else{
			$(".set_pwd3").html('<input value="'+val+'" type="text" id="setPwd3" class="itext IText password" placeholder="密码须是6-20位字母、数字或符号" verify-data="password" tabindex="2">');
		} 
	})
	//重置密码
	$('.ResetPasswordCheck').formCheck({
		showMsg : function(verifyResult){
			if ( verifyResult.status ) {
				verifyResult.obj.removeClass('error');
			}else {
				verifyResult.obj.addClass('error');
				showTipsBox(this, verifyResult.msg);
			}
		},
		success : function(){
			
			submitResetPwd(this);
			
		}
	});
	
	function submitResetPwd($ResetPasswordCheck){
		var url = baseUrl + "/updatePassword.html";
		var firstPassword = $ResetPasswordCheck.find('[verify-data=password]').val();
		var confirmPassword = $ResetPasswordCheck.find('[verify-data=rePassword]').val();
		var mobile = $('.ForgetPasswordCheck').find('[verify-data=mobile]').val();
		var mobileCode = $('.ForgetPasswordCheck').find('[verify-data=captha]').eq(0).val();
		
		if(firstPassword == ""){
			alert("密码不能为空");
			return;
		}
		if(firstPassword != confirmPassword){
			alert("密码两次输入不一致");
			return;
		}
		
		$.ajax({
			type : 'POST',
			url : url,
			data : {
				'mobile' : mobile,
				'password' : firstPassword == "" ? "" : hex_md5(firstPassword),
				'mobileCode' : mobileCode
			},
			success : function(data){
				var res = $.parseJSON(data);
				if(res.statusCode == "200"){
					alert("重置密码成功，请使用新密码登录");
					dialogClose($ResetPasswordCheck.parents('.DialogFrame'));
					$PassBoxTabTrigger.eq(1).click();
					dialogShow($PassBox);
				}else{
					alert(res.msg);
				}
			},
			error : function(res){
				alert(res.msg);
			}
		});
	}

	
});



