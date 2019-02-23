function saveOptions(e) {
    browser.storage.sync.set({
        showNotifications: document.querySelector("#show-notifications").checked
    })
    e.preventDefault()
}

function restoreOptions() {
    let gettingItem = browser.storage.sync.get('showNotifications')
    gettingItem.then(res => {
        document.querySelector("#show-notifications").checked = res.showNotifications || false
    })
}

document.addEventListener('DOMContentLoaded', restoreOptions)
document.querySelector("form").addEventListener("submit", saveOptions)
