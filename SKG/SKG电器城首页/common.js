

//弹层公共方法

//防止script驻入
/**
 * _success 最终校验表单结果成功后执行
 */
function verifyText(parent,_function,buhefa,_success){
	var str,vulText,$alert;
	var zhurubol=true;
	var inputLeng=$(parent).find('textarea,input[type=text]').length;
	var isOk = true;
	 for (var i = 0; i<inputLeng; i++) {
		 	vulText=$(parent).find('textarea,input[type=text]').eq(i).val();
			str=/<script>.+<\/script>/;
			$alert=str.exec(vulText);
			if ($alert!=null) {
				zhurubol=false;
			}
			if(!zhurubol){
				buhefa();
				isOk = false;
			}
			else{
				_function();
			}
	 };
	 if (isOk && _success){
		 _success();
	 }
}


//弹层定位 <Function return offsetTop>
function dialogFixed($DialogFrame){
		var $DialogBox = $DialogFrame.find('.DialogBox').length>0?$DialogFrame.find('.DialogBox'):$DialogFrame.find('.SKGDialogBox');
		var $DialogHeader = $DialogFrame.find('.DialogHeader')?$DialogFrame.find('.DialogHeader'):$DialogFrame.find('.SKGDialogTop');
		var $DialogBody = $DialogFrame.find('.DialogBody')?$DialogFrame.find('.DialogBody'):$DialogFrame.find('.SKGDialogCont');
		var $DialogFooter = $DialogFrame.find('.DialogFooter')?$DialogFrame.find('.DialogFooter'):$DialogFrame.find('.SKGDialogFoot');

		var dialogBodyOldHeight = 0;
		var dialogBodyNewHeight = 0;
		var offsetTop = 0;
		var dialogBoxOldHeight = 0;
		var dialogBoxNewHeight = 0;
		//文档可视高度
		var screenHeight = $(window).height();
		var screeWidth = $(window).height();
		var dialogShow = false;

	//初始化
		//判断弹层是否已经存在（Ajax加载数据时先显示层，装载数据后重置定位）
		if ( $DialogFrame.css('display') == 'none' ) {
			//先显示才有高度
			$DialogFrame.show();
			dialogShow = false;
		}else {
			dialogShow = true;
		};

		//因为每次动态计算DialogBox和DialogBody的高度，所以必须先初始化
		$DialogBox.height('auto');
		$DialogBody.height('auto');

		//DialogBox原始高度
		dialogBoxOldHeight = $DialogBox.height();
		//DialogBody原始高度
		dialogBodyOldHeight = $DialogBody.height();

		/*
		//如果有提示框，则算上其高度
		var $TipsFrame = $DialogBox.find('.TipsFrame');
		var TipsFrameH = $TipsFrame.length > 0 ? $TipsFrame.innerHeight() - $TipsFrame.height() : 0;
		*/
		var dialogHeaderHeight = $DialogHeader.outerHeight(true);
		var dialogFooterHeight = $DialogFooter.outerHeight(true);

	//定位处理
		//高度溢出处理
		if ( screenHeight - dialogBoxOldHeight < 0 ) {
			$DialogBody.height(screenHeight - dialogHeaderHeight - dialogFooterHeight - 20);
			offsetTop = 20 / 2;
		}else {
			$DialogBody.height(dialogBoxOldHeight - dialogHeaderHeight - dialogFooterHeight);
			offsetTop = ( screenHeight - dialogBoxOldHeight ) / 2;
		};

		dialogBodyNewHeight = $DialogBody.height();
		dialogBoxNewHeight = $DialogBox.height();
		var dialogBodyWidth = $DialogBox.width();
		//俏俏处理完后就隐藏
		if ( ! dialogShow ) {
			$DialogFrame.hide();
		};

		//返回定位数据
		var dialogFixedData = {
			offsetTop : offsetTop,
			dialogBodyOldHeight : dialogBodyOldHeight,
			dialogBodyNewHeight : dialogBodyNewHeight,
			dialogBoxNewHeight : dialogBoxNewHeight,
			dialogShow : dialogShow,
			screenHeight : screenHeight,
			marginLeft :0
		};
		if($DialogBox.hasClass("SKGDialogBox")){
			dialogFixedData.marginLeft=($(window).width()-dialogBodyWidth)/2;
		}
		return dialogFixedData;
	};
 
	//弹层展示 <Function>
	function dialogShow($DialogFrame){
		var $DialogBox = $DialogFrame.find('.DialogBox').length>0?$DialogFrame.find('.DialogBox'):$DialogFrame.find('.SKGDialogBox');
		var dialogFixedData = dialogFixed($DialogFrame);

		//检测弹层是否存在
		if ( ! dialogFixedData.dialogShow ) {
			//防止鼠标滚动冒泡
			$(document.body).addClass('mWBoxFixed');
			$DialogFrame.animate({'opacity' : 'show'}, 400);
			$DialogBox.css({'margin-top' : (dialogFixedData.screenHeight / 2), 'height' : 0});
		}
		if($DialogBox.hasClass("SKGDialogBox")){
			$DialogBox.css({"marginLeft":dialogFixedData.marginLeft});
		}
		$DialogBox.animate({'height' : dialogFixedData.dialogBoxNewHeight, 'margin-top' : dialogFixedData.offsetTop},400);
	};
	
	//弹层关闭 <Function>
	function dialogClose($DialogFrame){
		$DialogFrame.hide();
		var isBlock = 0;
		$.each($('.DialogFrame,.SKGDialog'), function(i, n){
			if ( $(n).css('display') == 'block' ) {
				isBlock = 1;
			};
		});
		if ( isBlock == 0 ) {
			//防止鼠标滚动冒泡
			$(document.body).removeClass('mWBoxFixed');
		};
	};

