
/*
 * Array对象中的方法
 */
//遍历数组
Array.prototype.each=function(callback){
	for(var i=0;i<this.length;i++){
		callback(this[i],i);//数组元素和下标
	}
}
/*
 * String对象中的方法
 */
//字符串去除前后空格
String.prototype.trim=function(){
	var reg=/^\s*|\s*$/g;
	return this.replace(reg,'');
}
/*
 * DOM对象中的方法
 */
//获取指定id元素(对象)
function getId(idName){
	return document.getElementById(idName);
}
//获取指定标签名称的元素(类数组)
function getTag(tagName){
	return document.getElementsByTagName(tagName);
}
//获取指定类名的元素(数组)
function getClass(classN){
	var elNodes=document.getElementsByTagName('*');
	var arr=[];
	for(var i=0;i<elNodes.length;i++){
		if(elNodes[i].className.match(new RegExp('(^|\\s)'+classN+'(^|\\s)'))){
			arr.push(elNodes[i]);
		}
	}
	return arr;
}
//获取指定CSS类名的元素
function $(selector){
	return document.querySelector(selector);
}
//获取指定元素的全部兄弟元素(数组)
function getSibling(el){
	var arr=[];
	var child=el.parentNode.childNodes;
	for(var i=0;i<child.length;i++){
		if(child[i].nodeType===1 && child[i]!==el){
			arr.push(child[i]);
		}
	}
	return arr;
}
//给元素添加指定类名
function addClass(el,classN){
	if(!el.className.match(new RegExp('(^|\\s)'+classN+'($|\\s)'))){
		el.className += ' ' + classN;
	}
}
//从元素类名中移除指定类名
function removeClass(el,classN){
	var arr=el.className.split(' ');
	for(var i=0;i<arr.length;i++){
		if(arr[i].match(new RegExp('(^|\\s)'+name+'($|\\s)'))){
			arr.splice(i,1);
		}
	}
	el.className=arr.join(' ');
//	el.className=el.className.replace(new RegExp('(^|\\s)'+classN+'(^|\\s)'),' ')
}
//获取元素指定属性样式(只读属性)
function getStyle(el,attr){
	return window.getComputedStyle ? getComputedStyle(el,null)[attr] : el.currentStyle[attr];
}
//给元素添加同步动画效果(只兼容IE9及以上)
//元素，元素要更改的目标属性和目标值的集合对象，动画运行总时间，回调函数(可以处理队列动画)
function animate(el,obj,time,callback){
	if(typeof time === 'function' || time ===undefined){
		callback = time;//省略时间参数，只传三个参数(el,obj,callback)
		time = 300;//设置动画默认执行总时间
	}
	var t = 16;//定时器每16毫秒运行一次  
	var start = {};//创建空对象以便记录元素起始属性和起始值
	for(var i in obj){
		start[i] = parseFloat(getComputedStyle(el,null)[i]);//起始值，取浮点数
	}
	clearInterval(el.timer);//关闭旧的定时器，给元素对象添加一个新的定时器
	el.timer=setInterval(function(){
		var flag = true;//添加判断，过滤未改变属性，防止定时器误关闭
		for(var i in obj){
			var attr = i;//元素属性
			var target = obj[i];//目标值
			var current = parseFloat(getComputedStyle(el,null)[attr]);//当前值，取浮点数
			var step = (target - start[i])/time*t;//速度，每次更改的量
			//最后一次更改元素属性值可能到达不了目标值，判断到最后一步直接到目标值；
			//如果不加判定条件step=0；可能会造成往复动画暂停
			if(step >= 0 && current >= (target - step) || step <= 0 && current <= (target - step)){
				el.style[attr] = target + 'px';
			}else{
				flag = false;//有属性值未到达目标点
				el.style[attr] = current + step + 'px';//更改元素属性值
			}
		}
		//同步动画执行完成
		if(flag){
			clearInterval(el.timer);//动画结束,关闭本次定时器
			callback && callback.call(el);//如果有回调函数，则执行下一个列队动画，注意此处使用call()方法劫持元素对象，以防同步动画对象丢失。
		}
	},t);
}
/*
 * 事件对象
 */
//取消事件默认行为
function preventDefault(evt){
	var e=evt||window.event;
	if(evt){
		e.preventDefault();
	}else{
		e.returnValue=false;
	}
}
//阻止事件冒泡行为
function stopProp(evt){
	var e=evt||window.event;
	if(evt){
		e.stopPropagation();
	}else{
		e.cancelBubble=true;
	}
}
//获得统一的鼠标按键值
function getBtnValue(evt){
	var e=evt||window.event;
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
		return e.button;
	}
}
//获得统一的滚轮滚距(向上120，向下-120)
function getDelta(evt){
	if(evt.wheelDelta){
		return evt.wheelDelta;
	}else{
		return -evt.detail*40;
	}
}
//兼容写法：给元素的相同事件添加多个回调函数
function eventHandler(el,type,callback){
	if(el.addEventListener){
		el.addEventListener(type,callback);
	}else if(el.attachEvent){
		el.attachEvent('on'+type,callback);
	}else{
		el['on'+type]=callback;
	}
}
//兼容写法：移除事件
function removeHandler(el,type,callback){
	if(el.removeEventListener){
		el.removeEventListener(type,callback);
	}else if(el.detachEvent){
		el.detachEvent('on'+type,callback);
	}else{
		el['on'+type]=null;
	}
}
//获取cookie中指定字符对应的内容
function getCookie(key){
	var arr = document.cookie.split(';');
	for(var i=0;i<arr.length;i++){
		if(arr[i].split('=')[0].trim() === key){
			return arr[i].split('=')[1];
		}
	}
}
//设置指定字符和内容的cookie，并设置有效时间
function setCookie(key,value,day){
	var str = key + '=' + value;//转换为cookie中指定的字符串格式
	if(typeof day != undefined){//未设置有效时间时添加个有效时间
		var date = new Date();//创建一个事件对象
		date.setDate(date.getDate() + day);//获取日期并设置日期
		str += ';espires=' + date;//添加有效时间
	}
	document.cookie = str;//储存到cookie中
}
//ajax封装
/*
 * 
 */
function ajax(obj){
	var type = obj.type == undefined ? 'get' : obj.type;
	var async = obj.async == undefined ? true : obj.async;
	var dataType = obj.dataType == undefined ? 'json' : obj.dataType;
	var arr = [];
	for ( var i in obj.data){
		arr.push(i + '=' + obj[i]);
	}
	var data = arr.join('&');
	var xhr = new XMLHttpRequest();
	if(async){
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				callback();
			}
		}
	}
	if(type == 'get'){
		obj.url += (obj.url.indexOf('?') == -1 ? '?' : '&') + data;
	}
	xhr.open(type,obj.url,async);
	if(type == 'post'){
		xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		xhr.send(data);
	}else{
		xhr.send(null);
	}
	function callback(){
		if(xhr.status == 200){
			obj.success(dataType == 'json' ? JSON.parse(xhr.responseText) : xhr.responseText);
		}else{
			console.log('请求失败！状态码：' + xhr.status + '状态描述：' + xhr.statusText);
		}
	}
}
