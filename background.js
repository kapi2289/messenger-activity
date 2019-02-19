function onPull(data) {
    let filter = browser.webRequest.filterResponseData(data.requestId);
    let decoder = new TextDecoder("utf-8");
    let encoder = new TextEncoder();

    let str = "";

    filter.ondata = function(event) {
        str += decoder.decode(event.data, {stream: true});
    }

    filter.onstop = function(event) {
        console.debug(str);
        let json = JSON.parse(str.substr(str.search('{')));

        if(json.ms) {
            json.ms.forEach(function(m) {
                if(m.type === "t_tp") browser.tabs.sendMessage(data.tabId, m);
            });
        }

        filter.write(encoder.encode(str));
        filter.disconnect();
    }
}

browser.webRequest.onBeforeRequest.addListener(
    onPull,
    {urls: ["*://*.facebook.com/pull*", "*://*.messenger.com/pull*"]},
    ["blocking"]
);
