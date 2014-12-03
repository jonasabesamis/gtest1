/*
USAGE
<button onClick="onlinestatus()">CLICK ME</button>
*/

var onlinestatus = function(){
checkNetConnection();
}
			
function checkNetConnection(){
var xhr = new XMLHttpRequest();
var file = "http://www.designerdiscounted.com/include/dot.png";
var r = Math.round(Math.random() * 10000);
xhr.open('HEAD', file + "?subins=" + r, false);
try {
xhr.send();
if (xhr.status >= 200 && xhr.status < 304) {
alert('You are online');
return true;
} else {
alert('Offline');
return false;
}
} catch (e) {
alert('Offline');
return false;
}
}