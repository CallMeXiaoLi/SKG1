$(function(){
	//全局提示对象
	var $GlobalTipsBox = $('.GlobalTipsBox');
	//全局是否点击登录按钮
	var hadClick = false;

	//进来就检测是否登录
	checkLogin();

	var cartNumber=$.cookie('cartNumberCookie');
	if(cartNumber &&"null" !=cartNumber){
		setCartNumber(cartNumber);
	}
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
			submitLogin(this);
		}
	});
	var $ValidateCheck=$('.LoginCheck2');
	$ValidateCheck.formCheck({
		showMsg : function(verifyResult){
			if ( verifyResult.status ) {
				verifyResult.obj.removeClass('error');
			}else {
				verifyResult.obj.addClass('error');
				showTipsBox(this, verifyResult.msg);
			}
		},
		success : function(){
//			if(hadClick)return;
			hadClick=true;
			submitLogin2(this);
		}
	});
	//登录密码控件监听回车登录 edit by LGL 2015.03.27
	var $LoginPassword = $LoginCheck.find('[verify-data=loginPassword]');
	$LoginPassword.keydown(function(event){
		var $this = $(this);
		if ( event.keyCode == 13) {
			$this.parents('.LoginCheck').find('.CheckSubmit').click();
	    }
	});


	$(".MyAccount").click(function(){
		//前往会员中心
		toMemberCenter();
	});

	/*$("#resetSubmit").on("click", function(){
		//重置密码提交
		submitResetPwd();
	});*/

	$("#logout").on("click", function(){
		//注销
		logout();
	});


