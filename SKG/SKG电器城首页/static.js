var hadClick=false;

function createTopLogin(){
	var cIframe = document.createElement("iframe");
	cIframe.id='loginFrame';
	cIframe.style.display="none";
	cIframe.setAttribute("src",staticDynPath+"/wap.html?ftlUrl=/storefront/include/topLogin");
	document.getElementById("toFrame").appendChild(cIframe);
	var loginInput = document.createElement("input");
	loginInput.setAttribute("type","hidden");
	loginInput.setAttribute("id","isLogin");
	loginInput.setAttribute("value","false");
	document.getElementById("toFrame").appendChild(loginInput);

}


function loadLoginInfo(){
	var cartNumber=$.cookie('cartNumberCookie');
	if(cartNumber &&"null" !=cartNumber){
		setCartNumber(cartNumber);
	}
	var getLogin = setInterval(function(){
		var cookieStr = $.cookie("checkLogin");
		if(cookieStr!=null){
			clearInterval(getLogin)
			$.cookie("checkLogin",null,{path:'/',domain:domainStr})
			var res = $.parseJSON(cookieStr);
    		if(res.statusCode == "200"){
    			$("#isLogin").val(true)
    			if(res.memberView.partyName){
    				$("#myAccount").html(res.memberView.partyName);
    				$(".index_partyName").html(res.memberView.partyName);
    				$("#myUsablePoints").html(res.memberView.meEntityView.pointUsable);
    			}
    			
    			setCartNumber(res.cartNumber);
    			$("#beforeLogin").hide();
    			$("#afterLogin").show();
    			$.cookie('CertificateViewCheck', 'yes', {path:'/',domain:domainStr});
    			$.cookie('checkLogin', null, {path:'/',domain:domainStr});
        	}else{
        		$("#isLogin").val(false);
        		$(".CertificateViewFlag").hide();
        	}
		}else{
    		$("#isLogin").val(false);
    		$(".CertificateViewFlag").hide();
		}
	},200);
	
	var CertificateViewFlag = setInterval(function(){
		var cookieStr = $.cookie("CertificateViewFlag");
		if(cookieStr!=null){
			try{
        		obj = JSON.parse(cookieStr);
        		if(obj.statusCode == "200"){
        			if(obj.certificateViewView && obj.certificateViewView.flag == "Y"){
        				$(".CertificateViewFlag").show();
        			}else{
        				$(".CertificateViewFlag").hide();
        			}
            	}else{
            		$(".CertificateViewFlag").hide();
            	}
        		clearInterval(CertificateViewFlag);
				$.cookie('CertificateViewFlag', null, {path:'/',domain:domainStr});
        		
        	}catch(e){}
		}
	},200);
	
	//不需要关闭循环监听的方法
	setInterval(function(){
		var logout = $.cookie("logout");
		if(logout!=null&&logout=="yes"){
			$.cookie('logout',null, {path:'/'  ,domain:domainStr  });
			location.href=staticPath;
		}else if(logout!=null&&logout=="no"){
			$.cookie('logout',null, {path:'/'  ,domain:domainStr  });
			location.reload();
		}
		var QQList = $.cookie("QQList");
		if(QQList!=null&&typeof QQList=="string"){
			$.cookie('QQList', null, {path:'/'  ,domain:domainStr  });
			var QQListArr = QQList.split("#");
			$(".siteQQ").empty();
			for(var x=0;x<QQListArr.length;x++){
				var QQItem = QQListArr[x];
				var QQ = QQItem.split("=");
				var $a = $('<a class="QQ" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin='+QQ[1]+'&site=qq&menu=yes" ></a>')
				var $img =$('<img src="http://img.skg.com/skg/store/QQList.jpg?p=2:'+QQ[1]+':41"  border="0" alt="'+QQ[0]+'" title="'+QQ[0]+'" />')
				var $span =$("<span>"+QQ[0]+"</span>")
				$a.append($img,$span)
				$(".siteQQ").append($a);
				
				
		    }
			if(QQListArr.length>4){
				var QHeight = $(".siteQRCode").height();
				var tHeight = $(".toolbar").height()+120;
				var bottom;
				if(QHeight>tHeight){
					bottom = (QHeight-tHeight+140);
				}
				 $(".toolbar").css({"bottom":bottom+"px"})
			}
			
		}
	
	},200);
}

