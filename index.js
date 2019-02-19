var cache = {};

browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.debug(request);
    cache[request.from] = (request.st === 9);
    console.debug(cache);
});
