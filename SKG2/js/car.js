
function shooppingCar(data){

	//alert(goodIdObj.imgUrl)
	$(".carNum").html(data.num);
	var _str = '<td class="cartItemeSel">' +
		'<span class="checkbox on">' +
		'<input type="checkbox" checked="checked" name="item">' +
		'</span>' +
		'</td>' +
		'<td class="cartListName">'	+
		'<a  class="img" href="#">' +
		'<img  src="../image/' + data.imgUrl + '" alt = "">' +
		'</a>' + 
		'<a  href="#">' + data.title +
		'<span class="priceColor"></span>' +
		'</a>' +
		'</td>' +
		'<td> </td>' +
		'<td>' +
		'<div class="amount">' +
		'<a class="minus" href="javascript:;"> </a>' +
		'<input class="none" type="text" name="username" value = "' + data.num + '">' +
		'<a class="plus" href="javascript:;"> </a>' +
		'</div>' +
		'</td>' +
		'<td >' +
		'<span class="ItemPrice">' + data.price + '</span>' +
		'</td>' +
		'<td >' +
		'<span class="ItemAmount">' +  data.price + '</span>' +
		'</td>' +
		'<td >' +
		'<span class="ItemTotal">'+ (data.price * data.num) +'</span>' +
		'</td>' +
		'<td >' +
		'<a class="cartRemove" href="javascript:;"></a>' +
		'</td>' ;
	var totalStr = '<span id="cartTip_tmp" class="priceColor">您还差 ¥59，即可享受免运费。（满59免运费）</span>' +
		'商品总金额¥' +
		'<span id="cartBoxTotalDirect">' + (data.price * data.num) + '</span>' +
		'+ 运费¥' +
		'<span id="cartBoxFee">20</span>' +
		'<span class="priceColor">' +
		'合计：' +
		'<strong id="orderTotal">' + (data.price * data.num +20 )+ '</strong>' +
		'元' +
		'</span>' +
		'<a id="Settlement" class="redBtn fpSubmit" href="javascript:;">去结算</a>' ;

	if(data != ""){
		$("#shopCartList").html(_str);
		$(".totalStr").html(totalStr);
	}
			
	var goodsNum = data.num;
	var total = "";
	$(".minus").click(function(){
		if( $(".none").val() != 1){
			goodsNum--;
			 $(".none").val(goodsNum);
			 var cars = JSON.parse(getCookie("cart") || "[]");
			 cars.num = goodsNum;
			 setCookie("cart", JSON.stringify(cars));	
			 total = data.price	* goodsNum;
			 $(".carNum").html($(".none").val());
			 $(".ItemTotal").html(total);
			 $("#cartBoxTotalDirect").html(total);
			 totals = Number(total) +Number($("#cartBoxFee").html());
			 $("#orderTotal").html(totals);				  
		}else{
			$(".none").val() ===1;
		}
	})

	$(".plus").click(function(){
		goodsNum++;
		$(".none").val(goodsNum);
		var cars = JSON.parse(getCookie("cart") || "[]");
		cars.num = goodsNum;
		setCookie("cart", JSON.stringify(cars));
		total = data.price	* goodsNum;
		$(".carNum").html($(".none").val());
		$(".ItemTotal").html(total);
		$("#cartBoxTotalDirect").html(total);
		totals = Number(total) +Number($("#cartBoxFee").html());
		$("#orderTotal").html(totals);
	})
	total = data.price	* goodsNum;
	if(goodsNum == "" || goodsNum == undefined){
		$(".ItemTotal").html(0.00);
	}else{
		$(".ItemTotal").html(total);
	}


	/*删除事件*/
	$(".cartRemove").click(function(){
		setCookie("cart", "");
		$(this).parents(".shoopping_car_class").remove();
		$(".isEmpty").show();
		 $(".carNum").html(0)
	})
}

$(function(){
	var goodIdObj = JSON.parse(getCookie("cart") || "[]");
	shooppingCar(goodIdObj)
})



