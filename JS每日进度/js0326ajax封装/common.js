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
//获取指定css类名的元素
function $(selector){
	return document.querySelector(selector);
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
//获取事件对象目标
function getTarget(event){
	var evt=event||window.event;
	if(event){
		return evt.target;
	}else{
		return evt.srcElement;
	}
}
//获取指定cookie内容
function getCookie(key){
	var arr = document.cookie.split(';');
	for(var i=0;i<arr.length;i++){
		if(arr[i].split('=')[0].trim() === key){
			return arr[i].split('=')[1];
		}
	}
}
//设置指定内容cookie的有效时间
function setCookie(key,value,day){
	var str = key + '=' + value;
	if(typeof day != undefined){
		var date = new Date();
		date.setDate(date.getDate() + day);
		str += ';expires=' + date;
	}
	document.cookie = str;
}
//ajax封装
/*
 * obj对象中包含有type(请求类型)，url(请求地址)，async(同/异步)，data对象(待提交数据对象)，dataType(响应返回的数据类型),success(result)回调函数，可以在其内部处理响应返回的数据
 */
function ajax(obj){
	var type = obj.type == undefined ? 'get' : obj.type;//是否默认get请求
	var async = obj.async == undefined ? true : obj.async;//是否默认异步处理
	var dataType = obj.dataType == undefined ? 'json' : obj.dataType;//是否默认响应数据为json字符串
	//处理待提交数据对象，转换为指定格式字符串
	var arr = [];
	for ( var i=0;i<obj.data.length;i++){
		arr.push(i + '=' + obj[i]);
	}
	var data = arr.join('&');
	//创建一个xhr对象
	var xhr = new XMLHttpRequest();
	//异步时处理响应数据
	if(async){
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				callback();
			}
		}	
	}
	//使用get请求时，程序处理的过程
	if(type == 'get'){
		//在请求地址后添加待提交的数据，判断地址中是否有数据并拼接提交的数据
		obj.url += (obj.url.indexOf('?') == -1 ? '?' : '&') + data;
	}
	xhr.open(type,obj.url,async);//准备打开一个请求页面
	//使用post请求时，程序处理的过程
	if(type == 'post'){
		//添加一个模拟请求头
		xhr.setResquestHeader('Content-Type','application/x-www-form-urlencoded');
		xhr.send(data);//将待提交数据放入send()中
	}else{
		xhr.send(null);//get待提交请求时send(null)
	}
	//同步时处理响应数据
	if(!async){
		callback();
	}
	//封装处理响应数据
	function callback(){
		if(xhr.status == 200){//数据提交及响应ok
			//使用success回调函数，以便在函数外部调用响应的数据，判断响应数据是否为json字符串，如是则转换为对象以便调用
			obj.success(dataType == 'json' ? JSON.parse(xhr.responseText) : xhr.responseText);
		}else{//数据提交或响应失败，打印失败时的状态码和状态描述
			console.log('获取失败！状态码： ' + xhr.status + '状态描述:' + xhr.statusText);
		}
	}
}
//给元素添加同步动画效果
/*
 * el(指定的添加动画效果的元素对象),obj(包含指定元素待改变的样式属性和目标值，可以添加多个属性和值实现同步动画),time(动画执行时间),callback(回调函数，可以处理列队动画)，支持IE9及以上
 */
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
	clearInterval(el.timer);//清除上个定时器
	el.timer=setInterval(function(){
		var flag = true;//添加开关变量
		for(var i in obj){
			var attr = i;//获取目标属性
			var target = obj[i];//获取目标值
			var current = parseFloat(getComputedStyle(el,null)[attr]);//获取当前值
			var step = (target - start[i])/time*t;//获取每次定时器间隔的变化值
			//判断当前动画是否执行到最后一步
			if(step >= 0 && current >= (target - step) || step <= 0 && current <= (target - step)){
				el.style[attr] = target + 'px';
			}else{//动画未执行完成时处理程序
				flag = false;
				el.style[attr] = current + step + 'px';
			}
		}
		if(flag){//处理完同步动画
			clearInterval(el.timer);//清除本次定时器
			callback && callback.call(el);//执行列队动画
		}
	},t);
}
	
/*
function animate(el,obj,time,callback){
	for(var i in obj){
		var attr=i;
		var target=obj[i];
	}
	var start=parseInt(getStyle(el,attr));
	var t=16;
	var step=(target-start)/(time/t);
	var timer=setInterval(function(){
		if(step>0&&start>=(target-step)||step<0&&start<=(target-step)){
			clearInterval(timer);
			el.style[attr]=target+'px';
			if(callback) callback();
		}else{
			start+=step;
			el.style[attr]=start+'px';
		}
	},16);
}
*/