/**
 * Created by fanyifan1 on 2016/6/2.
 */

//选项卡
!function () {
	var jobTab = document.getElementById("job_tab");
	var jobList = document.getElementById("job_list");
	var jTabs = jobTab.getElementsByTagName("li");
	var jLis = jobList.getElementsByClassName("init_job_list");

	for (var i = 0; i < jTabs.length; i++) {
		~function (i) {
			jTabs[i].onclick = function () {
				for (var j = 0; j < jTabs.length; j++) {
					jTabs[j].className = "";
					jLis[j].style.display = "none";
				}
				jTabs[i].className = "current";
				jLis[i].style.display = "block"
			}
		}(i);
	}
}();

//回到顶部

~function () {
	var backtop = document.getElementById('backTop');
	showBtn();
	backtop.onclick = function () {
		var step = 50;
		var interval = 10;
		var timer = window.setInterval(function () {
			if (utils.getWin('scrollTop') <= 0) { //定时器就清除掉了
				window.clearInterval(timer);
				return;
			}
			var srcollTop = utils.getWin('scrollTop');
			srcollTop -= step;
			utils.getWin('scrollTop', srcollTop);
			showBtn();
		}, interval);
	}

	window.addEventListener("scroll", showBtn, false);
	function showBtn() {
		if (utils.getWin('scrollTop') <= 0) {
			backtop.style.display = 'none';
		} else {
			backtop.style.display = 'block';
		}
	}
}();

//底部的loginbar
~function () {
	var backtop = document.getElementById('backTop');
	var bar = document.getElementById("bt-login");
	var footer = document.getElementById("load");
	var feedback = document.getElementById("product-fk");
	window.addEventListener("scroll", function () {
		var winH = document.documentElement.clientHeight || document.body.clientHeight;
		var h = parseFloat(document.documentElement.scrollTop || document.body.scrollTop) + parseFloat(winH);
		var t = load.offsetTop;
		if (h >= t) {
			backtop.style.bottom = 140 + (h - t) + "px";
			feedback.style.bottom = 80 + (h - t) + "px";
			bar.style.bottom = (h - t) + "px";
		} else {
			backtop.style.bottom = 140 + "px";
			feedback.style.bottom = 80 + "px";
			bar.style.bottom = 0;
		}
	}, false)
}();


//轮播效果
~function () {
	var banner = document.getElementById('banner');
	var inner = banner.getElementsByTagName('div')[0];
	var control = document.getElementsByClassName('banner_control_ul')[0];
	var control_i = control.getElementsByTagName('i');
	var em = document.getElementById('banner_control_em');
	var controlLis = control.getElementsByTagName('li');
	var step = 0;
	inner.timer = window.setInterval(autoMove, 2000);

	function autoMove() {
		step++;
		if (step == 4) {
			utils.setCss(inner, "marginTop", 0);
			step = 0;
		}
		zhufengAnimate(inner, {'marginTop': -160 * step}, 200);
		changeTip();
	}

	banner.onmouseover = function () {
		clearInterval(inner.timer);
	}
	banner.onmouseleave = function () {
		inner.timer = window.setInterval(autoMove, 2000)
	}

	~function () {
		for (var i = 0; i < 3; i++) {
			var cur = controlLis[i];
			cur.index = i;
			cur.onmouseenter = function () {
				step = this.index;
				changeTip();
				zhufengAnimate(inner, {marginTop: -step * 160}, 200);
			}
		}
	}();
//焦点对齐
	function changeTip() {
		var tempStep = step > 2 ? 0 : step;
		for (var i = 0; i < 3; i++) {
			var cur = controlLis[i];
			if (i === tempStep) {
				zhufengAnimate(em, {top: 55 * tempStep}, 200);
			}
			i === tempStep ? utils.setCss(control_i[i], "background", "black") : utils.setCss(control_i[i], "background", "none");
		}
	}
}();

//遮罩层

