/*
*
* @author zhanhang 
* @time 2015/10/19 22:51
* @description 第一张图片和最后一张图片转化的时候 没有动画效果 直接变化过去  js代码没有封装 比较乱
*
**/


window.onload = function() {
				
	var container = getId("container"),
 		prev = getId("prev"),         // 前一张，后一张图片 
		next = getId("next"),
		direction = getId("direction"),
		isLoop = getId("isLoop"),
		duration = getId("duration"),
		sure = getId("sure"),
		buttonItem = document.getElementsByTagName('span'),
		timer,						 // 控制循环的事件函数
		index = 1,                   // 当前选中的按钮
		_isLoop = true, 			 // 是否需要循环	默认循环
		_direction = true,			 // 循环图片 正序或者逆序 默认正序
		_duration = 3000,	 			 // 时间间隔
		offsetWidth = 500;			 // 照片的宽度

			   
		addEvent(next, "click", nextImage);
		addEvent(prev, "click", prevImage);
		addEvent(sure, "click", function() {
			_direction = (direction.value === "1") ? true : false;
			_isLoop = (isLoop.value == 1) ? true : false;
			_duration = parseInt(duration.value) ? parseInt(duration.value) : 3000;
			if(_duration < 0) {
				alert("时间间隔需要大于0");
				_isLoop = false;
			}
		});

		addEvent(container, "mouseleave", function() {
			play(_duration);
		});
		addEvent(container, "mouseenter", stop);


		function play(_duration) {
			timer = setInterval(function() {
				if(!_isLoop) {				// 当_isLoop 的值为false的时候  则跳出循环
					clearInterval(timer);
					return false;
				}
				if(_direction) {
					nextImage();
				} else {
					prevImage();
				}
			}, _duration);
		}
		function stop() {
			clearInterval(timer);
		}
	// 给轮播图中的按钮添加click事件
	for(var i= 0, len = buttonItem.length; i< len; i++) {
		addEvent(buttonItem[i], "click", function() {
			// 获取按钮里的index属性的值
			var currentIndex = parseInt(this.getAttribute("index")),
				offset = -offsetWidth * (currentIndex - index);
				animation(offset);
				index = currentIndex;    //将当前的选中currentIndex赋值给index 防止重复点击一个值时,发生图片变化
				showButton();
		});
	}

	// 动画移距离
	function animation(offset) {
		var list = getId("list");
		var newLeft = parseInt(getStyle(list, "left")) + offset;	
		var interval = 60;
		// 照片移动速度 
		var speed = Math.floor(offset / 10 );	
		
	    var go = function() {
	    	// 判断是否到达边界图片
	    	if(newLeft > 0) {
					list.style.left = -2000 + "px";		
					return false;
				}
			if(newLeft < -2000) {
				list.style.left = 0 + "px";		
				return false;	
			}	
	 		if( ( speed < 0 && parseInt(getStyle(list, "left")) > newLeft ) || ( speed > 0 && parseInt(getStyle(list, "left")) < newLeft ) ){
               list.style.left = parseInt(getStyle(list, "left")) + speed + "px";
                setTimeout(go, 60);
            } 	
		};
		go();	
	}

	// button按钮的点击，取消状态
	// index 当前选中的按钮
	function showButton() {
		// 遍历所有按钮, 取消按钮点击状态
		for(var i= 0, len = buttonItem.length; i< len; i++) {
			if(buttonItem[i].className === "on") {
				buttonItem[i].className = "";
				break;
			}
		}
		// 由于数组是从0开始遍历的, 所以当前选中的index要减一
		buttonItem[index - 1].className = "on";
	}

	
	function nextImage() {
		animation(-offsetWidth);
		if(index >= 5) {
			index = 1; 
		} else {
		index += 1;
		}
		showButton();
	}
	function prevImage() {
		animation(offsetWidth);
		if(index == 1) {
			index = 6;
		}
		index -= 1;
		showButton();
	}	


	function getId(e) {
		return document.getElementById(e);
	}

	// 事件监听函数 兼容模式
	function addEvent(obj, event, callbackFunction) {
		if(obj.addEventListener) {
			obj.addEventListener(event, callbackFunction, false);
		}else if(obj.attachEvent) {
			obj.attachEvent( "on"+ event,callbackFunction);
		}else {
			obj["on" +event] = callbackFunction;
		}
	}

	// 获取实际的css属性函数
	function getStyle(obj,attr) {
		if(obj.currentStyle) {
			return obj.currentStyle[attr];               // -ie
		}else {				
			return getComputedStyle(obj, null)[attr];   // -moz
		}
	}

};
