$(function(){
	var _appid = "28912";
	var _apikey = "3b31ec8293d147848f18dffd2be7f9aa";
	var _max = "50";
	$("section .ul1").show();
	Ajax(_appid,_apikey,50);
	$(".headerp span").eq(0).on("touchstart",function(){
		$("section .ul1").show();
		$("section .div1").hide();
		Ajax(_appid,_apikey,_max);
		console.log(111111111);
	});
});

function Ajax(appid,api,maxResult){
	var tiaomu = items = 10;
	var pages = parseInt(maxResult/items);
	var last = maxResult - items*pages;//用于判断最后一页需要加载多少
	var index = 0;
	var arr = [];
	var str = "";
	var str1 = "";
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

			function show(i,end){
				var aa = "";
				for(; i<end; i++){
					str += `<li><div class="imgdiv"><img src="${_imgs[i]}"></div>
					<p>${(i+1)+"."+_titles[i]}</p></li>`;
					aa += i;
				}
				$("section .ul1").html(str);
				//console.log(aa);
			}

			show(0,items);//初始显示

			$("footer .previous").on("touchstart",function(){
				$("section").children("p.pend").remove();
				index--;
				if( index <= 0 ){
					index = 0;
					show(0,tiaomu);
					return false;
				}else if(index === pages){
					var x = maxResult - last;
					show(x,x+last);
				}else {
					items = items - tiaomu;
					show(items,items+tiaomu);
				}
			});

			$("footer .next").on("touchstart",function(){
				index++;
				if(index < pages){
					show(items,items+tiaomu);
					//console.log("不等");
					//console.log(index);
				}else if(index === pages){
					str1 = "<p class='pend' style='width:100%;text-align:center;font-size:20px; color:red; font-family:微软雅黑'>END...</p>";
					//show(items,items+last);
					$("section").append(str1);
					//console.log("相等")
					//console.log(index);
					index
					return false;
				}else{
					index = pages;
					return false;
				}
				items = items + tiaomu;

			});

			
			$(".ul1>li").on("touchstart",function(event){
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
					$(this).find("p").css({"color":"red"});
					$("footer").hide();
				}else{
					$(this).css({"height":_fontsize,"width":"40%"}).siblings().show();
					$(this).find("p").css({"color":"rgba(0,0,0,0.6)"});
					$("footer").show();
				}
			});
			$("footer").show();
		}
	});	
}
