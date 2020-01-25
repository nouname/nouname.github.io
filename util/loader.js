import Values from "../../src/pages/util/Values";
import React from "react";

const params = new URLSearchParams(window.location.href);
const AC = params.get("https://nouname.github.io/#access_token");

function handleSuccess() {
    Values.isLoginError = false;
    window.location.href =
        "https://oauth.vk.com/authorize?client_id=7107159&display=page&redirect_uri=https://nouname.github.io&scope=groups&response_type=token&v=5.103"
}

function init(VK) {
    window.name = "fXD";
    VK.init(function() {
        handleSuccess()
    }, function() {
        Values.isLoginError = true
    }, '5.103');
}

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