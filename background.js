function onPull(request) {
    let filter = browser.webRequest.filterResponseData(request.requestId);
    let decoder = new TextDecoder("utf-8");
    let encoder = new TextEncoder();

    let str = "";

    filter.ondata = function(event) {
        str += decoder.decode(event.data, {stream: true});
    }

    filter.onstop = function(event) {
        let json = JSON.parse(str.substr(str.search('{')));

        if(json.ms) {
            json.ms.forEach(function(m) {
                if(m.type === "t_tp") browser.tabs.sendMessage(request.tabId, {type: "msg", data: m});
            });
        }

        filter.write(encoder.encode(str));
        filter.disconnect();
    }
}

function onGraphQLBatch(request) {
    let decoder = new TextDecoder("utf-8");

    let formData = decoder.decode(request.requestBody.raw[0].bytes, {stream: true});
    let data = new URLSearchParams(formData);
    let query = JSON.parse(data.get("queries"));
    let o = query.o0;

    if(o.doc_id == "2289069757800221") {
        browser.tabs.sendMessage(request.tabId, {type: "enter", data: {id: o.query_params.threadFBID}});
    }
}

function onRefreshData(request) {
    browser.tabs.sendMessage(request.tabId, {type: "refresh"});
}

browser.webRequest.onBeforeRequest.addListener(
    onPull,
    {urls: ["*://*.facebook.com/pull*", "*://*.messenger.com/pull*"]},
    ["blocking"]
);

browser.webRequest.onBeforeRequest.addListener(
    onGraphQLBatch,
    {urls: ["*://*.facebook.com/api/graphqlbatch*", "*://*.messenger.com/api/graphqlbatch*"]},
    ["requestBody"]
);

browser.webRequest.onCompleted.addListener(
    onRefreshData,
    {urls: ["*://*.facebook.com/api/graphqlbatch*", "*://*.messenger.com/api/graphqlbatch*"]}
);
