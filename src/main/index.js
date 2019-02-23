import $ from 'jquery'

var cache = {}
var current = null

function refresh() {
    const className = "in_thread"
    let profileImage = $('._3tkv ._4ld-')

    if(cache[current]) profileImage.addClass(className)
    else profileImage.removeClass(className)
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
