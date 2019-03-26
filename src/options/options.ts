import * as $ from 'jquery'
import defaults from '../defaults'
import ChangeEvent = JQuery.ChangeEvent;
import Event = JQuery.Event;

async function saveOptions(e: ChangeEvent) {
    await browser.storage.sync.set({
        // showNotifications: $("#show-notifications")[0].checked,
        borderColor: $("#border-color").val()
    });
    e.preventDefault();
}

function restoreOptions(e: Event) {
    browser.storage.sync.get(['showNotifications', 'borderColor']).then((res) => {
        // $("#show-notifications")[0].checked = res.showNotifications || defaults.showNotifications;
        $("#border-color").val(res.borderColor as string || defaults.borderColor);
    });
}

$(document).on("ready", restoreOptions);
$('input').on("change", saveOptions);
