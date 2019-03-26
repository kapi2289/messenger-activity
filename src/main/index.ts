import * as $ from 'jquery'
import defaults from '../defaults';
import {IFacebookActivityResponse, timestamp} from '../utils';

let cache: { [x: string]: number | undefined } = {};
let current: string | undefined = undefined;

const timeout = 30000; // milliseconds

function isValid(ts: number) {
    return timestamp() < ts + timeout
}

function refresh() {
    let profileImage = $('._3tkv ._4ld-');

    if(cache[current] && isValid(cache[current])) {
        browser.storage.sync.get('borderColor').then((res) => {
            profileImage.css('border-color', res.borderColor as string || defaults.borderColor);
        })
    } else {
        profileImage.css('border-color', '');
    }
}

function onMessage(data: { from: string, st: number }) {
    cache[data.from] = data.st == 9 ? timestamp() : undefined;
    refresh();
}

function onEnter(data: { id: string }) {
    current = data.id;
}

function onRefresh() {
    refresh();
}

browser.runtime.onMessage.addListener((request: { type: string, data: IFacebookActivityResponse | { id: string } }) => {
    if (request.type == "msg") {
        onMessage(request.data as IFacebookActivityResponse);
    } else if (request.type == "enter") {
        onEnter(request.data as { id: string });
    } else if (request.type == "refresh") {
        onRefresh();
    }
});
