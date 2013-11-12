'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
    console.log('previousVersion', details.previousVersion);
});

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-30732295-1']);

(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = 'https://ssl.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

var tryTrack = function(category, action, label, value) {
	try {
		return _gaq.push(['_trackEvent', category.toString(), action.toString(), label.toString(), value]);
	} catch(err) {
		console.log(err);
	}
};

var openNewTabNoFocus = function(link) {
    chrome.tabs.create({
        url: link,
        active: false
    });
    return true;
};

chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse) {
		console.log(sender.tab ?
			'from a content script:' + sender.tab.url :
			'from the extension');
		if (request.mStorage != undefined)
			sendResponse(localStorage[request.mStorage]);
		else if (request.category != undefined && request.action != undefined && request.label != undefined && request.value != undefined) {
			tryTrack(request.category, request.action, request.label, request.value);
		} else if (request.link != undefined) {
            sendResponse(openNewTabNoFocus(request.link));
        }
});

window.onload = function() {
	if (localStorage.getItem('install_time')) {
		return;
	}
	
	// Primo avvio
	var now = new Date().getTime();
    localStorage.setItem('install_time', now);
	// Apre la pagina delle opzioni in una nuova tab
    chrome.tabs.create({url: '../options.html'});
	var t = tryTrack('Stats', 'Install', now, 1);
	console.log('Italiansubs++ installato con codice ' + t);
};