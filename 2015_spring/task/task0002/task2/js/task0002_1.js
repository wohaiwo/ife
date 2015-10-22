/*
*
* @author zhanhang
* @time 2015/10/16
*
**/

var utils = {
	// 获取事件对象
	getEvent: function(event) {
		return event ? event : window.event;
	},
	// 获取目标对象
	getTarget: function(event) {
		return event.target || event.srcElement;
	},
	addEvent: function(element, event, listener) {
		if(element.addEventListenenr) {
		element.addEvent(event, listener, false);
		} else if (element.attachEvent) {
			element.addachEvent("on" + event, listener);
		} else {
			element["on" + event] = listener;
		}
	},
};
// 将newElement元素插入到oldElement元素之后
function insertAfter(newElement, oldElement) {
	var parent = oldElement.parentNode;
	if(parent.lastChild == oldElement) {
		parent.appendChild(newElement);
	} else {
		parent.insertBefore(newElement, oldElement.nextSibling);
	}
}
//数组去重
function uniqueArray(arr) {
	var n = [];
	for(var i = 0, len = arr.length; i < len; i++) {
		if(n.indexOf(arr[i]) == -1)
			n.push(arr[i]);
	}
	return n;
}

/************step1  ******************/
var btn1 = document.querySelector("div.step1 input.ife-btn");
utils.addEvent(btn1, "click", function(event) {
	var input = document.querySelector("div.step1 input.ife-input");
	var value = input.value.trim();
	var p = document.createElement("p");
	if(!value) {
		p.innerHTML =  "你输入的东西为空.";
		insertAfter(p, btn1);
		return false;
	}
	var arr = value.split(/[\,\s]+/);
	arr = uniqueArray(arr);
	var output = arr.join(",");
	p.innerHTML = output;
	insertAfter(p, event.target);
});

/**************step2  ***************************/

var btn2 = document.querySelector("div.step2 input.ife-btn");
utils.addEvent(btn2, "click", function(event) {
	var input = document.querySelector("div.step2 .ife-input");
	var value = input.value.trim();
	var p = document.createElement("p");
	if(!value) {
		p.innerHTML =  "你输入的东西为空.";
		insertAfter(p, btn2);
		return false;
	}
	var arr = value.split(/[\s\,\，\;\n]/);
	arr = uniqueArray(arr);
	var output = arr.join(", ");
	p.innerHTML = output;
	insertAfter(p, event.target);
});

/**************** step3 *********************************/

function showErr(msg) {
	var err = document.getElementsByClassName("ife-err")[0];
	if(msg) {
		err.innerHTML = msg;
	} else {
		err.innerHTML = "";
	}
}
var btn3 = document.querySelector("div.step3 input.ife-btn");
utils.addEvent(btn3, "click", function(event) {
	showErr();
	var input = document.querySelector("div.step3 .ife-input");
	var value = input.value.trim();
	var err = document.getElementsByClassName("ife-err")[0];
	
	if(!value) {
		showErr("你输入的东西为空.");
		return false;
	}
	var arr = value.split(/[\s\,\，\;\n]+/);
	if(arr.length > 10) {
		showErr("你输入的爱好数量不能超过10个");
		return false;
	}
	arr = uniqueArray(arr);
	var p = document.createElement("p");
	for(var i = 0, len = arr.length; i < len; i++) {
		var checkbox = document.createElement("input");
		checkbox.setAttribute("id", "checkbox" + i);
		checkbox.setAttribute("type", "checkbox");
		checkbox.setAttribute("value", arr[i]);
		var label = document.createElement("label");
		label.setAttribute("for", "checkbox" + i);
		label.innerHTML = arr[i];
		p.appendChild(checkbox);
		p.appendChild(label);
	}
	insertAfter(p, event.target);
});