/**
*
* @author zhanhang
* @time 2015-10-3 20:42
* @description ife-task2 work
*/


/*******************任务2 JavaScript数据类型以语言基础*********************************/

/**
* 判断arr是否为一个数组，返回一个bool值
*
* @param {arr} arr 目标对象
* @return {boolean} true || false
*/
function isArray(arr) {
	if(Object.prototype.toString.call(arr) == "[object Array]") {
	}
	return Object.prototype.toString.call(arr) == "[object Array]";
}

/**
* 判断是否为一个函数，返回一个bool值
*
* @param {fn} fn 目标函数
* @return {boolean} 判断结果
*/
function isFunction(fn) {
	return Object.prototype.toString.call(fn) == "[object Function]";
}

/**
 * 判断一个对象是不是字面量对象，即判断这个对象是不是由{}或者new Object类似方式创建
 *
 * 事实上来说，在Javascript语言中，任何判断都一定会有漏洞，因此本方法只针对一些最常用的情况进行了判断
 *
 * @returns {Boolean} 检查结果
 */
function isObject(obj) {
	var hasOwnProperty = Object.prototype.hasOwnProperty,
		key;
	if(!obj || Object.prototype.toString.call(obj) !== "[object Object]" || 
		 //IE下，window/document/document.body/HTMLElement/HTMLCollection/NodeList等DOM对象上一个语句为true
         //isPrototypeOf挂在Object.prototype上的，因此所有的字面量都应该会有这个属性
         //对于在window上挂了isPrototypeOf属性的情况，直接忽略不考虑
         !('isPrototypeOf' in obj)) {
		return false;
	}

	//判断new fun()自定义对象的情况
    //constructor不是继承自原型链的
    //并且原型中有isPrototypeOf方法才是Object
	if(obj.constructor && 
	  !hasOwnProperty.call(obj, "constructor") && 
	  !hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf")) {
		return false;
	}

	//判断有继承的情况
    //如果有一项是继承过来的，那么一定不是字面量Object
    //OwnProperty会首先被遍历，为了加速遍历过程，直接看最后一项
	for( var key in obj) {
		return key === undefined || hasOwnProperty.call(obj, key);
	}
}
/**
* 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
* 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
*
* @param {src} src 传入要被复制的对象
* @return {result} result 深度克隆的对象
*/
function cloneObject(src) {
	var result = src;
	// 判断对象是否为字符串，数组，布尔值
	if(!src 
		|| typeof(src) === "number"
		|| typeof(src) === "string"
		|| typeof(src) === "boolean") {
		return result;
	} else if (isArray(src)) {
		result = [];
		var resultLen = 0;
		for(var i = 0, len = src.length; i < len; i++) {
			result[resultLen++] = cloneObject(src[i]);
		}
	} else if (isObject(src)) {
		result = {};
		for( var i in src) {
			if(src.hasOwnProperty(i)) {
				result[i] = cloneObject(src[i]);  
			}
		}
	}
	return result;
}
// 测试用例
var srcObj = {
	a: 1,
	b: {
		b1: ["hello", "hi"],
		b2: "javascript"
	}
};
var abObj = srcObj;

var tarObj = cloneObject(srcObj);
srcObj.a = 2;
srcObj.b.b1[0] = "zhanhang";

console.log(abObj.a);			// 2
console.log(abObj.b.b1[0]);		// "zhanhang"

console.log(tarObj.a);			// 1
console.log(tarObj.b.b1[0]);    // "hello"

/**
* 对数组进行去重操作，消除数组中相同的数字或字符串，返回一个去重后的数组
*
* @param {arr}  传入一个数组
* @return {arr} 返回一个去重后的数组
*/
function uniqArray(arr) {
	var array = [];
	// 判断传入参数是否是数组
	if(isArray(arr)) {
		for(var i = 0, len = arr.length; i < len; i++) {
			if(arr.indexOf(arr[i]) == i) {
				array.push(arr[i]);
			}
		}
	}
	return array;
}
// 测试用例
var a = [1, 3, 7, 4, 5, 7, 3];
var b = uniqArray(a);
console.log(a);
console.log(b);


/**
* 使用简单的循环来去除字符串中前后的空格符
*
* @param {str}  传入一个待处理的字符串
* @return {} 返回一个字符串
*/
function simpleTrim(str) {
	var len = str.length;
	// 判断字符串是否为空
	function isEmpty(c) {
		return /\s/.test(c);
	}
	for(var i = 0; i < len; i++) {
		if(!isEmpty(str[i])) {
			break;
		}
	}
	for(var j = len; j > 0; j--) {
		if(!isEmpty(str[j-1])) {
			break;
		}
	}
	if(i > j) {
		return "";
	}
	return str.substring(i , j);
}
function trim(str) {
	var trimer = new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)","g");
	return String(str).replace(trimer, "");
}
// test 测试用例
var str = " zhan hang ";
console.log(simpleTrim(str));




// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
// 其中fn函数可以接受两个参数：item和index
function each(arr, fn) {
    // your implement
    for(var i = 0, len = arr.length; i < len; i++) {
    	fn(arr[i]);
    }
}



// 使用示例
var arr = ['java', 'c', 'php', 'html'];
function output(item) {
    console.log(item)
}
each(arr, output);  // java, c, php, html



// 使用示例
var arr = ['java', 'c', 'php', 'html'];
function output(item, index) {
    console.log(index + ': ' + item)
}
each(arr, output);  // 0:java, 1:c, 2:php, 3:html



/* ife-源代码 */
/**
 * 获取一个对象里面第一层元素的数量，返回一个整数
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
 *
 * @param  {Object} obj
 * @return {number} 元素长度
 */
var getObjectLength = (function() {
    'use strict';
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({
            toString: null
        }).propertyIsEnumerable('toString'),
        dontEnums = [
            'toString',
            'toLocaleString',
            'valueOf',
            'hasOwnProperty',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'constructor'
        ],
        dontEnumsLength = dontEnums.length;

    return function(obj) {
        if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
            throw new TypeError('getObjectLength called on non-object');
        }

        var result = [],
            prop, i;

        for (prop in obj) {
            if (hasOwnProperty.call(obj, prop)) {
                result.push(prop);
            }
        }

        if (hasDontEnumBug) {
            for (i = 0; i < dontEnumsLength; i++) {
                if (hasOwnProperty.call(obj, dontEnums[i])) {
                    result.push(dontEnums[i]);
                }
            }
        }
        return result.length;
    };
}());

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
	return Object.keys(obj).length;
}

// 使用示例
var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};


// 判断是否为邮箱地址
function isEmail(emailStr) {
    // your implement
    return (/^[\w-]+@[\w-]+\.\w+$/).test(emailStr);
}

// 判断是否为手机号
function isMobilePhone(phone) {
    // your implement
    return (/\d{3}-\d{8}|\d{4}-\d{7}/).test(phone);
}

/*******************任务3 DOM**********************************/

//判断元素是否包含某个className元素
function hasClass(element, className) {
	var classNames = element.className;
	if(!className) {
		return false;
	}
	classNames = classNames.split(/\s+/);
	for(var i = 0, len = classNames.length; i < len; i++) {
		if(classNames[i] == className) {
			return true;
		}
	}
	return false;
}

// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
	if(!hasClass(element, newClassName)) {
		return false;
	}
	element.className = element.className ? [element.className, newClassName].join(" ") : newClassName;
}

// 移出element中的样式oldClassName
function removeClass(element, oldClassName) {
	if(!hasClass(element, oldClassName) {
		return false;
	}
	classNames = element.className.split(/\s+/);
	for(var i =0, len = classNames.length; i < len; i++) {
		if(classNames[i] == oldClassName) {
			classNames.splice(i, 1);
			break;
		}
	}
	element.className = classNames.join(" ");
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
	for(var node = element.parentNode.firstChild; node; node = node.nextSibling) {
		if(node === siblingNode) {
			return true;
		}
	}
	return false;
}
// 方法二 通过判断是否是用一个父元素来判断
function isSiblingNode1(element, siblingNode) {
	return element.parentNode === siblingNode.parentNode;
}
// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
	return element.getBoundingClientRect();
}

// 实现类似querySelector的函数功能
function $(selector) {
	// 未完 待续
}

/*************任务4 事件************/

// 给一个element绑定一个针对event事件的响应，响应函数为listener
var $ = {
	// 获取事件对象
	getEvent: function(event) {
		return event ? event : window.event;
	},
	// 获取目标对象
	getTarget: function(event) {
		return event.target || event event.srcElement;
	}
	// 取消事件默认行为
	preventDefault: function(event) {
		if(event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
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
	removeEvent: function(element, event, listener) {
		if(element.removeEventListener) {
		element.removeEventListener(event, listener, false);
		} else if (element.detachEvent) {
			element.detachEvent("on" + event, listener);
		} else {
			element["on" + event] = null;
		}
	},
	click: function(element, listener) {
		addEvent(element, "click", listener);
	},
	enter: function(element, listener) {
		addEvent(element, "keyup", function(event) {
			if(event.keyCode === 13) {
				listener();
			}
		});
	},
	// 获取鼠标按钮事件 判断按下了鼠标的哪个键
	getButton: function(event) {
		if(document.implementation.hasFeature("MouseEvents", "2.0")) {
			return event.button;
		} else {
			switch(event.button) {
				case 0:
				case 1:
				case 3:
				case 5:
				case 7:
					return 0;
				case 2:
				case 6:
					return 2;
				case 4:
					return 1;
				}
		}
	},
	getWheelDelta: function(event) {
		if(event.wheelDelta) {
			return event.wheelDelta;
		} else {
			return -event.detail * 40;
		}
	}
	
};

/**************  任务5 BOM  *******************/


/**************  任务6 Ajax  *******************/




