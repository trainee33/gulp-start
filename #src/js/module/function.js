//======= svg ==========

(function () {
  "use strict";
  if (typeof window !== "undefined" && window.addEventListener) {
      var cache = Object.create(null);
      var checkUseElems;
      var tid;
      var debouncedCheck = function () {
          clearTimeout(tid);
          tid = setTimeout(checkUseElems, 100);
      };
      var unobserveChanges = function () {
          return;
      };
      var observeChanges = function () {
          var observer;
          window.addEventListener("resize", debouncedCheck, false);
          window.addEventListener("orientationchange", debouncedCheck, false);
          if (window.MutationObserver) {
              observer = new MutationObserver(debouncedCheck);
              observer.observe(document.documentElement, {
                  childList: true,
                  subtree: true,
                  attributes: true
              });
              unobserveChanges = function () {
                  try {
                      observer.disconnect();
                      window.removeEventListener("resize", debouncedCheck, false);
                      window.removeEventListener("orientationchange", debouncedCheck, false);
                  } catch (ignore) {}
              };
          } else {
              document.documentElement.addEventListener("DOMSubtreeModified", debouncedCheck, false);
              unobserveChanges = function () {
                  document.documentElement.removeEventListener("DOMSubtreeModified", debouncedCheck, false);
                  window.removeEventListener("resize", debouncedCheck, false);
                  window.removeEventListener("orientationchange", debouncedCheck, false);
              };
          }
      };
      var createRequest = function (url) {
          function getOrigin(loc) {
              var a;
              if (loc.protocol !== undefined) {
                  a = loc;
              } else {
                  a = document.createElement("a");
                  a.href = loc;
              }
              return a.protocol.replace(/:/g, "") + a.host;
          }
          var Request;
          var origin;
          var origin2;
          if (window.XMLHttpRequest) {
              Request = new XMLHttpRequest();
              origin = getOrigin(location);
              origin2 = getOrigin(url);
              if (Request.withCredentials === undefined && origin2 !== "" && origin2 !== origin) {
                  Request = XDomainRequest || undefined;
              } else {
                  Request = XMLHttpRequest;
              }
          }
          return Request;
      };
      var xlinkNS = "http://www.w3.org/1999/xlink";
      checkUseElems = function () {
          var base;
          var bcr;
          var fallback = "";
          var hash;
          var href;
          var i;
          var inProgressCount = 0;
          var isHidden;
          var Request;
          var url;
          var uses;
          var xhr;
          function observeIfDone() {
              inProgressCount -= 1;
              if (inProgressCount === 0) {
                  unobserveChanges();
                  observeChanges();
              }
          }
          function attrUpdateFunc(spec) {
              return function () {
                  if (cache[spec.base] !== true) {
                      spec.useEl.setAttributeNS(xlinkNS, "xlink:href", "#" + spec.hash);
                      if (spec.useEl.hasAttribute("href")) {
                          spec.useEl.setAttribute("href", "#" + spec.hash);
                      }
                  }
              };
          }
          function onloadFunc(xhr) {
              return function () {
                  var body = document.body;
                  var x = document.createElement("x");
                  var svg;
                  xhr.onload = null;
                  x.innerHTML = xhr.responseText;
                  svg = x.getElementsByTagName("svg")[0];
                  if (svg) {
                      svg.setAttribute("aria-hidden", "true");
                      svg.style.position = "absolute";
                      svg.style.width = 0;
                      svg.style.height = 0;
                      svg.style.overflow = "hidden";
                      body.insertBefore(svg, body.firstChild);
                  }
                  observeIfDone();
              };
          }
          function onErrorTimeout(xhr) {
              return function () {
                  xhr.onerror = null;
                  xhr.ontimeout = null;
                  observeIfDone();
              };
          }
          unobserveChanges();
          uses = document.getElementsByTagName("use");
          for (i = 0; i < uses.length; i += 1) {
              try {
                  bcr = uses[i].getBoundingClientRect();
              } catch (ignore) {
                  bcr = false;
              }
              href = uses[i].getAttribute("href")
                      || uses[i].getAttributeNS(xlinkNS, "href")
                      || uses[i].getAttribute("xlink:href");
              if (href && href.split) {
                  url = href.split("#");
              } else {
                  url = ["", ""];
              }
              base = url[0];
              hash = url[1];
              isHidden = bcr && bcr.left === 0 && bcr.right === 0 && bcr.top === 0 && bcr.bottom === 0;
              if (bcr && bcr.width === 0 && bcr.height === 0 && !isHidden) {
                  if (fallback && !base.length && hash && !document.getElementById(hash)) {
                      base = fallback;
                  }
                  if (uses[i].hasAttribute("href")) {
                      uses[i].setAttributeNS(xlinkNS, "xlink:href", href);
                  }
                  if (base.length) {
                      xhr = cache[base];
                      if (xhr !== true) {
                          setTimeout(attrUpdateFunc({
                              useEl: uses[i],
                              base: base,
                              hash: hash
                          }), 0);
                      }
                      if (xhr === undefined) {
                          Request = createRequest(base);
                          if (Request !== undefined) {
                              xhr = new Request();
                              cache[base] = xhr;
                              xhr.onload = onloadFunc(xhr);
                              xhr.onerror = onErrorTimeout(xhr);
                              xhr.ontimeout = onErrorTimeout(xhr);
                              xhr.open("GET", base);
                              xhr.send();
                              inProgressCount += 1;
                          }
                      }
                  }
              } else {
                  if (!isHidden) {
                      if (cache[base] === undefined) {
                          cache[base] = true;
                      } else if (cache[base].onload) {
                          cache[base].abort();
                          delete cache[base].onload;
                          cache[base] = true;
                      }
                  } else if (base.length && cache[base]) {
                      setTimeout(attrUpdateFunc({
                          useEl: uses[i],
                          base: base,
                          hash: hash
                      }), 0);
                  }
              }
          }
          uses = "";
          inProgressCount += 1;
          observeIfDone();
      };
      var winLoad;
      winLoad = function () {
          window.removeEventListener("load", winLoad, false);
          tid = setTimeout(checkUseElems, 0);
      };
      if (document.readyState !== "complete") {
          window.addEventListener("load", winLoad, false);
      } else {
          winLoad();
      }
  }
}());

