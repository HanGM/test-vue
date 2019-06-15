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
