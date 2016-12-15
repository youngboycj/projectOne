$(function(){
	var _appid = "28912";
	var _apikey = "3b31ec8293d147848f18dffd2be7f9aa";
	var _max = "40";
	Ajax(_appid,_apikey,30);
	$("header li").on("click",function(){
		Ajax(_appid,_apikey,_max);
	});
	
});

function Ajax(appid,api,maxResult){
	var strid = [];
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
			for(var i=0,len=data.length; i<len; i++){
				strid.push(data[i].id);//将每张图的id保存
				str += `<li><img src="${data[i].img}">
				<p>${(i+1)+"."+data[i].title}</p></li>`;
				$("li").index = i;//用于左右滑动
			}
			$("section>ul").html(str);
			//console.log(strid);
			$(".ul2>li").on("touchstart",function(event){

				var touch = event.targetTouches[0].pageX;
				//console.log(touch.pageX);
				//console.log($(this).css("width"));
				if($(this).css("width") === "128px"){
					$(this).css({"width":"100%"}).siblings().hide();
					$(this).find("p").css({"color":"red"});
					$("footer").hide();
					/*$(screen).css("height",touch);*/
				}else{
					$(this).css({"width":"128px"}).siblings().show();
					$(this).find("p").css({"color":"rgba(0,0,0,0.6)"});
					$("footer").show();
				}
			});
				
			$("footer").show();
			$("footer .next").on("touchstart",function(){	

			});
			str1 += maxResult;
			console.log(str1);
		}
	});	
}
