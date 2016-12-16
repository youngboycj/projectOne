$(function(){
	var url1 = "http://tingapi.ting.baidu.com/v1/restserver/ting"; 
	var key = "method=baidu.ting.search.catalogSug&query=";
	$(".headerp span").eq(1).on("touchstart",function(){
		$("footer").hide();
		$("section .ul1").hide();
		$("section .div1").show();
	});

	$(".sousuo").on("touchstart",function(){
		var _gequ = $(".gequ").val();
		console.log(_gequ);
		Ajax1(url1,key,_gequ);
	});


	function Ajax1(url,key,gequ){
		var _data = url +"?" + key+ "" + gequ;
		$.ajax({
			url: "php/ajax.php",
			type:"GET",
			dataType:"json",
			data:{ data: _data}
	    }).fail(function(){
			console.log("fail");
		})
		.done(function(data){
			var strarts = [];
			var songids = [];
			data = data.song;
			console.log(data);
			for(var i = 0, len = data.length; i < len; i++){
				var strart = data[i].artistname;
				strarts.push(strart); 
				songids.push(data[i].songid);
				$(".div1p").append(`<p class="liebiao">${strart}</p>`);
			}
			/*console.log(strarts);
			console.log(songids);*/
			$(".liebiao").on("touchstart",function(){
				var _text = $(this).text();
				var index = $.inArray(_text,strarts);
				//console.log(index);
				window.location.href=url+"?method=baidu.ting.song.play&songid=" + songids[index];
				
			});
		});
	};
});

