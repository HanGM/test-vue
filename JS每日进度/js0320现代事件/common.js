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
	var elNode = document.getElementsByTagName('*');
	var arr= [];
	for(var i = 0;i < elNode.length;i ++){
		if(elNode[i].className.match(new RegExp('(^|\\s)' + classN + '($|\\s)'))){
			arr.push(elNode[i]);
		}
	}
	return arr;
}
//获取指定元素的全部兄弟元素(数组)
function getSibling(el){
	var arr = [];
	var child = el.parentNode.childNodes;
	for(var i = 0;i < child.length;i ++){
		if(child[i].nodeType === 1 && child[i] !== el){
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
	if( !el.className.match(new RegExp('(^|\\s)' + classN + '$|\\s'))){
		el.className += ' ' + classN;
	}
}
//删除指定类名
function removeClass(el,classN){
	var arr = el.className.split(' ');
	for(var i = 0;i < arr.length;i ++){
		if(arr[i].match(new RegExp('(^|\\s)' + classN + '($|\\s)'))){
			arr.splice(i,1);
		}
	}
	el.className = arr.join(' ');
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
	return window.getComputedStyle ? getComputedStyle(el,null)[attr] : el.currentStyle[attr];
	/*if(window.getComputedStyle){
//	if(typeof getComputedStyle!='undefined'){
		return getComputedStyle(el,null)[attr];
	}else{
		return el.currentStyle[attr];
	}*/
}
// 现代事件的绑定
function eventHandler(el,type,callback){
	if(el.addEventListener){
		el.addEventListener(type,callback);
	}else if(el.attachEvent){
		el.attachEvent('on' + type,callback);
	}else{
		el['on' + type] = callback;
	}
}
// 现代事件的注销
function removeHandler(el,type,callback){
	if(el.removeEventListener){
		el.removeEventListener(type,callback);
	}else if(el.detachEvent){
		el.detachEvent('on' + type,callback);
	}else{
		el['on' + type] = null;
	}
}
// 兼容滚距
function getDelta(evt){
	if(evt.wheelDelta){
		return evt.wheelDelta; // -120
	}else{
		return evt.detail * -40;
	}
}
// 统一鼠标按键值
function getBtnValue(evt){
	var e = evt || window.event;
	if(!evt){
		switch(e.button){
			case 1:
				return 0;
			case 4:
				return 1;
			case 2:
				return 2;
		}
	}else{
		return e.button
	}
}
// 阻止默认行为
function preventDefault(evt){
	var e = evt || window.event;
	if(evt){ // 非IE
		e.preventDefault();
	}else{ // IE
		e.returnValue= false
	}
}
// 阻止冒泡行为
function stopProp(evt){
	var e = evt || window.event;
	if(evt){
		e.stopPropagation(); // 非IE的阻止冒泡
	}else{
		e.cancelBubble = true; // IE的阻止冒泡
	}
}
//给元素添加同步动画效果
function animate(el,obj,time,callback){
	//可以省略time参数
	if(typeof time === 'function' || time === undefined){
		callback = time;
		time = 300;//设置动画默认执行时间
	}
	var t = 16;//定时器执行间隔时间
	var start = {};//放入待改变属性和初始值
	for(var i in obj){
		start[i] = parseFloat(getComputedStyle(el,null)[i]);
	}
	clearInterval(el.timer);//清除定时器
	el.timer=setInterval(function(){
		var flag = true;
		for(var i in obj){
			var attr = i;
			var target = obj[i];
			var current = parseFloat(getComputedStyle(el,null)[attr]);
			var step = (target - start[i])/time*t;
			if(step >= 0 && current >= (target - step) || step <= 0 && current <= (target - step)){
				el.style[attr] = target + 'px';
			}else{
				flag = false;//有属性没有到达目标点
				el.style[attr] = current + step + 'px';
			}
		}
		if(flag){
			clearInterval(el.timer);
			callback && callback.call(el);
		}
	},t);
}
	