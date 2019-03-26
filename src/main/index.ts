import * as $ from "jquery";
import defaults from "../defaults";
import {elementToUserId, IFacebookActivityResponse, timestamp} from "../utils";

const cache: { [x: string]: number | undefined } = {};
let current: string | undefined;

const timeout = 30000; // milliseconds

function isValid(ts: number) {
    return timestamp() < ts + timeout;
}

function refresh() {
    if (!cache[current]) {
        current = elementToUserId($("li._5l-3._1ht1._23_m div._5l-3._1ht5"));
    }

    const profileImage = $("._3tkv ._4ld-");

    if (cache[current] && isValid(cache[current])) {
        browser.storage.sync.get("borderColor").then((res) => {
            profileImage.css("border-color", res.borderColor as string || defaults.borderColor);
        });
    } else {
        profileImage.css("border-color", "");
    }
}

function onMessage(data: { from: string, st: number }) {
    cache[data.from] = data.st === 9 || data.st === 1 ? timestamp() : undefined;
    refresh();
}

function onEnter(data: { id: string }) {
    current = data.id;
    refresh();
}

function onRefresh() {
    refresh();
}

$(document).on("click", "li._5l-3._1ht1", (e: JQuery.ClickEvent) => {
    const target = $(e.target).parents("div._5l-3._1ht5");
    const id = elementToUserId(target);
    onEnter({id});
});

browser.runtime.onMessage.addListener((request: { type: string, data: IFacebookActivityResponse | { id: string } }) => {
    if (request.type === "msg") {
        onMessage(request.data as IFacebookActivityResponse);
    } else if (request.type === "enter") {
        onEnter(request.data as { id: string });
    } else if (request.type === "refresh") {
        onRefresh();
    }
});