//提示框架公共方法

	//提示框架展现
	function showTipsBox($obj, tips){
		var $TipsBox = '';
		//配合验证插件 检测 传入的是否为提示框架本身
		if ( $obj.selector.indexOf('TipsBox') > -1 ) {
			$TipsBox = $obj;
		}else {
			$TipsBox = $obj.find('.TipsBox');
		};
		var $TipsCon = $TipsBox.find('.TipsCon');
		var $TipsClose = $TipsBox.find('.TipsClose');

		//初始化塞数据
		$TipsBox.finish();
		$TipsClose.finish();
		$TipsCon.html(tips);
		//show出来
		$TipsBox.animate({'opacity' : 1, 'bottom' : '0'}, 400, function(){
			$TipsBox.delay(3800).animate({'opacity' : 0}, 400, function(){
				$TipsBox.css('bottom',-50);
			});
		});
		$TipsClose.animate({'opacity' : 1, 'right' : '0'}, 400, function(){
			$TipsClose.delay(3800).animate({'opacity' : 0}, 400, function(){
				$TipsClose.css('right',-50);
			});
		});
	};

	//提示框架关闭
	function closeTipsBox($obj){
		$obj.finish();
	};

//星级评分 StarLevel
	function starLevel(){
		var $StarLevel = $('.StarLevel');
		var starPart = 10;	//一行分多少份
		$.each($StarLevel, function(i, n){
			var $StarLevel = $(n);
			var $StarFiller = $StarLevel.find('small');
			var $StarValue = $StarLevel.find('input:hidden');

			var objPartW = $StarLevel.width() / starPart;
			var oldFilledW = $StarValue.val() * objPartW;
			var newFilledW = 0;
			var hoverPercent = 0;

			$StarFiller.width(oldFilledW);
			$StarLevel.mousemove(function(e){
				var hoverOffsetX = e.pageX - $StarLevel.offset().left;
				hoverPercent = hoverOffsetX / objPartW;
				hoverPercent = hoverPercent > parseInt(hoverPercent) ? parseInt(hoverPercent) + 1 : hoverPercent;
				newFilledW = hoverPercent * objPartW;
				$StarFiller.width(newFilledW);
			});
			$StarLevel.click(function(){
				oldFilledW = newFilledW;
				$StarFiller.width(newFilledW);
				$StarValue.val(hoverPercent);
			});
			$StarLevel.mouseleave(function(){
				$StarFiller.width(oldFilledW);
			});
		});
	}

