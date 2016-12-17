$(function(){
	var _appid = "28912";
	var _apikey = "3b31ec8293d147848f18dffd2be7f9aa";
	var _max = "50";
	$("section .ul1").show();
	Ajax(_appid,_apikey,50);
	$(".headerp span").eq(0).on("touchstart",function(){
		$("section").children("p.pend").hide();
		$("section .ul1").show();
		$("section .div1,.div_detail").hide();
		Ajax(_appid,_apikey,_max);
		//console.log(111111111);
	});
});

function Ajax(appid,api,maxResult){
	var tiaomu  = 10;
	var items = 10;
	var pages = parseInt(maxResult/items);
	var last = maxResult - items*pages;//用于判断最后一页需要加载多少
	var arr = [];
	var str2 = "";//用于设置section的高度,无用
	var _url = "http://route.showapi.com/341-3?showapi_appid="+	appid +"&showapi_sign="+ api +"&maxResult=" + maxResult ;
	$.ajax({
		url: _url,
		type:"GET",
		dataType:"json",
		fail:function(){
			console.log("fail");
		},
		/*beforeSend:function(){
			$("ul").html("<p style='width:100%;font-size:16px;text-align:center;'>数据加载中...</p>");
		},*/
		success:function(data){
			//console.log(data);
			data = data.showapi_res_body.contentlist;
			var _imgs = [];
			var _titles = [];
			for(var i=0;i<data.length;i++){
				 _imgs.push(data[i].img);
				 _titles.push(data[i].title);
			}

			function show(end){
				var str = "";//用于添加li
				for(var i=0; i<end; i++){
					str += `<li><div class="imgdiv"><img src="${_imgs[i]}"></div>
					<p>${(i+1)+"."+_titles[i]}</p></li>`;
				}
				$("section .ul1").html(str);
				str2 = $("html").height();
				// console.log(str2);
			}
			show(items);//初始显示

			//返回顶部
			$("footer .returnTop").on("touchstart",function(e){
				e = e || event;
				$("section").children("p.pend").hide();
				/*if($("section .ul1").height() > 750){
					 $(window).scrollTop(0);
					console.log(123);
				}*/
				 $(window).scrollTop(0);

			});
			
			//加载更多
			$("footer .next").on("touchstart",function(){
				if(items < maxResult){
					show(items+tiaomu);
				}else if( items + last > maxResult ){
					return false;
				}else{
					//show(items,items+last);
					$("section").children("p.pend").show();
					//$("section").append(str1);	
				}
				items = items + tiaomu;
			});

			//放大缩小图片
			$(".ul1>li").on("click",function(event){
				//console.log($("html").width());
				//var touch = event.targetTouches[0].pageX;
				//console.log(touch.pageX);
				//console.log($(this).css("width"));
				//console.log(1234456567);
				var _fontsize = (($("html").width()*100)/640).toFixed(0)*2.5 + "px";
				//console.log(_fontsize);
				//console.log($(this).css("height"));
				if($(this).css("height") === _fontsize){
					$(this).css({"width":"100%","height":"100%"}).siblings().hide();
					$(this).find("p").css({"color":"red","font-weight":"600"});
					$("footer").hide();
				}else{
					$(this).css({"height":_fontsize,"width":"40%"}).siblings().show();
					$(this).find("p").css({"color":"rgba(60,121,116,0.8)"});
					$("footer").show();
				}
			});
				var _height = $("section").height();
				if(_height !== 0){
					$("footer").show();
				}else{
					$("footer").hide();
				}
		}
	});	
}
