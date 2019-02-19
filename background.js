function onPull(data) {
    let filter = browser.webRequest.filterResponseData(data.requestId);
    let decoder = new TextDecoder("utf-8");

    filter.ondata = function(event) {
        let str = decoder.decode(event.data, {stream: true});
        let json = JSON.parse(str.substr(str.search('{')));
        browser.tabs.sendMessage(data.tabId, json);

        filter.write(event.data);
        filter.disconnect();
    }
}

browser.webRequest.onBeforeRequest.addListener(
    onPull,
    {urls: ["*://*.facebook.com/pull*", "*://*.messenger.com/pull*"]},
    ["blocking"]
);
