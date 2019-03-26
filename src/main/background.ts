import {decodeResponse, encodeResponse, getUrlParam, IFacebookActivityResponse, parseJSON} from "../utils";
import UploadData = browser.webRequest.UploadData;

function onPull(request: { tabId: number, requestId: string }) {
    const filter = browser.webRequest.filterResponseData(request.requestId);
    let responseString = "";

    filter.ondata = (event) => {
        responseString += decodeResponse(event.data);
    };

    filter.onstop = () => {
        const response = parseJSON(responseString);

        if (response.ms) {
            response.ms.forEach(async (m: IFacebookActivityResponse) => {
                if (m.type === "t_tp") {
                    await browser.tabs.sendMessage(request.tabId, {type: "msg", data: m});
                }
            });
        }

        filter.write(encodeResponse(responseString));
        filter.disconnect();
    };
}

async function onGraphQLBatch(request: { tabId: number, requestBody?: { raw?: UploadData[] } }) {
    const formData = decodeResponse(request.requestBody.raw[0].bytes);
    const o = parseJSON(getUrlParam(formData, "queries")).o0;

    if (["1777357372370450", "2289069757800221", "2150199688342867"].includes(o.doc_id)) {
        await browser.tabs.sendMessage(request.tabId, {
            data: {id: o.query_params.threadFBID || o.query_params.id},
            type: "enter",
        });
    }
}

async function onRefreshData(request: { tabId: number }) {
    await browser.tabs.sendMessage(request.tabId, {type: "refresh"});
}

browser.webRequest.onBeforeRequest.addListener(
    onPull,
    {urls: ["*://*.facebook.com/pull*", "*://*.messenger.com/pull*"]},
    ["blocking"],
);

browser.webRequest.onBeforeRequest.addListener(
    onGraphQLBatch,
    {urls: ["*://*.facebook.com/api/graphqlbatch*", "*://*.messenger.com/api/graphqlbatch*"]},
    ["requestBody"],
);

browser.webRequest.onCompleted.addListener(
    onRefreshData,
    {urls: ["*://*.facebook.com/api/graphqlbatch*", "*://*.messenger.com/api/graphqlbatch*"]},
);
