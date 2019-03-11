import $ from 'jquery'
import defaults from '../defaults';

var cache = {}
var current = null

function refresh() {
    const className = "in_thread"
    let profileImage = $('._3tkv ._4ld-')

    if(cache[current]) {
        browser.storage.sync.get('borderColor').then(res => {
            profileImage.css('border-color', res.borderColor || defaults.borderColor)
        })
    } else {
        profileImage.css('border-color', '')
    }
}

function onMessage(data) {
    cache[data.from] = (data.st === 9)
    refresh()
}

function onEnter(data) { current = data.id }

function onRefresh() { refresh() }

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.type == "msg") onMessage(request.data)
    else if(request.type == "enter") onEnter(request.data)
    else if(request.type == "refresh") onRefresh()
})