//BodyLock
export function body_lock(delay) {
	let body = document.querySelector("body");
	if (body.classList.contains('_lock')) {
		body_lock_remove(delay);
	} else {
		body_lock_add(delay);
	}
}
export function body_lock_remove(delay) {
	let body = document.querySelector("body");
  let unlock = true;
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			body.classList.remove("_lock");
		}, delay);

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
export function body_lock_add(delay) {
	let body = document.querySelector("body");
  let unlock = true;
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		body.classList.add("_lock");

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}

// LettersAnimation
let title = document.querySelectorAll('._letter-animation');
if (title) {
	for (let index = 0; index < title.length; index++) {
		let el = title[index];
		let txt = el.innerHTML;
		let txt_words = txt.replace('  ', ' ').split(' ');
		let new_title = '';
		for (let index = 0; index < txt_words.length; index++) {
			let txt_word = txt_words[index];
			let len = txt_word.length;
			new_title = new_title + '<p>';
			for (let index = 0; index < len; index++) {
				let it = txt_word.substr(index, 1);
				if (it == ' ') {
					it = '&nbsp;';
				}
				new_title = new_title + '<span>' + it + '</span>';
			}
			el.innerHTML = new_title;
			new_title = new_title + '&nbsp;</p>';
		}
	}
}

// SearchInList
function search_in_list(input) {
	let ul = input.parentNode.querySelector('ul')
	let li = ul.querySelectorAll('li');
	let filter = input.value.toUpperCase();

	for (i = 0; i < li.length; i++) {
		let el = li[i];
		let item = el;
		txtValue = item.textContent || item.innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			el.style.display = "";
		} else {
			el.style.display = "none";
		}
	}
}

// DigiFormat
function digi(str) {
	var r = str.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
	return r;
}

