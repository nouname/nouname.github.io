function loadFeed(VK) {
    VK.api("newsfeed.get", {"v": "5.73"}, function (data) {
        console.log(data)
    })
}

function setDataToView(data, viewId) {
    document.getElementById(viewId).innerHTML = data;
}