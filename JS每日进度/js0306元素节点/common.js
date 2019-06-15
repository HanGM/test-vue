//遍历数组
Array.prototype.each = function(callback){
	for(var i = 0;i < this.length;i ++){
		callback(i,this[i]);
	}
}

//字符串去除前后空格
String.prototype.trim = function(){
	var reg = /^\s*|\s*$/g;
	return this.replace(reg,'');
}
//兼容IE8及以下不支持getElementsByClassName方法
function getClass(name){
	var elNode=document.getElementsByTagName('*');
	var arr=[];
	for(var i=0;i<elNode.length;i++){
//		if(elNode[i].className.match(new RegExp('(^|\\s)'+name+'($|\\s)'))){
		if(elNode[i].className.match(new RegExp('\\b'+name+'\\b'))){
			arr.push(elNode[i]);
		}
	}
	return arr;
}
//获取指定ID元素节点
function getID(name){
	return document.getElementById(name);
}
//获取指定元素节点数组
function getTag(name){
	var tag=document.getElementsByTagName(name);
	var arr=[];
	for(var i=0;i<tag.length;i++){
		arr.push(tag[i]);
	}
	return arr;
}