$(function(){
	var utils = new SKGUtils();
	
	//关闭头部广告图
	$(".site_top_bg").slideDown();
	$(".site_top_pic").slideDown();
	//关闭Dialog
	$(".dialog_close").click(function(){
	    $(".site_top_bg").hide(); 
	});
	//？？？
	var num = 0;
	setInterval(function() {
		if(num < $('.con ul li').length - 1) {
			num++;
		} else {
			num = 0;
		}
		$('.con ul').animate({
			left: -$('.con ul li').width() * num
		});
	}, 5000);
	
	/* 兼容ie7头部和查询按钮的层级调节 */
	$(".site_top").hover(function(){
		$(".site_header").css({"zIndex":"-1"});
		$(".index_banner").css({"zIndex":"-1"});
	},function(){
		$(".site_header").css({"zIndex":"1"});
		$(".index_banner").css({"zIndex":"1"});
	});
	
	//文档页目录
	var targetHref = window.location.href;
	// 	文档页栏目on控制
	var arrhref=targetHref.split("/");
	var tagname=arrhref[arrhref.length-1].split(".")[0];
	var docTarEle = $(".ArticleNavItem[href='"+tagname+".html']")
	docTarEle.addClass('on');
	docTarEle.parents(".aside-subnav").slideDown().prev().addClass("on").attr('href','javascript:;');
	$(".ArticleNavItem").on('click',function(){
	//	$(this).parent().siblings().find(".ArticleNavItem").removeClass("on").next().slideUp();
		var flag = $(this).hasClass("on");
		if(flag){
			$(this).removeClass("on");
			$(this).next().slideUp();
		}else{
			$(this).addClass("on");
			$(this).next().slideDown();
		}
	});
	$(".msgBox-close").click(function(){
		$(this).parent().hide();
		$(".showMsgBox").show();
	});
	$(".showMsgBox").click(function(){
		$(this).hide();
		$(".msgBox").show();
	});
	$("#submit").on('click',function(){
		//if($(this).attr("disabled") == "disabled")return;
		$(this).attr("disabled",'disabled');
		var name = $("#name").val();
		var cell = $("#cell").val();
		//var cont = $("#content").val();
		var qq = $("#qq").val();
		var reg = /^((13[0-9])|(15[^4,\D])|(18[0-9])|(17[0|6|7|8])|(14[5|7]))\d{8}$/;
		if($.trim(name).length==0){
			$(document)._alert({
				confirm:true,
				cancel:false,
				alert_text:'请输入您的姓名！'
			});
			return;
		}
		if(!reg.test(cell)){
			$(document)._alert({
				confirm:true,
				cancel:false,
				alert_text:'请输入正确的手机号码！'
			});
			return;
		}
		
//		if($.trim(cont).length==0){
//			$(document)._alert({
//				confirm:true,
//				cancel:false,
//				alert_text:'请输入留言内容！'
//			});
//			return;
//		}
		var str = "姓名："+name+"  电话："+cell+"  QQ："+qq;
		var params="";
		params += "content="+str;
		params += "&contectMethod="+cell;
		params += "&type=o2o";

		$.ajax({
			type: "POST",
			url:__ctxPath+"/storefront/feedback/addFeedback.html",
			data:params,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=utf-8", 
			success:function(result){
				var jsonRes = JSON.parse(result);
				$("#name").val('');
				$("#cell").val('');
				$("#qq").val('');
				 if(jsonRes.statusCode == "200"){
					 $(document)._alert({
								confirm:true,
								cancel:false,
								alert_text:'留言成功！'
						});
					 $("#submit").removeAttr("disabled");
					 try{
						 $("input[type=text]").each(function(){
							$(this).placeholder("#fff","#fff");
						});
					 }catch(e){
						 
					 }

				 }else{
					 $(document)._alert(
								options={
								confirm:true,
								cancel:false,
								alert_text:'留言失败！'
								}
							);
				 $("#submit").removeAttr("disabled");
				 }
			},
			error: function(){
				$("#name").val('');
				$("#cell").val('');
				$("#qq").val('');
				
				 $("#submit").removeAttr("disabled");
			}
	   });
		
	})
	
	
//初始化ajax.load不用缓存
	$.ajaxSetup({
		cache: false
	});

//验证简易方法
	$('.TipsFrame').formCheck({
		showMsg : function(verifyResult){
			if ( verifyResult.status ) {
				verifyResult.obj.removeClass('error');
//				verifyResult.obj.addClass('right');
			}else {
//				verifyResult.obj.removeClass('right');
				verifyResult.obj.addClass('error');
				//verifyResult.obj.focus();
				showTipsBox(this, verifyResult.msg);
			};
		},
		success : function(){
		}
	});

//提示框架关闭简易方法
	var $TipsClose = $('.TipsClose');
	$TipsClose.click(function(){
		var $this = $(this);
		closeTipsBox($this.parents('.TipsBox'));
	});


//弹层简易方法（只支持弹出一层）
	//触发弹层的对象
	var $DialogTrigger = $('[dialog]');
	//弹层的各种对象
	var $DialogClose = $('.DialogClose,.dialogClose');

	$.each($DialogTrigger, function(i, n){
		var $DialogTrigger = $(n);
		var $DialogFrame = '';
		$DialogFrame = $($DialogTrigger.attr('dialog'));

		//找不到对应的被触发对象（弹层）则放弃处理该触发对象
		if ( $DialogFrame != '' ) {
			$DialogTrigger.click(function(){
				dialogShow($DialogFrame);
			});
		};
	});

	//关闭弹层操作
	$DialogClose.click(function(){
		var $this = $(this);
		var $DialogFrame = $this.parents('.DialogFrame').length>0?$this.parents('.DialogFrame'):$this.parents(".SKGDialog");
		dialogClose($DialogFrame);
	});

//选项卡
	var $TabFrame = $('.TabFrame');
	$.each($TabFrame, function(i, n){
		var $n = $(n);
		var $TabTrigger = $n.find('.TabTrigger');
		var $TabItem = $n.find('.TabItem');
		$.each($TabTrigger, function(j, m){
			var $m = $(m);
			$m.click(function(){
				formateTab(j);
				$TabTrigger.removeClass('on');
				$m.addClass('on');
				$TabItem.removeClass('on').hide();
				$TabItem.eq(j).addClass('on').show();
				
			});
		});
		function formateTab(ind){
			$("#PassBox .TabTrigger").find("i").css({"display":"none"});
			$("#PassBox .TabTrigger").eq(ind).find("i").css({"display":"block"});
		};
	});


//触发外层显示 HoverShow
	var $HoverTrigger = $('.HoverTrigger');
	$('.HoverTrigger').hover(
		function(){
			$(this).parents('.TriggerArea').find('.HoverShow').show();
		},
		function(){
			$(this).parents('.TriggerArea').find('.HoverShow').hide();
		}
	);
//hoverOn事件(非a便签实现hover伪类)
	function hoverOn(){
		var $HoverOn = $('.HoverOn');
		$HoverOn.hover(
			function(){
				$(this).addClass('on');
			},
			function(){
				$(this).removeClass('on');
			}
		);
	}
	hoverOn();

//focusOn事件(表单控件focus&blur时增删on样式)
	function focusOn(){
		var $FocusArea = $('.FocusArea');
		$FocusArea.focus(function(){
			$(this).addClass('on');
		});
		$FocusArea.blur(function(){
			$(this).removeClass('on');
		});
	}
	focusOn();

//TabOn事件(为点击元素添加class="on"，去掉同级元素的on样式)
	function tabOn(){
		var $TabOn = $('.TabOn');
		$TabOn.click(function(){
			var $this = $(this);
			$this.siblings().removeClass('on');
			$this.addClass('on');
		});
	}
	tabOn();
//监听触发提交
	var $SubmitTrigger = $('.SubmitTrigger');
	$SubmitTrigger.keydown(function(event){
		var $this = $(this);
		if ( event.keyCode == 13) {
			$this.parents('.TriggerArea').find('.SubmitRespond').click();
	    };
	});

	/*	seo优化去除页面iframe*/
	var html='<iframe style="display:none" id="rfFrome" name="rfFrame" src="about:blank"></iframe>'

		/*	修改form表单target属性阻止跳转*/
	 $(document).on('click','.form_submit',function(){
		 	$('#iframe').append(html);
			$('form').attr({'target':'rfFrame'});
		});
	
	
	//获取客服列表信息

	
	
	
	
	
	

});

