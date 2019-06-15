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
function getClass(classN){
	var elNode=document.getElementsByTagName('*');
	var arr=[];
	for(var i=0;i<elNode.length;i++){
		if(elNode[i].className.match(new RegExp('(^|\\s)'+classN+'($|\\s)'))){
			arr.push(elNode[i]);
		}
	}
	return arr;
}
//获取指定元素的全部兄弟元素(数组)
function getSibling(el){
	var arr=[];
	var child=el.parentNode.childNodes;
	for(var i=0;i<child.length;i++){
		if(child[i].nodeType===1&&child[i]!==el){
			arr.push(child[i]);
		}
//		if(child[i].nodeType===1){
//			if(child[i]!==el){
//				arr.push(child[i]);
//			}
//		}
	}
	return arr;
}
//添加指定类名
function addClass(el,classN){
	if(!el.className.match(new RegExp('(^|\\s)'+classN+'$|\\s'))){
		el.className+=' '+classN;
	}
}
//删除指定类名
function removeClass(el,classN){
	var arr=el.className.split(' ');
	for(var i=0;i<arr.length;i++){
		if(arr[i].match(new RegExp('(^|\\s)'+classN+'($|\\s)'))){
			arr.splice(i,1);
		}
	}
	el.className=arr.join(' ');
//	el.className=el.className.replace(new RegExp('\\b'+classN+'\\b'),'');
}
//获取指定ID元素节点
function getId(idName){
	return document.getElementById(idName);
}
//获取指定标签元素节点数组
function getTag(tagName){
	return document.getElementsByTagName(tagName);
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
//给元素添加动画效果封装
function animate(el,obj,time,callback){
	if(typeof time == 'function' || time ==undefined){
		callback = time;
		time = 300;//设置动画默认执行时间
	}
	var start={};
	for(var i in obj){
		start[i]=parseFloat(getComputedStyle(el,null)[i]);
	}
	var t=16;
	clearInterval(el.timer);
	el.timer=setInterval(function(){
		var flag = true;
		for(var i in obj){
			var attr=i;
			var target=obj[i];
			var current=parseFloat(getComputedStyle(el,null)[attr]);
			var step=(target-start[i])/(time/t);
			if(step>=0&&current>=(target-step)||step<=0&&current<=(target-step)){
				el.style[attr]=target+'px';
			}else{
				el.style[attr]=current+step+'px';
				flag=false;
			}
		}
		if(flag){
			clearInterval(el.timer);
			callback && callback.call(el);
		}
	},16);
}
////给元素添加动画效果封装
//function animate(el,obj,time,callback){
//	for(var i in obj){
//		var attr=i;
//		var target=obj[i];
//	}
//	var start=parseInt(getStyle(el,attr));
//	var t=16;
//	var step=(target-start)/(time/t);
//	var timer=setInterval(function(){
//		if(step>0&&start>=(target-step)||step<0&&start<=(target-step)){
//			clearInterval(timer);
//			el.style[attr]=target+'px';
//			if(callback) callback();
//		}else{
//			start+=step;
//			el.style[attr]=start+'px';
//		}
//	},16);
//}
