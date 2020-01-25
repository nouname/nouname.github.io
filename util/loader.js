const params = new URLSearchParams(window.location.href);
const AC = params.get("https://nouname.github.io/#access_token");

function loadFeed(VK) {
    if (AC == null)
        return
    VK.api("newsfeed.get", {"v": "5.73"}, function (data) {
        console.log(data)
    })
}

function setDataToView(data, viewId) {
    if (AC == null)
        return
    document.getElementById(viewId).innerHTML = data;
}