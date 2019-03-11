import $ from 'jquery'
import defaults from '../defaults'

function saveOptions(e) {
    browser.storage.sync.set({
        showNotifications: $("#show-notifications")[0].checked,
        borderColor: $("#border-color").val()
    })
    e.preventDefault()
}

function restoreOptions() {
    browser.storage.sync.get(['showNotifications', 'borderColor']).then(res => {
        $("#show-notifications")[0].checked = res.showNotifications || defaults.showNotifications
        $("#border-color").val(res.borderColor || defaults.borderColor)
    })
}

$(document).ready(restoreOptions)
$('form').submit(saveOptions)
