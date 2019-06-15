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
//获取含有指定类名的元素数组
function getClass(classN){
	var arr=[];
	var elNode=document.getElementsByTagName('*');
	for(var i=0;i<elNode.length;i++){
		if(elNode[i].className.match(new RegExp('(^|\\s)'+classN+'($|\\s)'))){
			arr.push(elNode[i]);
		}
	}
	return arr;
}
//给元素添加指定类名
function addClass(el,classN){
	console.log(el)
	if(!el.className.match(new RegExp('(^|\\s)'+classN+'($|\\s)'))){
		el.className+=' '+classN;
	}
}
//给元素移除指定类名
function removeClass(el,classN){
	el.className=el.className.replace(new RegExp('(^|\\s)'+classN+'($|\\s)'),' ');
}
//获取指定ID元素
function getId(idName){
	return document.getElementById(idName);
}
//获取指定标签元素
function getTag(tagName){
	return document.getElementsByTagName(tagName);
}
//获取元素的所有兄弟元素
function getSibling(el){
	var arr=[];
	var child=el.parentNode.childNodes;
	for(var i=0;i<child.length;i++){
		if(child[i].nodeType===1){
			if(child[i]!==el){
				arr.push(child[i]);
			}
		}
	}
	return arr;
}
//获取元素内部/外部样式属性
function getStyle(el,attr){
	return window.getComputedStyle?getComputedStyle(el,null)[attr]:el.currentStyle[attr];
	/*if(window.getComputedStyle){
//	if(typeof getComputedStyle!='undefined'){
		return getComputedStyle(el,null)[attr];
	}else{
		return el.currentStyle[attr];
	}*/
}
