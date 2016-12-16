var _width = $("html").width();
//console.log(_width);
var _fontsize = ((_width*100)/640).toFixed(0) + "px";
//console.log(_fontsize);
$("html").css("font-size",_fontsize);
