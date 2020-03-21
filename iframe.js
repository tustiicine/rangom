/**
 * integer.js is a widget for RANDOM.ORG that webmasters
 * can use on their website to pull a true randomm integer
 * from RANDOM.ORG's http integer interface.
 *
 * @author		Bo Allen	http://www.boallen.com
 * @copyright	Mads Haahr	http://www.random.org
 *
 */
 
var xmlHttp, begin;
var times = 0;

function getTrueRandomInteger(min, max) {
	xmlHttp = GetXmlHttpObject()
	if (xmlHttp == null) {
		// AJAX not supported...
		return;
	} 

	// parameter check is done on the server side too, but we do it here as well to improve useability
	min = parseInt(min);
	max = parseInt(max);
	if (isNaN(min)) min = 1;
	if (isNaN(max)) max = 100;
	if (max <= min) max = min + 1;
	document.getElementById("true-random-integer-generator-min").value = min;
	document.getElementById("true-random-integer-generator-max").value = max;

	var url = "https://github.com/tustiicine/rangom/fake.php?times=" + times;

	begin = new Date().getTime();
	document.getElementById("true-random-integer-generator-result").innerHTML = '<img src="http://random.org/util/cp/images/ajax-loader.gif" alt="Loading..." />';

	xmlHttp.open("GET", url, true);
	xmlHttp.onreadystatechange = updateTrngDisplayAjax;
	xmlHttp.send(null);
	
	times = times + 1;
} 

function updateTrngDisplayAjax() {
	if (xmlHttp.readyState < 4) {
		document.getElementById("true-random-integer-generator-result").innerHTML = '<img src="http://random.org/util/cp/images/ajax-loader.gif" alt="Loading..." />';
	}
	if (xmlHttp.readyState == 4) { 
	    var waitremain = 600 - (new Date().getTime() - begin);
	    if (waitremain > 0) {
		setTimeout(printNumber, waitremain);
	    } else {
		printNumber();
	    }
	}
}

function printNumber() {
    var trngresponse = xmlHttp.responseText;
    document.getElementById("true-random-integer-generator-result").innerHTML = trngresponse;

}

function GetXmlHttpObject() {
	var xmlHttp=null;
	try {
		// Firefox, Opera 8.0+, Safari
		xmlHttp = new XMLHttpRequest();
	} catch (e) {
		// Internet Explorer
		try {
			xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	return xmlHttp;
}

function integerJsInputControl(keyp) {
	var unicode=keyp.charCode ? keyp.charCode : keyp.keyCode;
    if (unicode == 13) { // enter key runs widget
        getTrueRandomInteger(document.getElementById('true-random-integer-generator-min').value, document.getElementById('true-random-integer-generator-max').value);
        return true;
    }
	if (unicode != 8 && unicode != 9 && unicode != 45) { //allow backspace, tab, and minus
		if (unicode < 48 || unicode > 57) { //numeric only
			return false;
		} else {
			return true;
		}
	}
}	