// DiGiAnimate
function digi_animate(digi_animate) {
	if (digi_animate.length > 0) {
		for (let index = 0; index < digi_animate.length; index++) {
			const el = digi_animate[index];
			const el_to = parseInt(el.innerHTML.replace(' ', ''));
			if (!el.classList.contains('_done')) {
				digi_animate_value(el, 0, el_to, 1500);
			}
		}
	}
}
function digi_animate_value(el, start, end, duration) {
	var obj = el;
	var range = end - start;
	// no timer shorter than 50ms (not really visible any way)
	var minTimer = 50;
	// calc step time to show all interediate values
	var stepTime = Math.abs(Math.floor(duration / range));

	// never go below minTimer
	stepTime = Math.max(stepTime, minTimer);

	// get current time and calculate desired end time
	var startTime = new Date().getTime();
	var endTime = startTime + duration;
	var timer;

	function run() {
		var now = new Date().getTime();
		var remaining = Math.max((endTime - now) / duration, 0);
		var value = Math.round(end - (remaining * range));
		obj.innerHTML = digi(value);
		if (value == end) {
			clearInterval(timer);
		}
	}

	timer = setInterval(run, stepTime);
	run();

	el.classList.add('_done');
}

// Popups
let popup_link = document.querySelectorAll('._popup-link');
let popups = document.querySelectorAll('.popup');
for (let index = 0; index < popup_link.length; index++) {
	const el = popup_link[index];
	el.addEventListener('click', function (e) {
		if (unlock) {
			let item = el.getAttribute('href').replace('#', '');
			let video = el.getAttribute('data-video');
			popup_open(item, video);
		}
		e.preventDefault();
	})
}
for (let index = 0; index < popups.length; index++) {
	const popup = popups[index];
	popup.addEventListener("click", function (e) {
		if (!e.target.closest('.popup__body')) {
			popup_close(e.target.closest('.popup'));
		}
	});
}
function popup_open(item, video = '') {
	let activePopup = document.querySelectorAll('.popup._active');
	if (activePopup.length > 0) {
		popup_close('', false);
	}
	let curent_popup = document.querySelector('.popup_' + item);
	if (curent_popup && unlock) {
		if (video != '' && video != null) {
			let popup_video = document.querySelector('.popup_video');
			popup_video.querySelector('.popup__video').innerHTML = '<iframe src="https://www.youtube.com/embed/' + video + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>';
		}
		if (!document.querySelector('.menu__body._active')) {
			body_lock_add(500);
		}
		curent_popup.classList.add('_active');
		history.pushState('', '', '#' + item);
	}
}
function popup_close(item, bodyUnlock = true) {
	if (unlock) {
		if (!item) {
			for (let index = 0; index < popups.length; index++) {
				const popup = popups[index];
				let video = popup.querySelector('.popup__video');
				if (video) {
					video.innerHTML = '';
				}
				popup.classList.remove('_active');
			}
		} else {
			let video = item.querySelector('.popup__video');
			if (video) {
				video.innerHTML = '';
			}
			item.classList.remove('_active');
		}
		if (!document.querySelector('.menu__body._active') && bodyUnlock) {
			body_lock_remove(500);
		}
		history.pushState('', '', window.location.href.split('#')[0]);
	}
}
let popup_close_icon = document.querySelectorAll('.popup__close,._popup-close');
if (popup_close_icon) {
	for (let index = 0; index < popup_close_icon.length; index++) {
		const el = popup_close_icon[index];
		el.addEventListener('click', function () {
			popup_close(el.closest('.popup'));
		})
	}
}
document.addEventListener('keydown', function (e) {
	if (e.which == 27) {
		popup_close();
	}
});

//SlideToggle
let _slideUp = (target, duration = 500) => {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout(() => {
		target.style.display = 'none';
		target.style.removeProperty('height');
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideDown = (target, duration = 500) => {
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;
	if (display === 'none')
		display = 'block';

	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout(() => {
		target.style.removeProperty('height');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideToggle = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (window.getComputedStyle(target).display === 'none') {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}
}

// Wrap
function _wrap(el, wrapper) {
	el.parentNode.insertBefore(wrapper, el);
	wrapper.appendChild(el);
}

//RemoveClasses
function _removeClasses(el, class_name) {
	for (var i = 0; i < el.length; i++) {
		el[i].classList.remove(class_name);
	}
}

//IsHidden
function _is_hidden(el) {
	return (el.offsetParent === null)
}

//email_test
function email_test(input) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}