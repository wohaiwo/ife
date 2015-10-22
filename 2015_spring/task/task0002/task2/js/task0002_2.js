window.onload = function() {
	showTime();
};

function showTime() {
	var requestAnimationFrame = window.requestAnimationFrame || window.MozRequestAnimatinFrame || window.webkitRequestAnimationFrame;
	var btn = document.getElementById("ife-btn");
	btn.addEventListener("click", function() {
		step();
		function step() {
			var input = document.getElementById("ife-input");
			var output = document.getElementById("output");
			input = input.value.trim();
			if(!input) {
				return false;
			}
			var arr = input.split(/\-+/);	
			if(arr[1] > 12 || arr[2] > 31 ) {
				output.innerHTML = "请输入正确的时间";
				return false;
			}	
			var endTime = new Date(arr[0], arr[1] - 1, arr[2], 0, 0, 0);
			var curTime = new Date();
			var date = Math.round(endTime.getTime() - curTime.getTime()) / 1000;  		// 转化为 还有多少秒
			if(date < 0) {
				output.innerHTML = "当前的时间已经过了.";
				return false
			}
			// 输出时间
			var days = parseInt(date / 86400);
			var hours = parseInt((date - days*86400) / 3600);
			var minutes = parseInt((date - days*86400 - hours*3600) / 60);
			var seconds = parseInt(date % 60);
			output.innerHTML = "距离" + arr[0] + "年" + arr[1]+ "月" +arr[2] + "日   还有"+ days +"天" + hours + "小时" + minutes + "分钟" + seconds + "秒";
			requestAnimationFrame(step);
		}
	}, false);
}

