(function($, window){
	//验证框架插件
	/*
		showMsg的值如果是DOM对象，将以html方法将当前控件的验证结果信息输出给DOM对象；如果是自定义方法，则提供“当前控件的验证结果信息（对象）”和“当前验证域对象”
	*/
    $.fn.formCheck = function (options) {
    	var defaults = {
			//验证规则，由type+rule组成，rule可以是function,ajax,regx,require,length
			rules : {
				loginName : {
					require : true
				},
				loginPassword : {
					require : true
				},
				userName : {
					require : true,
					length : [4,32]
					/*
					ajax:{
						url : 'url?p1={userName}',
						param : ''		//目前只允许一个，如果有多个可写在url中
					}
					*/
				},
				password : {
					require : true,
					length : [6,20]
				},
				rePassword : {
					require : true,
					equal : '[verify-data=password]'
				},
				email : {
					require : true,
					regx : /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
				},
				mobile : {
					require : true,
					regx : /^((13[0-9])|(15[^4,\D])|(18[0-9])|(17[0|6|7|8])|(14[5|7]))\d{8}$/
				},
				captha : {
					require : true
				},
				phoneCaptha : {
					require : true
				}
			},
			msg : {
				loginName : {
					require : '登录<strong>账号</strong>不能为空！'
				},
				loginPassword : {
					require : '登录<strong>密码</strong>不能为空！'
				},
				userName : {
					require : '<strong>用户名</strong>不能为空！',
					length : '<strong>用户名长度</strong>只允许在<strong>4-32个字符</strong>之间！'
					/*
					ajax : '该用户名已存在！'
					*/
				},
				password : {
					require : '请<strong>输入密码</strong>！',
					length : '<strong>密码长度</strong>只允许在<strong>6-20个字符</strong>之间！'
				},
				rePassword : {
					require : '请<strong>再一次输入</strong>密码！',
					equal : '两次<strong>密码</strong>输入<strong>不相同</strong>！'
				},
				email : {
					require : '<strong>E-mail</strong>不能为空！',
					regx : '<strong>E-mail格式</strong>错误！'
				},
				mobile : {
					require : '<strong>手机号码</strong>不能为空！',
					regx : '手机号码为<strong>11位且为非0开头</strong>的数字！'
				},
				captha : {
					require : '<strong>验证码</strong>不能为空！'
				},
				phoneCaptha : {
					require : '<strong>手机验证码</strong>不能为空！'
				}
			},
			submitBtn : '.CheckSubmit',
			showMsg : function(){

			},
			success : function(){
				//console.log('ok');
			}
    	};

		var _this = this,
			$this = $(this);

		this.opts = $.extend(true, defaults, options);

		//处理每一个验证域
		$.each($this, function(i, n){

			var $verifyArea = $(n);
			var __this = this;
			//过滤没有verify-data的对象不进入处理区
			$verifyArea.on('blur', '[verify-data]', function(){
				var verifyResult = verify(this, __this);
				//console.log(verifyResult);
				//如果验证结果为false则不进行信息处理
				if ( verifyResult ) {
					dealMsg(verifyResult, $verifyArea);
				}
			});

			//提交按钮对象处理
			var $submitBtn = catchObject(_this.opts.submitBtn, __this);
			//console.log($submitBtn);
			if ( $submitBtn != undefined ) {
				//提交按钮绑定事件

				$submitBtn.click(function(){
					//对全部控件进行验证
					var verifyItems = $verifyArea.find('[verify-data]');
					var verifyError = [];

					$.each(verifyItems, function(i, n){
						var verifyResult = verify(n, __this);

						if ( verifyResult ) {
							if ( verifyResult.status ) {
								dealMsg(verifyResult, $verifyArea);
							}else {
								//如果验证失败，一次处理一个错误
								verifyError.push(verifyResult);
							}
						}
					});//end each
					//处理出错验证
					if ( verifyError.length > 0 ) {
						dealMsg(verifyError[0], $verifyArea);
					}else {
						_this.opts.success && _this.opts.success.call($verifyArea, verifyItems);
					}

				});
			}

		});

		function dealMsg(verifyResult, $verifyArea){
			var _showMsg = _this.opts.showMsg;
			if ( $.isFunction(_showMsg) ) {
				_showMsg && _showMsg.call($verifyArea, verifyResult);
			}else if ( $.type(_showMsg) === "string" ) {
				/*
					注意
					这里是从验证域往下查找到_showMsg
					最好用function，因为提示对象_showMsg不一定在验证域内
				*/
				_showMsg = $verifyArea.find(_showMsg);
				_showMsg.text(verifyResult.msg).show();
			}else {
				//console.log('丫的！到底想不想懂不懂写啊！让哥调教一下！');
			}


		}

		function verify($verifyItem, $verifyArea){

			var $verifyItem = $($verifyItem);

			//验证插件rules的key
			var verifyType = $verifyItem.attr('verify-data');
			//验证插件rules的key的值 <object>
			var verifyRules = _this.opts.rules[verifyType];
			//！重要！如果找不到key则不进行验证
			if ( ! verifyRules ) return;

			//验证控件的value <string>
			var verifyValue = $.trim($verifyItem.val());
			//验证插件msg的key的值 <object>
			var verifyMsg = _this.opts.msg[verifyType];

			var noPass = false;
			var checkRule = ''
			//内部默认验证--获取验证控件处理
			//单选
			/*
			if ( verifyType == 'radio' ) {
				if ( n.tagName != 'INPUT' ) {
					$verifyItem = $verifyItem.find('input:radio');
				}else {
					//$verifyItem = $verifyItem.parents('form').find('input:radio[name]');
				}
			}
			//复选
			if ( verifyType == 'checkBox' ) {
				if ( n.tagName != 'INPUT' ) {
					$verifyItem = $verifyItem.find('input:checkbox');
				}
			}
			//下拉
			if ( verifyType == 'select' ) {
				if ( n.tagName != 'SELECT' ) {
					$verifyItem = $verifyItem.find('select');
				}
			}
			*/

			//对每key的验证规则进行逐个
			for ( var eachRule in verifyRules ) {
				//逐个规则验证，一旦错误则终止
				if ( ! noPass ) {
					checkRule = eachRule;
					switch(eachRule){
						case 'require' :
							if ( verifyValue === '' ) {
								noPass = true;
							}else {
								noPass = false;
							}
							break;
						case 'length' :
							if ( verifyValue.length < verifyRules.length[0] || verifyValue.length > verifyRules.length[1] ) {
								noPass = true;
							}else {
								noPass = false;
							}
							break;
						case 'regx' :
							if ( ! verifyRules.regx.test(verifyValue) ) {
								noPass = true;
							}else {
								noPass = false;
							}
							break;
						case 'equal' :
							var $equal = catchObject(verifyRules.equal, $verifyArea);
							if ( verifyValue != $.trim($equal.val()) ) {
								noPass = true;
							}else {
								noPass = false;
							}
							break;
						case 'ajax' :
							$.ajax({
								url : verifyRules[eachRule].url,
								data : verifyRules[eachRule].param + "=" + verifyValue,
								dataType : "json",
								success : function(json){
									if ( json.status ) {
										//_self.dealMsg(_this,_msg[n],'wrong');
										noPass = true;
									}else if ( json.status === false ){
										noPass = false;
										//_self.dealMsg(_this,'','right');
									}
								}
							});
							break;
					};//--end switch
				}

			}//--end for


			//返回<通过状态><验证类型><提示信息>
			if ( noPass ) {
				return {
					status : false,
					obj : $verifyItem,
					rule : checkRule,
					msg : verifyMsg[checkRule]
				}
			}else {
				return {
					status : true,
					obj : $verifyItem,
					rule : checkRule
				}
			}
			/*
			function verifyReturn(noPass,rule){
				if ( noPass ) {
					console.log(111);
					return {
						status : false,
						obj : $verifyItem,
						rule : rule,
						msg : verifyMsg[rule]
					}
				}else {
					console.log(222);
					return {
						status : true,
						obj : $verifyItem,
						rule : rule
					}
				}
			}
			*/
		}

		//__this必须是js对象
		function catchObject(oItem, __this){
			if ( $.isFunction(oItem) ) {
				oItem = oItem && oItem.call(__this);
				if ( $.type(oItem) !== "object" ) {
					//console.log('请return你想要的对象或者直接给个class或id的字符串也行');
				}else {
					oItem = $(oItem);
				}
			}else if ( $.type(oItem) === "string" ) {
				oItem = $(__this).find(oItem);
			}else {
				//console.log('丫的！到底想不想懂不懂写啊！让哥调教一下！');
			}
			//抛出的是$封装过的jq对象
			return oItem;
		}

		return this;
    };
    // 插件结束
})(jQuery, window);