browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request);
});
