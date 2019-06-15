Array.prototype.each=function(callback){
	for(var i=0;i<this.length;i++){
		callback(this[i],i);
	}
}
String.prototype.trim=function(){
	var reg=new RegExp('(^\\s*)|(\\s*&)');
	return this.replace(reg,'');
}
function getId(idName){
	return document.getElementById(idName);
}
function getTag(tagName){
	return document.getElementsByTagName(tagName);
}
function getClass(classN){
	var arr=[];
	var elNodes=document.getElementsByTagName('*');
	var reg=new RegExp('(^|\\s)'+classN+'($|\\s)');
	for(var i=0;i<elNodes.length;i++){
		if(elNodes[i].className.match(reg)){
			arr.push(elNodes[i]);
		}
	}
	return arr;
}
function getSibling(el){
	var arr=[];
	var child=el.parentNode.childNodes;
	for(var i=0;i<child.length;i++){
		if(child[i].nodeType===1&&child[i]!==el){
			arr.push(child[i]);
		}
	}
	return arr;
}
function addClass(el,classN){
	var reg=new RegExp('(^|\\s)'+classN+'($|\\s)');
	if(!el.className.match(reg)){
		el.className+=' '+classN;
	}
}
function removeClass(el,classN){
	var reg=new RegExp('(^|\\s)'+classN+'($|\\s)');
	var arr=el.className.split(' ');
	for(var i=0;i<arr.length;i++){
		if(arr[i].match(reg)){
			arr.splice(i,1);
		}
	}
	el.className=arr.join(' ');
}
function getStyle(el,attr){
	return window.getComputedStyle?getComputedStyle(el,null)[attr]:el.currentStyle[attr];
}

//给元素添加动画移动效果封装(IE9及以上可用，不兼容IE8及以下)
function animate(el,obj,time,callback){
	for(var i in obj){
		var attr=i;//元素对象的属性
		var target=obj[i];//元素对象的属性值
	}
	var start=parseInt(getComputedStyle(el,null)[attr]);
	var t=16;//定时器执行一次的时间
	var step=(target-start)/(time/t);//每次执行变化的量
	var timer=setInterval(function(){
		if(step>0&&start>=(target-step)||step<0&&start<=(target-step)){
			clearInterval(timer);//最后一次变化之前，清除定时器
			el.style[attr]=target+'px';//元素最后一步直接到达目标位置
			if(callback) callback();//是否传入回调函数，传入则执行函数
		}else{
			start+=step;//元素按定时器设置移动
			el.style[attr]=start+'px';
		}
	},16);
}