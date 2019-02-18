function onPull(request) {
    //
}

browser.webRequest.onHeadersReceived.addListener(
    onPull,
    {urls: ["*://*.facebook.com/pull*", "*://*.messenger.com/pull*"]}
);
