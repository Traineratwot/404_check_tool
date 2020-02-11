Array.prototype.unique = function () {
	var c = this;
	return c.filter(function (item, pos) { return c.indexOf(item) == pos; });
};
$('#ttttttt').on('click', function () {
	links_report(this);
	return false;
});
function sleep(ms) {
	ms += new Date().getTime();
	while (new Date() < ms) { }
}
var mss = [];
function links() {
	var _mss = [];
	var href;
	var lin = document.querySelectorAll('a,area,img');
	for (var i = 0; i < lin.length; i++) {
		if (lin[i].href) {
			href = lin[i].href;
		} else if (lin[i].src) {
			href = lin[i].src;
		}
		if (href.indexOf('data:') === 0) {
			continue;
		}
		_mss.push([href, cssPath(lin[i])]);
	}
	var parent = document.location.href;
	parent = parent.replace(document.location.hash, '');
	mss[parent] = _mss.unique();
}

function cssPath(el) {
	if (!(el instanceof Element))
		return;
	var path = [];
	while (el.nodeType === Node.ELEMENT_NODE) {
		var selector = el.nodeName.toLowerCase();
		if (el.id) {
			selector += '#' + el.id;
			path.unshift(selector);
			break;
		} else {
			var sib = el, nth = 1;
			while (sib = sib.previousElementSibling) {
				if (sib.nodeName.toLowerCase() == selector)
					nth++;
			}
			if (nth != 1)
				selector += ":nth-of-type(" + nth + ")";
		}
		path.unshift(selector);
		el = el.parentNode;
	}
	return path.join(" > ");
}
function arr2obj2json(arr, js = false) {
	var obj = {};
	for (var key in arr) {
		if (typeof arr[key] == "object" || typeof arr[key] == "array") {
			obj[key] = arr2obj2json(arr[key]);
		} else {
			obj[key] = arr[key];
		}
	}
	if (js) {
		return JSON.stringify(obj);
	} else {
		return obj;
	}
}
function links_report() {
	var dt = { mss: arr2obj2json(mss, 1) };
	$.ajax({
		type: "POST",
		url: "Links_report.php",
		data: dt,
		dataType: "json",
		success: function (response) {
			// document.location.href = l
		}
	});
}
// выбираем нужный элемент
var target = document.querySelector('body');

// создаем новый экземпляр наблюдателя
var observer = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {

		setTimeout(() => { links_report(); links(); }, 1000)
	});
});

// создаем конфигурации для наблюдателя
var config = { childList: true };

// запускаем механизм наблюдения
observer.observe(target, config);