$(function(){
	//验证+登录
	//全局是否点击登录按钮
	//var regiClick = false;
	
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
				//if(regiClick)return
				//regiClick=true;
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
/*$(".CheckSubmit.zc").on("click",function(){
	
});*/
	
	//获取手机验证码
	var $MobileCheck = $('.MobileCheck');
	$MobileCheck.click(function(){
		var $this = $(this);
		var $MobileInput = $this.parents('table').find('.MobileInput');
		var $TipsFrame = $this.parents('.TipsFrame');
		var $ImgCaptchaCode = $this.parents('table').find('.ImgCaptchaCode');
		if ( $.trim($MobileInput.val()) == '' ) {
			showTipsBox($TipsFrame, '<strong>手机号码不能为空</strong>');
			return false;
		}
		if ( $.trim($ImgCaptchaCode.val()) == '' ) {
			showTipsBox($TipsFrame, '<strong>验证码不能为空</strong>');
			return false;
		}
		if (!/^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/i.test($.trim($MobileInput.val()))) {
			showTipsBox($TipsFrame, '<strong>请输入有效的手机号码</strong>');
			return false;
		}
		if ( $this.hasClass('disabled') ) {
			return false;
		}else {
			var flag = $this.attr("attr-flag");
			
			var result = sendValidCode($.trim($MobileInput.val()), $.trim($ImgCaptchaCode.val()), flag);
			if(result){
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
					if ( second == 0 ) {
						clearTimeout(t);
						$this.removeClass('disabled');
						$CheckDefault.show();
						$CheckActive.hide();
					}
				}
				var t = setInterval(count, 1000);
			}
		}
	});
});

function refreshImageTmp(imageId){
	var image=document.getElementById(imageId);
	var url=__httpsPath + "/generateImage.html";
	var xmlHttpReq=null;
	if(window.ActiveXObject){
		xmlHttpReq=new ActiveXObject("Microsoft.XMLHTTP");
	}else if(window.XMLHttpRequest){
		xmlHttpReq = new XMLHttpRequest();
	}
	xmlHttpReq.open("Post", url, true);
	xmlHttpReq.send(null); 
	
	image.src=url + "?rand="+parseInt(1000*Math.random());
	return false;
}

function submitRegister($LoginArea, verifyItems){
	//手机注册
	if($(".MobileInput").val()!=""){
		var $TipsBox = $LoginArea.find('.TipsBox');
		var $password = $LoginArea.find('[verify-data=password]');
		var mobile = $LoginArea.find('[verify-data=mobile]').val();
		var password = $password.val() == "" ? "" : hex_md5($password.val());
		var mobileCaptha = $(".mobilecodeInput").val();//手机验证码
		var source = $("#source").val();
		var url = "/storefront/member/registerByMobile.html";
		var direct = $("#direct").val();
		var rdcUrl=window.location.href;
		$.ajax({
			type : 'POST',
			url : url,
			dataType:'json',
			data : {
				'mobile' : mobile,
				'password' : password,
				'mobileCaptha' : mobileCaptha,
				'source' : source
			},
			success : function(data){
				var res = data;
				if(res.statusCode == "200"){
					
					var memberCookie = {"sid" : res.sid, "id" : res.memberView.userId, "partyName" : res.memberView.partyName};
					$.cookie('memberCookie', JSON.stringify(memberCookie), { expires: 7, path: '/' });
					//设置购物车数量
					setCartNumber(res.cartNumber);
					var source = res.source;
					
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
						if(direct && direct.indexOf("http") != -1){
							document.location.href = baseUrl + "/rdcDirect.html?rdcUrl="+direct;
		    				return;
		    			}
						if(source.indexOf(".html") == -1 || source.indexOf("toLogin") != -1){
							source = "/index.html";
						}
					
					checkLogin();
					if($("#quickSubmitFlag").val() == "quick"){
						dialogClose($('#PassBox'));
						syncCartAfterLogin(res);
					}else if($("#loginFlag").val() == "loginFlag") {
						dialogClose($('#PassBox'));
						if($("#refreshFlag").val() == "true"){
							location.reload();
						}
					}else{
						document.location.href = baseUrl + "/rdcDirect.html?rdcUrl="+rdcUrl;
					}
				}else{
					showTipsBox($TipsBox, '<strong>' + res.msg + '</strong>');
				}
			},
			error : function(res){
				showTipsBox($TipsBox, '<strong>' + res.msg + '</strong>');
			}
		});
	}
	//邮箱注册
	if($(".EmailInput").val()!=""){
		var $TipsBox = $LoginArea.find('.TipsBox');
		var email = $(".EmailInput").val();
		var $password = $LoginArea.find('[verify-data=password]');
		var password = $password.val() == "" ? "" : hex_md5($password.val());
		var source = $("#source").val();
		var code=$("#reg_code").val();
		var url = "/storefront/member/registerByEmail.html";
		$.ajax({
			type : 'POST',
			url : url,
			dataType:'json',
			data : {
				'email' : email,
				'password' : password,
				'source' : source,
				'code':code
			},
			success : function(data){
				var res = data;
				if(res.statusCode == "200"){
					document.location.href = __ctxPath +"/storefront/member/operateSuccess2.html?email="+email;
					_adwq.push([ '_setAction','8g8nuv',res.memberView.userId]); 
				}
				else{
					showTipsBox($TipsBox, '<strong>' + res.msg + '</strong>');
					refreshImageTmp('imgCaptchaCode');
				}
			},
			error : function(res){
				showTipsBox($TipsBox, '<strong>' + res.msg + '</strong>');
			}
		});
	}
}

