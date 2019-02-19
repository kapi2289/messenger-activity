var cache = {};
var current = null;

browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.type == "msg") {
        cache[request.data.from] = (request.data.st === 9);
    } else if(request.type == "enter") {
        current = request.data.id;
    }

});
