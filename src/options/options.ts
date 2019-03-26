import * as $ from 'jquery'
import defaults from '../defaults'
import Event = JQuery.Event;

async function saveOptions(e: Event) {
    await browser.storage.sync.set({
        // showNotifications: $("#show-notifications")[0].checked,
        borderColor: $("#border-color").val()
    });
    e.preventDefault();
}

function restoreOptions() {
    browser.storage.sync.get(['showNotifications', 'borderColor']).then((res) => {
        // $("#show-notifications")[0].checked = res.showNotifications || defaults.showNotifications;
        $("#border-color").val(res.borderColor as string || defaults.borderColor);
    });
}

$(restoreOptions);
$('input').on("change", saveOptions);