function refresh_reg_Image(){
	var url=__httpsPath + "/generateImage.html";
	$("#reg_img_code").attr("src",url + "?rand="+parseInt(1000*Math.random()));
	return false;
}

function sendValidCode(mobile, imgCode, flag){
	var $TipsBox =  $('.RegisterCheck .TipsBox');
	var result = true;
	var url =  "/storefront/member/getValidCode.html";
	$.ajax({
		type : 'POST',
		async : false,
		url : url,
		dataType:'json',
		data : {
			'mobile' : encode64(mobile),
			'imgCode' : imgCode,
			'flag' : flag
		},
		success : function(data){
			var res = data;
			if(res.statusCode == "200"){
			}else{
				showTipsBox($TipsBox, '<strong>'+res.msg+'</strong>');
				result = false;
				refreshImageTmp('imgCaptchaCode');
			}
		},
		error : function(res){
			showTipsBox($TipsBox, '<strong>验证码获取失败</strong>');
			result = false;
		}
	});
	return result;
}

function checkValidCode($validCode){
	//重置密码
	var $ResetPasswordBox = $('#ResetPasswordBox');
	
	var mobile = $validCode.find('[verify-data=mobile]').val();
	var mobileCode = $validCode.find('[verify-data=captha]').eq(0).val();
	
	
	var url = baseUrl + "/checkCodeEffective.html";
	$.ajax({
		type : 'POST',
		url : url,
		dataType:'json',
		data : {
			'mobile' : mobile,
			'mobileCode' : mobileCode
		},
		success : function(data){
			var res = data;
			if(res.statusCode == "200"){
				dialogClose($validCode.parents('.DialogFrame'));
				dialogShow($ResetPasswordBox);
			}else{
				showTipsBox($validCode, '<strong>'+res.msg+'</strong>');
			}
		},
		error : function(res){
			showTipsBox($TipsBox, '<strong>验证码验证失败</strong>');
		}
	});
}
// base64加密开始
var keyStr = "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" + "ghijklmnopqrstuv"
                + "wxyz0123456789+/" + "=";
function encode64(input) {

    var output = "";
    var chr1, chr2, chr3 = "";
    var enc1, enc2, enc3, enc4 = "";
    var i = 0;
    do {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                    enc4 = 64;
            }
            output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2)
                            + keyStr.charAt(enc3) + keyStr.charAt(enc4);
            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";
    } while (i < input.length);

    return output;
}

//注册登录切换
$(document).ready(function(){
	  $(".PasswordChange").click(function(){
		var hd = $(this).parent().parent("div").index();
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
	  			$(".mobilecodeInput").attr("verify-data","phoneCaptha");
	  			$(".MobileInput").attr("tabindex","1");
	  			$(".password").attr("tabindex","2");
	  			$(".mobilecodeInput").attr("tabindex","3");
	  			$(".EmailInput").attr("tabindex","");
	  			$(".EmailInput").val("");
	  			$(".password").val("");
	  			$(".rpassword").val("");
				$(".yzm").show();
				$("#yzm_reg").removeClass('none');
				$('#reg_code').attr("verify-data","captha");
	  		});
	  	}
	  });
	});