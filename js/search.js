/**
 * Created by fanyifan1 on 2016/6/3.
 */
!function () {
	/**
	 * jsonp
	 * @param {string} url jsonp接口
	 * @param {*} data 需要发送的参数
	 * @param {string} jsonpcallback jsonpcallback
	 * @param {Function} callback 回调函数
	 */

	this.jsonp = function (url, data, jsonpcallback, callback) {
		var count = 'cb' + counter++;
		// 生成jsonpcallback后面的变量名
		var callbackName = 'window.jsonp.' + count;

		url = tools.padString(url, data);

		url = tools.padString(url, jsonpcallback + '=' + callbackName);
		window.jsonp[count] = function (data) {
			try {
				callback(data);
			} finally {
				script.parentNode.removeChild(script);
				delete window.jsonp[count];
			}
		};

		var script = document.createElement('script');
		script.src = url;
		script.async = 'async';
		var timer = setInterval(function () {
			if (document.readyState === 'complete') {
				document.body.appendChild(script);
				clearInterval(timer);
			}
		}, 300);
	};

	var counter = 1;

	var tools = {
		encodeToURIString: function (data) {
			if (typeof data === 'string') {
				return data;
			}
			if (typeof  data === 'object') {
				var arr = [];
				for (var n in data) {
					if (!(data.hasOwnProperty(n))) continue;
					arr.push(encodeURIComponent(n) + '=' + encodeURIComponent(data[n]));
				}
				return arr.join('&');
			}
			return '';
		},
		padString: function (url, data) {
			data = this.encodeToURIString(data);
			if (!data) {
				return url;
			}
			return url + (/\?/.test(url) ? '&' : '?') + data;
		}
	}
}();
var search = document.getElementById("search_input_text");
var searchBtn = document.getElementById('search_input_summit');
var searchList = document.getElementById('search_list');
var box = document.getElementById("search_box");
var jobInfo=document.getElementById('searchPosInfo');
var comInfo=document.getElementById('searchComInfo');
var jobUl =utils.getElementsByClass("job_search")[0];
var comUl =utils.getElementsByClass("com_search")[0];
//利用jsonp生成下拉菜单
function searchInfo() {
	var val = search.value.replace(/^ +| +$/g,"");
	if (val) {
		jsonp('http://suggest.lagou.com/suggestion/mix',
			{input: val},
			'suggestback',
			function (data) {
				searchList.style.display="none";
				if(data){
					var comList = data["COMPANY"];
					var jobList = data["POSITION"];
					searchList.style.display="block";
					if (jobList.length!=0) {
						var fragment = document.createDocumentFragment();
						for (var i = 0; i <jobList.length; i++) {
							var li = document.createElement("li");
							var str = "";
							str += "<li>";
							str += jobList[i].cont;
							str += "<span>";
							str += "共" + jobList[i]["hotness"] + "个职位";
							str += "</span>";
							li.innerHTML = str;
							fragment.appendChild(li);
						}
						jobUl.innerHTML="";
						jobUl.appendChild(fragment);
						jobUl.parentNode.style.display="block";
						fragment = null;
						jobInfo.style.display = "inline-block";

					}else {
						jobUl.parentNode.style.display="none";
						jobInfo.style.display = "none";
					}

					if (comList.length!=0) {
						var fragment = document.createDocumentFragment();
						for (var i = 0; i < comList.length; i++) {
							var li = document.createElement("li");
							var str = "";
							str += "<li>";
							str += comList[i].cont;
							str += "<span>";
							str += "共" + comList[i]["hotness"] + "个职位";
							str += "</span>";
							li.innerHTML = str;
							fragment.appendChild(li);
						}
						comUl.innerHTML="";
						comUl.appendChild(fragment);
						comUl.parentNode.style.display = "block";
						fragment = null;
						comInfo.style.display="inline-block";
					}else{
						comUl.parentNode.style.display = "none";
						comInfo.style.display="none";
					}
				}

			}
		);
	}
}
//删除输入框内容按钮
/*function showX() {
	var val = search.value;
	if (val) {
		cls.style.visibility = "visible";
		//点击"X"按钮时清空输入,同时隐藏下拉菜单,将自身隐藏
		cls.addEventListener("click", function () {
			search.value = "";
			searchList.style.display = "none";
			this.style.visibility = "hidden"
		});
	} else {
		cls.style.visibility = "hidden";
	}
}*/


//实现基本逻辑,点击下拉菜单和搜索按钮跳转页面.
document.body.onclick = function (e) {
	e = e || window.event;
	searchList.style.display = 'none';
/*	jobInfo.style.display="none";
	comInfo.style.display="none";*/
};

/*searchList.onclick = function (e) {
	e = e || window.event;
	var target = e.srcElement || e.target;
	window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(target.innerHTML), '_blank');
};
searchBtn.onclick = function () {
	var val = search.value;
	if (val) {
		window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(search.value), '_blank');
	}

}*/
box.onclick = function (e) {//阻止冒泡
	e.stopPropagation();
	e.cancelBubble = true;
}

search.oninput=searchInfo;



function keydown(e){
	e=e||window.event;
	var target= e.target|| e.srcElement;
	if((target=utils.children(jobUl,"li"))|| (target = utils.children(jobUl, "li")))
	switch(e.keyCode){
		case 38:

	}



}