function submitLogin($LoginArea){
	var $TipsBox = $LoginArea.find('.TipsBox');

	var url = "/storefront/member/login.html";

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
	$.ajax({
		type : 'POST',
		url : url,
		dataType:'json',
		data : {
			'loginName' : loginName,
			'password' : password,
			'source' : source,
			'callType' : callType,
			'directCartId' : directCartId,
			'isReMe':isReMe,
			'verifyLogin':verifyLogin
		},
		success : function(data){
			var res = data;
			if(res.statusCode == "200"){

		//		var MemberCooike = {"sid" : res.sid, "id" : res.memberView.userId, "partyName" : res.memberView.partyName};
		//		$.cookie('MemberCooike', JSON.stringify(MemberCooike), { expires: 7, path: '/' });//这个貌似已经作废
				//设置购物车数量
				setCartNumber(res.cartNumber);
				$("#myAccount").html(res.memberView.partyName);
				$(".index_partyName").html(res.memberView.partyName);
				$("#beforeLogin").hide();
    			$("#afterLogin").show();
				if($("#quickSubmitFlag").val() == "quick"){
					dialogClose($('#PassBox'));
					syncCartAfterLogin(res);
				}else if($("#loginFlag").val() == "loginFlag") {
					dialogClose($('#PassBox'));
					if($("#refreshFlag").val() == "true"){
						location.reload();
					}
				}else{
					
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
					if(direct.indexOf("http") != -1){
	    				document.location.href =direct;
	    				return;
	    			}
					if(source.indexOf(".html") == -1 || source.indexOf("toLogin") != -1){
						source = "/index.html";
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
					
					document.location.href = __ctxPath + source+direct ;
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
		},
		error : function(res){
			hadClick=false;
			showTipsBox($GlobalTipsBox, '<strong>登录失败！</strong>');
			
		}
	});
}

function toMemberCenter(){
	var source=window.location.href;
	if(__ctxPath==""){
		var begin = source.indexOf("/",8);
		source=source.substring(begin,source.length);
	}else{
		var begin = source.indexOf(__ctxPath);
		source=source.substring(begin+__ctxPath.length,source.length);
	}
	document.location.href = baseUrl + "/memberInfo.html?source="+source;
}
function logout(){
	var url =  "/storefront/member/logout.html";
	$.ajax({
		type : 'POST',
		url : url,
		success : function(data){
			try{
				var res = $.parseJSON(data);
				if(res.statusCode == "200" || res.statusCode == "201" || res.statusCode == "505"){
			//		$.cookie('MemberCooike', null, {path:'/'});
					$.cookie('cartNumberCookie', null, {path:'/'});
					$.cookie('cartNumberCookie', null, {path:'/',domain:(domainStr?domainStr:'.skg.com')});
					$.cookie('CART', null, {path:'/'});
					$.cookie('skgMember', null, {path:'/',domain:'.skg.com'});
					document.location.href = __ctxPath;
				}else{
					alert(res.msg);
				}
			}catch(e){
			//	$.cookie('MemberCooike', null, {path:'/'});
				$.cookie('cartNumberCookie', null, {path:'/'});
				$.cookie('cartNumberCookie', null, {path:'/',domain:(domainStr?domainStr:'.skg.com')});
				$.cookie('CART', null, {path:'/'});
				$.cookie('skgMember', null, {path:'/',domain:'.skg.com'});
				document.location.href = __ctxPath;
			}
		},
		error : function(res){
		//	$.cookie('MemberCooike', null, {path:'/'});
			$.cookie('cartNumberCookie', null, {path:'/'});
			$.cookie('cartNumberCookie', null, {path:'/',domain:(domainStr?domainStr:'.skg.com')});
			$.cookie('CART', null, {path:'/'});
			$.cookie('skgMember', null, {path:'/',domain:'.skg.com'});
			document.location.href = __ctxPath;
		}
	});
}

});

//检测是否登录
function checkLogin(){
	var url = "/storefront/member/checkLogin.html";
	$.ajax({
        url: url,
        cache: false,
        type: "get",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (data) {
        	try{
        		obj = $.parseJSON(data);
        		if(obj.statusCode == "200"){
        			if(obj.memberView.partyName){
        				$("#myAccount").html(obj.memberView.partyName);
        				$(".index_partyName").html(obj.memberView.partyName);
        				$("#myUsablePoints").html(obj.memberView.meEntityView.pointUsable);
        			}
        			setCartNumber(obj.cartNumber);
        			$("#beforeLogin").hide();
        			$("#afterLogin").show();
        			
        			//判断会员是否有未查看的优惠券
        			checkCertificateView();
            	}else{
            		var skgMember= $.cookie('skgMember');
            		if(skgMember){
            			skgMemberLogin(skgMember);
            		}
            		
            		$(".CertificateViewFlag").hide();
            	}
        	}catch(e){

        	}
        },
        error: function (data) {
        	//alert(obj.msg);
        }
    });
}
function cookieLogin(str){
	console.log("cookieLogin"+str);
}
function skgMemberLogin(skgMember){
	var url = baseHttpsUrl + "/cookieLogin.html";
	$.ajax({
        url: url,
        type : 'POST',
		dataType:'json',
		data : {
			memberCooike:skgMember
		},
        success: function (data) {
        	try{
        		var tt = JSON.stringify(data);
        		obj = $.parseJSON(tt);
        		if(obj.statusCode == "200"){
        			location.reload(false);
            	}
        	}catch(e){
        	}
        }
    });
}



function submitLogin2($LoginArea){
	var $TipsBox = $LoginArea.find('.TipsBox');
	var $LoginPassword = $LoginArea.find('[verify-data=loginPassword]');
	var $source = $LoginArea.find("#source");
	var $direct = $LoginArea.find("#direct");
	var $ssid=$LoginArea.find("#ssid");
	var $toUrl=$LoginArea.find("#toUrl");
	var password=$LoginPassword.val()==""?"":hex_md5($LoginPassword.val());
	var source=$source.val();
	var direct=$direct.val();
	var ssid=$ssid.val();
	var toUrl=$toUrl;
	$.ajax({
		type : 'POST',
		url : baseHttpsUrl+"/validate.html",
		dataType:'json',
		data : {
			'password' : password,
			'source' : source,
			'ssid':ssid,
			'direct':direct
		},
		success:function(data){
			data=data.model;
			if(data.validate=="true"){
				window.location=data.url;
			}
			else{
				showTipsBox($TipsBox, '<strong>密码错误,验证失败！</strong>');
			}
			hadClick=false;
			
		},
		error:function(data){
			hadClick=false;
		}
});
}

function checkCertificateView(){
	var url = "/storefront/member/checkCertificateView.html";
	$.ajax({
        url: url,
        cache: false,
        type: "get",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (data) {
        	try{
        		obj = $.parseJSON(data);
        		if(obj.statusCode == "200"){
        			if(obj.certificateViewView && obj.certificateViewView.flag == "Y"){
        				$(".CertificateViewFlag").show();
        			}else{
        				$(".CertificateViewFlag").hide();
        			}
            	}else{
            		$(".CertificateViewFlag").hide();
            	}
        	}catch(e){

        	}
        },
        error: function (data) {
        	//alert(obj.msg);
        }
    });
}