//登陆方法
function submitLogin($LoginArea){
	var $TipsBox = $LoginArea.find('.TipsBox');
	var $GlobalTipsBox = $('.GlobalTipsBox');
	

	var $LoginName = $LoginArea.find('[verify-data=loginName]');
	var $LoginPassword = $LoginArea.find('[verify-data=loginPassword]');
	var $isReMe=$LoginArea.find('[verify-data=isReMe]:checked');
	var loginName = $LoginName.val();
	var password = $LoginPassword.val() == "" ? "" : hex_md5($LoginPassword.val());
	var isReMe=$isReMe.length==0?"no":"yes";
	//去结算时跳转到单独的登录页面，登录后这个source会记住从哪里进到登录页面，便跳回到结算页去
	var $source = $LoginArea.find("#source");
	var source = $source.val();
	
	var $direct = $LoginArea.find("#direct");
	var direct = $direct.val();
	
	var $callType = $LoginArea.find("#callType");
	var callType = $callType.val();
	
	var $directCartId = $LoginArea.find("#directCartId");
	var directCartId = $directCartId.val();
	
	var $verifyLogin = $LoginArea.find("#verifyLogin");
	var verifyLogin = $verifyLogin.val();
	var data = {
			'loginName' : loginName,
			'password' : password,
			'source' : source,
			'callType' : callType,
			'directCartId' : directCartId,
			'isReMe':isReMe,
			'verifyLogin':verifyLogin
		};
	$.cookie('submigLogin', JSON.stringify(data), {path:'/'  ,domain:domainStr  });
	clearInterval(getLogin);
	//var timmer=false;
	//if(!timmer){
		var getLogin = setInterval(function(){
			var loginData = $.cookie('submigLoginResult');
			if(loginData!=null){
				clearInterval(getLogin);
				if(loginData=="error"){
					hadClick=false;
					showTipsBox($GlobalTipsBox, '<strong>登录失败！</strong>');
					$.cookie('submigLoginResult', null, {path:'/'  ,domain:domainStr  });
					return;
				}
				var res = JSON.parse(loginData);
				if(res.statusCode == "200"){	
					hadClick=false;	
					
					$.cookie('submigLoginResult', null, {path:'/'  ,domain:domainStr  });
					//设置购物车数量
					setCartNumber(res.cartNumber);
					var $direct = $(data.direct).find("#direct");
					var direct = $direct.val();
					if($("#quickSubmitFlag").val() == "quick"){
						dialogClose($('#PassBox'));
						//快捷支付的时候。
						syncCartAfterLogin(res);					
						//postTopFrameMessage(data);
					}else if($("#loginFlag").val() == "loginFlag") {
						dialogClose($('#PassBox'));
						if($("#refreshFlag").val() == "true"){
							document.location.reload();
						}else{
							//postTopFrameMessage(data);
						}
					}else{
						
						var source = res.source;
						if(!source){
							source = $("#source").val();
						}
						if(!source){
							source=window.location.href;
							if(staticPath==""){
								var begin = source.indexOf("/",8);
								source=source.substring(begin,source.length);
							}else{
								var begin = source.indexOf(__ctxPath);
								var end = source.indexOf("#");
								source=source.substring(begin+__ctxPath.length, end==-1?source.length:end);
							}
						}
						if(source.indexOf(".") == -1 || source.indexOf("toLogin") != -1){
							source = "/index.";
						}
						if(direct){
			      			if(source.indexOf("?")==-1){
			      				direct="?direct="+direct;
			      			}else{
			      				direct="&direct="+direct;
			      			}
			      		}else{
			      			direct="";
			      		}
						
						document.location.href = staticPath + source+direct ;
					}
					
				
				}
				else if(res.statusCode == "616"){
					showTipsBox($TipsBox, '<strong>登录失败！'+res.msg+'</strong>');
					hadClick=false;
				}
				else{
					if(res.msg){
						showTipsBox($TipsBox, '<strong>登录失败！'+res.msg+'</strong>');
					}else{
						showTipsBox($TipsBox, '<strong>登录失败！</strong>');
					}
					hadClick=false;
					
					
				}
				
			}
		},200)
	//}
	
}
//注册方法
function submitRegister($LoginArea, verifyItems){
	//手机注册
	if($(".MobileInput").val()!=""){
		var $TipsBox = $LoginArea.find('.TipsBox');
		var $password = $LoginArea.find('[verify-data=password]');
		var mobile = $LoginArea.find('[verify-data=mobile]').val();
		var password = $password.val() == "" ? "" : hex_md5($password.val());
		var mobileCaptha = $(".mobilecodeInput").val();//手机验证码
		var source = $("#source").val();
		var data={
				'mobile' : mobile,
				'password' : password,
				'mobileCaptha' : mobileCaptha,
				'source' : source
			}
		$.cookie('mobileRegister', JSON.stringify(data), {path:'/'  ,domain:domainStr  });
		var mobileTimer = setInterval(function(){
			var mobileRegReuslt = $.cookie('mobileRegReuslt');
			if(mobileRegReuslt!=null){
				var res = JSON.parse(mobileRegReuslt);
				clearInterval(mobileTimer)
				if(res.flag=="error"){
					
					showTipsBox($TipsBox, '<strong>' + res.msg + '</strong>');
					return;
				}
				if(res.statusCode == "200"){
					alert("注册成功");
					var memberCookie = {"sid" : res.sid, "id" : res.memberView.userId, "partyName" : res.memberView.partyName};
					$.cookie('memberCookie', JSON.stringify(memberCookie), { expires: 7, path: '/' });
					_adwq.push(['_setAction','8g8nuv',res.memberView.userId]); 					
					//设置购物车数量
					setCartNumber(res.cartNumber);
					var source = res.source;
					if(source==""){
						location.reload();
					}
					else{
					if(!source){
						source = $("#source").val();
					}
					if(!source){
						source=window.location.href;
						if(__ctxPath==""){
							var begin = source.indexOf("/",8);
							source=source.substring(begin,source.length);
						}else{
							var begin = source.indexOf(__ctxPath);
							var end = source.indexOf("#");
							source=source.substring(begin+__ctxPath.length, end==-1?source.length:end);
						}
					}
					if(source.indexOf(".") == -1 || source.indexOf("toLogin") != -1){
						source = "/index.";
					}
						document.location.href = __ctxPath + source + "?direct="+direct;
					}
					$.cookie('checkLoginAfterRegister', "true", {path:'/'  ,domain:domainStr  });
					//checkLogin();
					
				}else{
					showTipsBox($TipsBox, '<strong>' + res.msg + '</strong>');
				}
			}
		},200)
		
	}
	//邮箱注册
	if($(".EmailInput").val()!=""){
		var $TipsBox = $LoginArea.find('.TipsBox');
		var email = $(".EmailInput").val();
		var $password = $LoginArea.find('[verify-data=password]');
		var password = $password.val() == "" ? "" : hex_md5($password.val());
		var source = $("#source").val();
		var code=$("#reg_code").val();
		var data = {
			'email' : email,
			'password' : password,
			'source' : source,
			'code':code
		};
		$.cookie('mailRegister', JSON.stringify(data), {path:'/'  ,domain:domainStr  });
		var mailTimer = setInterval(function(){
			var mailRegReuslt = $.cookie('mailRegReuslt');
			
			if(mailRegReuslt!=null){
				clearInterval(mailTimer);
				var res = JSON.parse(mailRegReuslt);
				if(res.flag=="error"){
					showTipsBox($TipsBox, '<b>' + res.msg + '</b>');
					return;
				}
				if(res.statusCode == "200"){
					window.parent.document.location.href = __ctxPath +"/storefront/member/operateSuccess2.?email="+email;
					_adwq.push(['_setAction','8g8nuv',res.memberView.userId]); 
				}
				else{
					showTipsBox($TipsBox, '<b>' + res.msg + '</b>');
					refresh_reg_Image();
				}
			}
		},200)
	}
}
//刷新验证码
function refresh_reg_Image(){
	var url=__ctxPath + "/generateImage.";
	$("#reg_img_code").attr("src",url + "?rand="+parseInt(1000*Math.random()));
	return false;
}

