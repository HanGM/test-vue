function getId(id){
	return document.getElementByID(id);
}
function getTag(tag){
	return document.getElementsByTagName(tag);
}
function getClass(classN){
	var arr=[];
	var allEl=document.getElementsByTagName('*');
	for(var i=0;i<allEl.length;i++){
		var reg=new RegExp('(^|\\s)'+classN+'($|\\s)');
		if(allEl[i].className.match(reg)){
			arr.push(allEl[i]);
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
function getStyle(el,attr){
	return window.getComputedStyle?getComputedStyle(el,null)[attr]:el.currentStyle[attr];
}
function addClass(el,classN){
	var reg=new RegExp('(^|\\s)'+classN+'($|\\s)');
	if(!el.className.match(reg)){
		el.className=' '+classN;
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
function animate(el,obj,time,callback){
	if(typeof time==='function'||time===undefined){
		callback=time;
		time=300;
	}
	var start={};
	for(var i in obj){
		start[i]=parseFloat(getStyle(el,i));
	}
	var t=16;
	clearInterval(el.timer);
	el.timer=setInterval(function(){
		var flag=true;
		for(var i in obj){
			var attr=i;
			var target=obj[i];
			var current=parseFloat(getStyle(el,attr));
			var speed=(target-start[i])/time*t;
			if(speed>=0&&current>=(target-speed)||speed<=0&&current<=(target-speed)){
				el.style[attr]=target+'px';
			}else{
				flag=false;
				el.style[attr]=current+speed+'px';
			}
		}
		if(flag){
			clearInterval(el.timer);
			callback&&callback.call(el);
		}
	},t);
}
//获得统一的鼠标按键值
function getBtnValue(event){
	var evt=event||window.event;
	if(!event){
		switch(evt.button){
			case 1:
			return 0;
			case 4:
			return 1;
			case 2:
			return 2;
		}
	}else{
		return evt.button;
	}
}
//阻止事件对象默认行为
function preventDefault(event){
	var evt=event||window.event;
	if(event){//非IE阻止默认行为
		evt.preventDefault();
	}else{
		evt.returnValue=false;
	}//IE阻止默认行为
}
//阻止事件对象冒泡行为
function stopProp(event){
	var evt=event||window.event;
	if(event){//非IE阻止冒泡
		evt.stopPropagation();
	}else{//IE阻止冒泡
		evt.cancelBubble=true;
	}
}
//给事件绑定多个响应函数
function bild(el,eventstr,callback){
	if(window.addEventListener){
		el.addEventListener(eventstr,callback,false);
	}else{
		el.attachEvent('on'+eventstr,function(){
			callback.call(el);
		});
	}
}
//定位元素的拖拽效果
function drag(el){
	el.onmousedown=function(event){
		el.setCapture&&el.setCapture();
		var evt=event||window.event;
		var ol=evt.clientX-el.offsetLeft;
		var ot=evt.clientY-el.offsetTop;
		document.onmousemove=function(event){
			var evt=event||window.event;
			el.style.left=evt.clientX-ol+'px';
			el.style.top=evt.clientY-ot+'px';
			return false;
		}
		document.onmouseup=function(){
			document.onmousemove=null;
			document.onmouseup=null;
			el.releaseCapture&&el.releaseCapture();
		}
		return false;
	}
}
