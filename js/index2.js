$(function(){
	var url1 = "http://tingapi.ting.baidu.com/v1/restserver/ting"; 
	var key1 = "method=baidu.ting.search.catalogSug&query=";
	var key2 = "method=baidu.ting.billboard.billList&type="+ 1 +"&size="+ 50 +"&offset=0";
	//type=1,表示类型，1代表新歌&size=10表示返回条目，无最大限制&offset=0表示偏移量
	$(".headerp span").eq(1).on("touchstart",function(){
		$("footer").hide();
		$(".pend").hide();
		$(".div1p p.liebiao").hide();
		$("section .ul1,.div_detail").hide();
		$(".gequ").val("");
		Ajax2(url1,key2);
		$("section .div1").show();
		$(".ul2").show();
		//console.log("aaaa");
	});

	$(".gequ").on("blur",function(){
		var _gequ1 = $(this).val();
		if( _gequ1.length === 0){
			$(".div1p p.liebiao").hide();
			Ajax2(url1,key2);
			$("section .div1").show();
			$(".ul2").show();
		}
	});

	$(".sousuo").on("touchstart",function(){
		var _gequ = $(".gequ").val();
		if(_gequ.length !== 0){
			$(".ul2").hide();
			$("section .banner").hide();
			//console.log(123)
		}
		//console.log("bbbbb");
		$(".div1p p.liebiao").hide();
		Ajax1(url1,key1,_gequ);
	});

	//列表
	function Ajax2(url,key){
		var _data = url +"?" + key;
		$.ajax({
			url: "php/ajax.php",
			type:"GET",
			dataType:"json",
			data:{ data: _data}
	    }).fail(function(){
			console.log("fail....排行");
		})
		.done(function(data){
			var str = "";//用来添加到ul.div2p中
			var arrname = [];//用来存储获取到的名字
			var arrid = [];//用来存储获取到的id
			var arrimg= [];//用来存储获取到的图片（小）
			//console.log(data);
			var banner = data.billboard.name;
			data = data.song_list;
			for(var i=0,len = data.length; i<len; i++ ){
				str +=  `<li><div class="imgdiv"><img src="${data[i].pic_small}"></div>
					<p>${data[i].title}</p></li>`;
				var title = data[i].title;
				arrname.push(title);
				//arrname.push(.replace(/\"/g,""));
				arrid.push(data[i].song_id);
				arrimg.push(data[i].pic_big);
			}
			$("section .banner").show().html(`<p>${banner}</p>`);
			$("section .ul2").html(str);
			//console.log(arrimg,arrid,arrname);
			$(".ul2 li").on("touchstart",function(){
				//replace(/(^/s*)|(/s*$)/g, "");去掉字符串前后的空白
				var _text = $(this).text().replace(/(^\s*)|(\s*$)/g, "");
				var index = $.inArray(_text,arrname);
				//console.log(index,_text);
				window.location.href = "detail.html?songid=" + arrid[index];
			});
		});
	};


	//搜索
	function Ajax1(url,key,gequ){
		var _data = url +"?" + key+ "" + gequ;
		$.ajax({
			url: "php/ajax.php",
			type:"GET",
			dataType:"json",
			data:{ data: _data}
	    }).fail(function(){
			console.log("fail....搜索");
		})
		.done(function(data){
			var strarts = [];
			var songids = [];
			var str = "";
			data = data.song;
			//console.log(data);
			for(var i = 0, len = data.length; i < len; i++){
				var strart = data[i].artistname;
				strarts.push(strart); 
				songids.push(data[i].songid);
				str += `<p class="liebiao">${strart}</p>`;
			}
			$(".div1p").append(str);
			/*console.log(strarts);
			console.log(songids);*/
			$(".liebiao").on("touchstart",function(){
				var _text = $(this).text();
				var index = $.inArray(_text,strarts);
				//console.log(index);
				//window.location.href = url + "?method=baidu.ting.song.play&songid=" + songids[index];
				window.location.href = "detail.html" + "?songid=" + songids[index];
			});
		});
	};
});

