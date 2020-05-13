// Ошибки времени выполнения
const rtErr = {
    "inputErr": "Ошибка ввода",
    "connErr": "Не удалось проверить скорость соединения! Модуль может работать некорректно.",
    "calcErr": "Ошибка при расчете значений"
}

// Ошибки аргументов
const argErr = {
    "noErr": 0,
    "aLessMErr": 1,
    "bLessMErr": 2,
    "bMod2Err": 3,
    "aMod4Err": 4,
    "bmGcdErr": 5,
    "c0LessMErr": 6
}

// Аргументы
let area = 0, speed = 0, ind = 0, c = [0], a = 0, b = 0, m = Math.pow(2, 24)

// Получает параметры
async function init() {
    a = rand(), b = rand()
    var err = checkArgs()
    if (err === argErr.noErr)
        return true
    switch (err) {
        case argErr.bLessMErr:
        case argErr.bMod2Err:
        case argErr.bmGcdErr:
            b = rand()
        case argErr.aLessMErr:
        case argErr.aMod4Err:
            a = rand()
        case argErr.c0LessMErr:
            c[ind - 1] = rand()
            break
        default:
            break
    }
    console.log(err, a, b, c, ind)
    return false
}

// ГПСЧ
function prng() {
    if (!init())
        return rtErr.calcErr

    ind++
    c[ind] = (a * c[ind - 1] + b) % m
    return c[ind]
}

// Множество ПСЧ
function prngSet(range) {
    if (!init())
        return rtErr.calcErr

    text = ""
    var data = []
    data.push(c[ind])
    for (var i = 0; i < range - 1; i++) {
        data.push(prng())
        c[ind] = data[i]
    }
    for (i = 0; i < data.length; i++)
        text += data[i] + "\n"
    return text
}

// Получает ПСЧ на основе скорости соединения и/или
// площади прямоугольника, правый верний угол которого - координаты курсора
function rand() {
    return parseInt((cs() + cp()) / 10000).toFixed(0)
}

window.addEventListener('mousedown', mouse, false)
window.addEventListener('load', conn, false)

// Скорость соединения
function cs() {
    return speed
}

// Соединение
function conn() {
    var img = "https://nouname.github.io/img.png"
    var dlSize = 1525
    var startTime, endTime
    var download = new Image()

    download.onload = function () {
        endTime = (new Date()).getTime()
        done()
    }
    download.onerror = function (err, msg) {
        alert(rtErr.connErr)
    }
    startTime = (new Date()).getTime()
    var cache = "?nnn=" + startTime
    download.src = img + cache

    function done() {
        var duration = (endTime - startTime) / 1000
        var loaded = dlSize * 8
        speed = (loaded / duration).toFixed(0)
    }
}

// Область курсора
function cp() {
    return area
}

// Позиция курсора
function mouse(e) {
    var rightTop = point(e.clientX, e.clientY)
    var leftTop = point(0, e.clientY)
    var leftBottom = point(0, 0)
    var a = length(leftTop, rightTop)
    var b = length(leftBottom, leftTop)
    area = (a * b).toFixed(0)
}

// Длина отрезка
function length(p0, p1) {
    return Math.sqrt((p1.x - p0.x) * (p1.x - p0.x) + (p1.y - p0.y) * (p1.y - p0.y))
}

// Точка
function point(x, y) {
    return {"x": x, "y": y}
}

// НОД
function gcd(x, y) {
    if (!y)
        return x
    return gcd(y, x % y)
}

// Проверяет параметры
function checkArgs() {
    var arr = []
    if (b % 2 === 0)
        return argErr.bMod2Err
    else if (gcd(b, m) !== 1)
        return argErr.bmGcdErr
    else if (a % 4 !== 1)
        return argErr.aMod4Err
    else if (a >= m)
        return argErr.aLessMErr
    else if (b >= m)
        return argErr.bLessMErr
    else if (c[0] >= m)
        return argErr.c0LessMErr
    return argErr.noErr
}

// Записывает новое число в поле
function getNewNum() {
    document.getElementById("num").value = prng()
}

// Записывает множество чисел в поле
function getNums() {
    len = parseInt(document.getElementById("len").value)
    if (!Number.isInteger(len) || len < 1) {
        document.getElementById("set").value = rtErr.inputErr
        return
    }
    document.getElementById("set").value = prngSet(len)
}