//	by monkey 2015-08-13 
;(function(){
	
	window.Ajax = function(opts){
		this.url = opts.url;
		this.type = opts.type?opts.type:'GET';
		this.XMLHttpReq;
		this.callback = opts.callback;
		this.data="";
		this.sendAjaxRequest(opts);
		
		
	};
	Ajax.prototype.createData = function(opts){
		
	};
	Ajax.prototype.createCORSRequest=function(){
		var xhr= new XMLHttpRequest();  
        if ("withCredentials" in xhr) {  
        	xhr.open(this.type, this.url, true);               
        } else if (typeof(xhr) != "undefined") {   
        	xhr = new XDomainRequest();  
        	xhr.open(this.type, this.url); 
        } else {  
        	xhr = null;  
          
        }
        return xhr;
	    
	};
	Ajax.prototype.sendAjaxRequest=function(opts){
		
		var data = opts.data?opts.data:'';
		if(typeof data=="object"){
			if(document.all){	
				this.data = JSON.stringify(data)
			}else{
				this.data = new FormData();
				for(var x in data){
					this.data.append(x,data[x]);
				}
			}
		}
		
		var xhr = this.createCORSRequest();
		xhr.withCredentials = "true";//创建XMLHttpRequest对象  
	    var self = this;
	    if(xhr){
	    	xhr.onload = function(){
	    		 var text = xhr.responseText;
	             self.callback(text)
	    	}
	    	xhr.onerror = function(){
	    		
	    	}
	    	xhr.send(this.data);
	    }
	};
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	window.SKGUtils = function(){
		this.winWidth = $(window).width();
		this.winHeight = $(window).height();
		this.papeWidth = 1226;
		this.toolsBar.root = this;
		this.toolsBarWidth = 44;
		this.init();
		
	};
	SKGUtils.prototype={
			init:function(){
				this.toolsBar.action();
				this.search.action();
				this.nav();
			},
			toolsBar:{
				action:function(){
					var self = this;
					var root = self.root;
					
					
					
					self.position();
					$(window).resize(function(){
						root.winWidth = $(window).width();
						root.winHeight = $(window).height();
						self.position();
					}).scroll(function(){
						var scrollTop = $(document).scrollTop();
						if($("#pageMark").val()=="首页"){
							if(scrollTop>(root.winHeight/2)){
								$(".toolbar").show();
								if(scrollTop>(root.winHeight/2)){
									$(".toTop").show();
									$(".toolbar").height('176px');
								}else{
									$(".toolbar").height('132px');
									$(".toTop").hide();
								};
							}else{
								$(".toolbar").hide();
							};
						}else{
							$(".toolbar").show();
							if(scrollTop>(root.winHeight/2)){
								$(".toTop").show();
								$(".toolbar").height('176px');
							}else{
								$(".toolbar").height('132px');
								$(".toTop").hide();
							};
						}
						
					});
					//返回顶部
					$(".toTop a").click(function(){
						$("html,html body,body").stop().animate({"scrollTop":0},500,'swing');
					});
					try{
						if($("#pageMark").val()=="登陆注册页"){
							var QQListPath = __httpsPath+"/glConfigs/QQChatConfig.html?callType=web"
						}else{
							var QQListPath = staticPath+"/glConfigs/QQChatConfig.html?callType=web";
						}
						if($("#pageMark").val()!="首页" && $("#pageMark").val()!="登陆注册页"){
							
							$.ajax({
								url : QQListPath,
								success : function(data){
									var data = JSON.parse(data);
									if(data.statusCode=="200"){
										var glConfigView = data.glConfigView;
										var QQListArr = glConfigView.value.split("#");
										$(".siteQQ").empty();
										for(var x=0;x<QQListArr.length;x++){
											var QQItem = QQListArr[x];
											var QQ = QQItem.split("=");
											var $a = $('<a class="QQ" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin='+QQ[1]+'&site=qq&menu=yes" ></a>');
											var $img =$('<img src="http://img.skg.com/skg/store/QQList.jpg?p=2:'+QQ[1]+':41"  border="0" alt="'+QQ[0]+'" title="'+QQ[0]+'" />');
											var $span =$("<span>"+QQ[0]+"</span>");
											$a.append($img,$span);
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
								},
								error : function(res){
									
								}
							});
						}
					}catch(e){
						
					}
				},
				position:function(){
					var root = this.root;
					//1287==1226+44+17
					//1226是页面宽度，44是工具栏宽度 17是工具栏离页面最大宽度
					if(root.winWidth>1287){
						var toolsRight = ((root.winWidth-1226)/2-61);
						$(".toolbar").css({right:toolsRight});
					}else{
						$(".toolbar").css({right:0});
					}
				}
			},
			search:{
				action:function(){
					var self = this;
					//输入框聚焦与失焦点
					$(".SubmitTrigger").focus(function(){
						$(".TriggerArea").css({"border":"1px red solid"});
						$(".SubmitTrigger").css({"borderRight":"1px red solid"});
						$(".search_span").css({"display":"none"});
					}).blur(function(){
						$(".TriggerArea").css({"border":"none"});
						$(".search_span").css({"display":"block"});
						$(".SubmitTrigger").css({"border":"solid 1px #e0e0e0"});
					});
					//点击关键字
					$(".search_span a").on("click",function(){
						$(".SubmitTrigger").attr("value",$(this).html());
						$(".search_span").css({"display":"none"});
						self.submit();
					});
					//提交搜索
					$(".SubmitRespond").on("click",function(){
						verifyText(".TriggerArea",function(){
							self.submit(200);
						},function(){
							$(document)._alert(
									options={
									confirm:true,
									cancel:false,
									alert_text:'输入搜索内容不合法'
									}
								);
						});
						
					});
				},
				//lazyTime:是为了抓取用户行为的一个延迟。
				submit:function(lazyTime){
					var lazyTime = lazyTime?lazyTime:1;
					setTimeout(function(){
						var keywords = $("#search_keywords_id").val();
						if(keywords!=""){
							$("#search_keywords_name").val(keywords);
							$("#searchForm").submit();
						}
					},lazyTime);
				}
			},
			nav:function(){
				var winWidth = $(window).width();
				$(".nav").each(function(){
					var left = $(this).offset().left;
					$(this).find(".subnavBox").css({
						"left":-left,
						"width":winWidth
					});
					
				}).hover(function(){
					$(this).find(".subnavBox").stop().slideDown(200);
					$(".member_header").css({"zIndex":"0"});
				},function(){
					$(this).find(".subnavBox").stop().slideUp(200);
						$(".member_header,.module_frame").css({"zIndex":"10"});
					
				});
			}
	};
})(jQuery,window);


//提示弹框
;(function($){
	$.fn._alert=function(options){
		// 属性，参数
		var defaults={
			confirm:false,
			cancel:false,
			alert_text:'提问内容不能为空',
			alert_submit:false
		};
	
	var options=$.extend(defaults,options);
	var html='<div class="alert" style="">'+
	'<div class="marking"></div><div class="alertCont"><div class="alertBody">'+
	'<a href="javascript:;" class="alert_close"></a>'+options.alert_text+
	'</div><div class="alertBottom"><a href="javascript:;" class="alertBtn alertOk">确定</a>'+
	'</div></div></div>';
	$('body').append(html);
	alertPlace();
	
	// 判断确定按钮的功能
	if (options.confirm==false) {
		// 隐藏弹出层
		$(document).on('click', '.alertOk', function(event) {
			$('.alert').remove();
		});
	}else if (options.confirm==true){
		// 提交
		$(document).on('click', '.alertOk', function(event) {
			$('.alert').remove();
			if(typeof defaults.alert_submit=="function"){
				defaults.alert_submit();
			}
		});

	}

	// 判断是否出现取消键
	if (options.cancel==true) {
		var cancel_html='<a href="javascript:;" class="alertBtn alertCancel">取消</a>';
		$('.alertBottom').append(cancel_html);
		$(document).on('click', '.alertCancel', function(event) {
			$('.alert').remove();
			
		});
	}
	$(document).on('click','.alert_close',function(){
			$('.alert').remove();
	});
	// 修正弹出框位置居中
	function alertPlace(){
		// 获取弹出框大小
		var _alertWidth=parseInt($('.alertCont').width());
		var _alerHeigth=parseInt($('.alertCont').height());
		// 修正弹出框位置居中
		$('.alertCont').css({
			'marginLeft':-(_alertWidth/2),
			'marginTop': -(_alerHeigth/2),
			'left': '50%',
			'top': '50%'
		});

	}
}
})(jQuery);



function setCartNumber(number,totalFee){
	if(number && "null" !=number && 'undefined' !=number){
		$.cookie('cartNumberCookie', number, {path:'/',domain:domainStr});
		$("#headerCartNumber").html(number);
		$("#sideNavCartNumber").html(number);
		$("#sideNavCartNumber").show();
		if($(".toolBarMyCart").hasClass("toolbarshoppingno")){
			$(".toolBarMyCart").removeClass("toolbarshoppingno").addClass("toolbarshopping");
		}
		$("#toolBarCartNumber").html(number);
		if($("#btnShoppingcart_num")){
			$("#btnShoppingcart_num").html(number);
			if((totalFee || totalFee==0) && totalFee!='undefined'){
				$("#btnShoppingcart_price").html("￥"+totalFee);
			}
		}
	}else{
		$.cookie('cartNumberCookie', null, {path:'/',domain:domainStr});
		$("#headerCartNumber").html(0);
		$("#sideNavCartNumber").html(0);
		$("#toolBarCartNumber").html("0");
		$("#btnShoppingcart_num").html("0");
		$("#btnShoppingcart_price").html("￥0");
		$("#sideNavCartNumber").hide();
		if($(".toolBarMyCart").hasClass("toolbarshopping")){
			$(".toolBarMyCart").removeClass("toolbarshopping").addClass("toolbarshoppingno");
		}
	}
}

//首页视频模块
;(function($){
	$(function(){
		$(".txe").click(function(){
			var url = $(this).attr('dataurl');
			var name = $(this).attr('name');
			$("#video_pop").find(".dialog_title").text(name);
			$("#viode").children().remove().end().append('<embed src="'+url+'" allowFullScreen="true" quality="high" width="1000" height="536" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>');
		});
	});
})(jQuery);

function goTo(tab){
	var d=window.location.href;
	window.location.href=__httpsPath+"/storefront/member/toLogin.html?redirectUrl="+encodeURIComponent(d)+"&tab="+tab;
}

//首页配件添加子分类切换
function showUl(ID)
{
	$("#li_"+ID).addClass("bs").siblings(".fit_more ul li").removeClass("bs"); 
	$("#detail_"+ID).show().siblings(".detail").hide(); 
	
}