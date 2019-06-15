// 遍历数组
Array.prototype.each = function(callback){
	for(var i = 0;i < this.length;i ++){
		callback(this[i],i)
	}
}
// 去除字符串前后空格
String.prototype.trim = function(){
	var reg = /^\s*|\s*$/g;
	return this.replace(reg,'');
}
// 兼容ie不支持getClassName的封装方法
function getClass(classN){
	var elNode = document.getElementsByTagName('*');
	// 为了用法习惯上的统一，这对获取节点这个效果，结果我们都返回成数组
	var el = []; // 用于储存匹配的节点对象
	for(var i = 0;i < elNode.length;i ++){
		var result = elNode[i].className.match(new RegExp('(^|\\s)'+classN+'(\\s|$)'));
		// var result = elNode[i].className.match(/(^|\s)classN(\s|$)/);
		if(result){ // 判断是否包含指定类名
			el.push(elNode[i]); // 如果包含则放入到el数组中
		}
	}
	// 将含有匹配结果的数组完整返回
	return el
}
// 获取元素
function getTag(tag){
	return document.getElementsByTagName(tag)
}
// 获取id
function getId(id){
	return document.getElementById(id);
}
// 获取外部或内部样式
function getStyle(el,attr){
	if(typeof getComputedStyle != 'undefined'){
		return getComputedStyle(el,null)[attr]
	}else{
		return el.currentStyle[attr]
	}
}
// 添加类名：查看当前元素是否含有指定类名，如果没有，在class后面添加一个指定类名
function addClass(el,classN){
	if(!el.className.match(new RegExp('(^|\\s)' + classN + '(\\s|$)'))){
		el.className += ' ' + classN;
	}
}
// 移除指定类名
function removeClass(el,classN){
	el.className = el.className.replace(new RegExp('(^|\\s)' + classN + '(\\s|$)'),' ')
}
// 获取所有兄弟元素
// 获取兄弟元素
function siblings (el){
	var child = el.parentNode.childNodes;
	var arr = [];
	for(var i = 0;i < child.length;i ++){
		if(child[i].nodeType === 1){
			if(child[i] !== el){
				arr.push(child[i]);
			}
		}
	}
	return arr;
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
// 动画封装
function animate(el,obj,timer,callback){
	if(typeof timer == 'function' || timer == undefined){
		callback = timer;
		timer = 300;
	}
	var start = {}; // 记录起始点
	for(var i in obj){
		start[i] = parseFloat(getComputedStyle(el,null)[i]); // 起始点
	}
	var t = 16; // 每16毫秒运行一次  
	// 第一次，鼠标经过box1，开启动画，在它结束之前，第二次经过box1，又一次开启了动画
	clearInterval(el.time);
	el.time = setInterval(function(){ // top = 0 **  height = 60
		var flag = true; // 用于判断是否所有属性都到达了目标点
		for(var i in obj){
			var attr = i; // 属性
			var target = obj[i]; // 目标点
			var step = (target - start[i]) / (timer / t); // 速度
			var cur = parseFloat(getComputedStyle(el,null)[attr]); // 当前点
			if(step >= 0 && cur >= (target - step) || step <= 0 && cur < (target - step)){
				el.style[attr] = target + 'px';
			}else{
				el.style[attr] = cur + step + 'px';
				flag = false; // 说明有属性没有到达目标点
			}
		}
		if(flag){ // 说明全部走完
			clearInterval(el.time);
			if(callback) callback.call(el); // 处理列队动画
		}
	},t)
}