//抱怨弹窗
function loadFeedback(){
	dialogShow($("#FeedbackBox"));
}
$(function(){
	$("#logout").on("click", function(){
		$.cookie('logoutEvent', "yes", {path:'/',domain:domainStr});
	});
	
	//验证+登录
	var $LoginCheck = $('.LoginCheck');
	$LoginCheck.formCheck({
		showMsg : function(verifyResult){
			if ( verifyResult.status ) {
				verifyResult.obj.removeClass('error');
			}else {
				verifyResult.obj.addClass('error');
				showTipsBox(this, verifyResult.msg);
			}
		},
		success : function(){
			if(hadClick)return;
			hadClick=true;
			submitLogin($(this));
		}
	});
	
	//注册登录对应切换
	var $PassBoxTabTrigger = $('#PassBox .TabTrigger');
	$('.RegisterBox').click(function(){
		$PassBoxTabTrigger.eq(0).click();
	});
	$('.LoginBox').click(function(){
		$PassBoxTabTrigger.eq(1).click();
	});
	
	//获取手机验证码
	var $MobileCheck = $('.MobileCheck');
	$MobileCheck.click(function(){
		var $this = $(this);
		var $MobileInput = $this.parents('table').find('.MobileInput');
		var $TipsFrame = $this.parents('.TipsFrame');
		var $TipsBox = $(".RegisterCheck").find(".TipsBox");
		if ( $.trim($MobileInput.val()) == '' ) {
			showTipsBox($TipsBox, '<b>手机号码不能为空</b>');
			return false;
		}
		if (!/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i.test($.trim($MobileInput.val()))) {
			showTipsBox($TipsBox, '<b>请输入有效的手机号码</b>');
			return false;
		}
		if ( $this.hasClass('disabled') ) {
			return false;
		}else {
			var flag = $this.attr("attr-flag");
			var mobile = $.trim($MobileInput.val())
			var data={
				'mobile' :mobile ,
				'flag' : flag
			}
			$.cookie('getCode', JSON.stringify(data), {path:'/'  ,domain:domainStr  });
			var getValidCode = setInterval(function(){
				
				var result = $.cookie('getCodeReuslt');
				if(result!=null&&result=="true"){
					clearInterval(getValidCode)
					$.cookie('getCodeReuslt', null, {path:'/'  ,domain:domainStr});
					var $CheckDefault = $this.find('.CheckDefault');
					var $CheckActive = $this.find('.CheckActive');
					var $CheckTime = $this.find('.CheckTime');

					$this.addClass('disabled');
					$CheckDefault.hide();
					$CheckActive.show();

					var second = 60;
					$CheckTime.text(second);
					function count(){
						second --;
						$CheckTime.text(second);
						if (second == 0 ) {
							clearTimeout(t);
							$this.removeClass('disabled');
							$CheckDefault.show();
							$CheckActive.hide();
						}
					}
					var t = setInterval(count, 1000);
				}
			},200)


		}
	});
	
	//注册校验
	$('.RegisterCheck').formCheck({
		showMsg : function(verifyResult){
			if ( verifyResult.status ) {
				verifyResult.obj.removeClass('error');
			}else {
				verifyResult.obj.addClass('error');
				showTipsBox(this, verifyResult.msg);
			}
		}, 
		success : function(data,other){
				verifyText(".tab_body",function(){},function(){
					$(document)._alert(
							options={
							confirm:true,
							cancel:false,
							alert_text:'输入搜索内容不合法'
							}
						);
				},function (){
					submitRegister($('.RegisterCheck'));
				});
					
		}
	});
	//切换邮箱和手机注册方式
	$(".PasswordChange").click(function(){
	  	var hd = $(this).parent("div").index();
	  	if(hd == 0){
	  		$(".blue_mailx").animate({left:-600},1000,function(){
	  			$(".blue_mailx").css('left','600px');
	  			$(".MobileInput").removeAttr("verify-data");
	  			$(".mobilecodeInput").removeAttr("verify-data");
	  			$(".MobileInput").removeAttr("tabindex");
	  			$(".password").removeAttr("tabindex");
	  			$(".mobilecodeInput").removeAttr("tabindex");
	  			$(".EmailInput").attr("tabindex","1");
	  			$(".password").attr("tabindex","2");
	  			$(".IText").attr("tabindex","3");
	  			$(".EmailInput").attr("verify-data","email");
	  			$(".MobileInput").val("");
	  			$(".password").val("");
	  			$(".rpassword").val("");
	  			$(".mobilecodeInput").val("");
				$(".yzm").hide();
				$("#yzm_reg").removeClass('none');
				$('#reg_code').attr("verify-data","captha");
	  		});
	  		$(".red_Phonex").animate({left:0},1000);
	  	}else if(hd==1){
	  		$(".blue_mailx").animate({left:0},1000);
	  		$(".red_Phonex").animate({left:-600},1000,function(){
	  			$(".red_Phonex").css('left','600px');
	  			$(".EmailInput").removeAttr("verify-data");
	  			$(".MobileInput").attr("verify-data","mobile");
	  			$(".mobilecodeInput").attr("verify-data","captha");
	  			$(".MobileInput").attr("tabindex","1");
	  			$(".password").attr("tabindex","2");
	  			$(".mobilecodeInput").attr("tabindex","3");
	  			$(".EmailInput").attr("tabindex","");
	  			$(".EmailInput").val("");
	  			$(".password").val("");
	  			$(".rpassword").val("");
				$(".yzm").show();
				$("#yzm_reg").addClass('none');
				$('#reg_code').attr("verify-data","");
	  		});
	  	}
	  });
	
	$('.ForgetPassword').click(function(){
		window.open(__ctxPath + "/storefront/member/toFindPassword.");
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
	});
	
	
	loadLoginInfo();
	
})

createTopLogin();