~function () {
	var oUl = document.getElementById('thumbs');
	var oLis = oUl.getElementsByTagName('li');
	var img = oUl.getElementsByTagName('img');
	var oMark = document.getElementsByClassName('thumb_mark');
	var len = oLis.length;

	function getMousePos(obj, e) {
		var w = obj.offsetWidth;
		var h = obj.offsetHeight;
		var x = obj.offsetLeft + w / 2 - e.pageX;
		var y = obj.offsetTop + h / 2 - e.pageY;
		return Math.round((Math.atan2(y, x) * 180 / Math.PI + 180) / 90) % 4;
	};
	for (var i = 0; i < len; i++) {
		~function (i) {
			oLis[i].onmouseenter = function (e) {
				var e = e || window.event;
				var q = getMousePos(this, e);
				switch (q) {
					case 0:
						oMark[i].style.left = oLis[i].offsetWidth + "px";
						oMark[i].style.top = '0';
						break;
					case 1:
						oMark[i].style.left = '0'
						oMark[i].style.top = oLis[i].offsetHeight + "px";
						break;
					case 2:
						oMark[i].style.left = -oLis[i].offsetWidth + "px";
						oMark[i].style.top = '0';
						break;
					case 3:
						oMark[i].style.left = '0'
						oMark[i].style.top = -oLis[i].offsetHeight + "px";
						break;
				}
				zhufengAnimate(oMark[i], {left: 0, top: 0}, 200);
			}

		}(i);
		~function (i) {
			oLis[i].onmouseleave = function (e) {
				var e = e || window.event;
				var q = getMousePos(this, e);
				switch (q) {
					case 0:
						zhufengAnimate(oMark[i], {left: oLis[i].offsetWidth, top: 0}, 200)
						break;
					case 1:
						zhufengAnimate(oMark[i], {left: 0, top: oLis[i].offsetHeight}, 200)
						break;
					case 2:
						zhufengAnimate(oMark[i], {left: -oLis[i].offsetWidth, top: 0}, 200)
						break;
					case 3:
						zhufengAnimate(oMark[i], {left: 0, top: -oLis[i].offsetHeight}, 200)
						break;
				}
			}
		}(i);
	}
}();

//左侧楼层导航
~function () {
	var oLis = utils.getElementsByClass("navigation_fir_1");
	for (var i = 0; i < oLis.length; i++) {
		~function (i) {
			oLis[i].onmouseover = function () {
				utils.addClass(utils.children(this)[0], "select");
				utils.addClass(utils.children(this)[1], "select");
			}
			oLis[i].onmouseout = function () {
				utils.removeClass(utils.children(this)[0], "select");
				utils.removeClass(utils.children(this)[1], "select");
			}
		}(i);
	}
}();

//用户反馈
~function () {
	var fbIcon = document.getElementById("fb-icon");
	var fbForm = document.getElementById("feedback-con");
	var fbClose = document.getElementById("pfb-close");
	var fbEnsure = document.getElementById('pfb-ensure');
	var fbText = fbForm.getElementsByTagName('textarea')[0];
	var fbSuc = document.getElementById("fk-suc");
	var fbValueLess = document.getElementById("fk-novalue");
	fbIcon.onclick = function () {
		fbForm.style.display = "block";
	}

	fbClose.onclick = function () {
		fbForm.style.display = "none";
	}
	fbEnsure.onclick = function () {
		if (fbText.value) {
			fbSuc.style.display = "block";
			fbForm.style.display = "none";
			fbText.value = "";
			fbEnsure.timer1 = setTimeout(function () {
				fbSuc.style.display = "none";
				window.clearTimeout(fbEnsure.timer1);
			}, 4000);
		} else {
			console.log(fbValueLess);
			fbValueLess.style.display = "block";
			fbEnsure.timer2 = setTimeout(function () {
				fbValueLess.style.display = "none";
				window.clearTimeout(fbEnsure.timer2);
			}, 4000)
		}
	}
}();


