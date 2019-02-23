import { parseJSON, decodeResponse, encodeResponse, getUrlParam } from '../utils'

function onPull(request) {
    let filter = browser.webRequest.filterResponseData(request.requestId)
    let response_str = ""

    filter.ondata = event => { response_str += decodeResponse(event.data) }

    filter.onstop = () => {
        let response = parseJSON(response_str)

        if(response.ms) {
            response.ms.forEach(function(m) {
                if(m.type === "t_tp") browser.tabs.sendMessage(request.tabId, {type: "msg", data: m})
            })
        }

        filter.write(encodeResponse(response_str))
        filter.disconnect()
    }
}

function onGraphQLBatch(request) {
    let formData = decodeResponse(request.requestBody.raw[0].bytes)
    let o = parseJSON(getUrlParam(formData, "queries")).o0

    if(["1777357372370450", "2289069757800221", "2150199688342867"].includes(o.doc_id)) {
        browser.tabs.sendMessage(request.tabId, {type: "enter", data: {id: o.query_params.threadFBID || o.query_params.id}})
    }
}

function onRefreshData(request) {
    browser.tabs.sendMessage(request.tabId, {type: "refresh"})
}

browser.webRequest.onBeforeRequest.addListener(
    onPull,
    {urls: ["*://*.facebook.com/pull*", "*://*.messenger.com/pull*"]},
    ["blocking"]
)

browser.webRequest.onBeforeRequest.addListener(
    onGraphQLBatch,
    {urls: ["*://*.facebook.com/api/graphqlbatch*", "*://*.messenger.com/api/graphqlbatch*"]},
    ["requestBody"]
)

browser.webRequest.onCompleted.addListener(
    onRefreshData,
    {urls: ["*://*.facebook.com/api/graphqlbatch*", "*://*.messenger.com/api/graphqlbatch*"]}
)
