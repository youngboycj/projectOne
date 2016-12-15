$(function(){
	$("header").load("header.html");
	var strid = [];
	var arr = [];
	var str = "";
	var _apikey = "3b31ec8293d147848f18dffd2be7f9aa";
	var _url = "http://route.showapi.com/341-3?showapi_appid=	28912&showapi_sign=3b31ec8293d147848f18dffd2be7f9aa&maxResult=30" ;
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
				<p>${data[i].title}</p></li>`;
				$("li").index = i;//用于左右滑动
			}
			$("section>ul").append(str);
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
				$(".next").on("touchstart",function(){	
				});
		}
	});	

	
});