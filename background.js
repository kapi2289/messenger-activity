function onPull(data) {
    let filter = browser.webRequest.filterResponseData(data.requestId);
    let decoder = new TextDecoder("utf-8");

    filter.ondata = function(event) {
        let json = JSON.parse(decoder.decode(event.data, {stream: true}).split("for (;;);")[1]);
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
