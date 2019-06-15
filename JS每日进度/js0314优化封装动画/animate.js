//元素、属性、目标属性值、移动速度、回调函数
function move(el,attr,target,speed,callback){
	clearInterval(el.timer);
	var current=parseInt(getComputedStyle(el,null)[attr]);		
	if(current>target){
		speed=-speed;
	}
	el.timer=setInterval(function(){	
		current+=speed;
		if(speed>=0&&current>target||speed<=0&&current<target){
			current=target;
		}
		el.style[attr]=current+'px';
		if(current==target){
			clearInterval(el.timer);
			callback&&callback();
		}
	},16);
}
//元素，元素属性和值的集合对象，动画运行时间，回调函数
function animation(el,obj,time,callback){
	clearInterval(el.timer);
	for(var i in obj){
		var attr=i;
		var target=obj[i];
	}
	var current=parseInt(getComputedStyle(el,null)[attr]);		
	var speed=(target-current)/time*16;
	el.timer=setInterval(function(){
		current+=speed;
		if(speed>=0&&current>target||speed<=0&&current<target){
			current=target;
		}
		el.style[attr]=current+'px';
		if(current==target){
			clearInterval(el.timer);
			callback&&callback();
		}
	},16);
}

//元素，元素属性和值的集合对象，动画运行时间，回调函数
function animate(el,obj,time,callback){
	for(var i in obj){
		var attr=i;
		var target=obj[i];
	}
	var start=parseInt(getComputedStyle(el,null)[attr]);
	var t=16;
	var step=(target-start)/time*t;
	var timer=setInterval(function(){
		if(step>0&&start>=(target-step)||step<0&&start<=target){
			clearInterval(timer);
			el.style[attr]=target+'px';
			if(callback) callback();
		}else{
			start+=step;
			el.style[attr]=start+'px';
		}
	},16);
}
//同步动画
function animates(el,obj,time,callback){
	var start={};
	for(var i in obj){
		start[i]=parseFloat(getComputedStyle(el,null)[i]);
	}
	var t=16;
	clearInterval(el.timer);
	el.timer=setInterval(function(){
		for(var i in obj){
			var attr=i;
			var target=obj[i];
			var step=(target-start[i])/time*t;
			var current=parseFloat(getComputedStyle(el,null)[attr]);
			if(step>0&&current>=(target-step)||step<0&&current<=(target-step)){
				clearInterval(el.timer);
				el.style[attr]=target+'px';
				callback&&callback();
			}else{
				el.style[attr]=current+step+'px';
			}
		}
	},t);
}
