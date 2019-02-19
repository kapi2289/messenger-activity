var cache = {};
var current = null;

function refresh() {
    let profile_image = document.querySelector('#js_b ._4ld-');
    if(cache[current]) {
        profile_image.classList.add("in_thread");
    } else {
        profile_image.classList.remove("in_thread");
    }
}

browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.type == "msg") {
        cache[request.data.from] = (request.data.st === 9);
        refresh();
    } else if(request.type == "enter") {
        current = request.data.id;
    } else if(request.type == "refresh") {
        refresh();
    }
});
