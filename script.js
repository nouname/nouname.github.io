const m = Math.pow(2, 24)
const inputErr = "Ошибка ввода"
const connErr = "Не удалось проверить скорость соединения! Модуль может работать некорректно."
const argErr = {
    "noErr": 0,
    "aLessMErr": 1,
    "bLessMErr": 2,
    "bModMErr": 3,
    "aMod4Err": 4,
    "bmGcdErr": 5,
    "c0LessMErr": 6
}
var c0 = rand(), a = rand(), b = rand(), area = 0

init()

// Получает параметры
function init(err = [argErr.noErr]) {
    console.log(c0, a, b, m)
    for (var e in err) {
        switch (e) {
            case argErr.bLessMErr:
            case argErr.bModMErr:
            case argErr.bmGcdErr:
                b = rand()
                break
            case argErr.aLessMErr:
            case argErr.aMod4Err:
                a = rand()
                break
            case argErr.c0LessMErr:
                c0 = rand()
                break
            case argErr.noErr:
                break
            default:
                break
        }
    }
}

// ГПСЧ
function prng() {
    while (!checkArgs())
        init()
    c0 = (BigInt(a) * BigInt(c0) + BigInt(b)) % BigInt(m)
    return c0
}

// Множество ПСЧ
function prngSet(range) {
     while (!checkArgs())
        init()
    var data = []
    data.push(c0)
    for (var i = 0; i < range; i++) {
        data.push(prng())
        c0 = data[i]
    }

    text = ""
    for (var item in data) {
        text += item + "\n"
    }
    return text
}

// Получает ПСЧ на основе скорости соединения и/или
// площади прямоугольника, правый верний угол которого - координаты курсора
function rand() {
    console.log("cs:", cs())
    console.log("cp:", cp())
    return cs() + cp()
}

// Скорость соединения
function cs() {
    var speed = 0
    var img = "https://nouname.github.io/img.png"
    var dlSize = 1525

    function conn() {
        var startTime, endTime
        var download = new Image()
        download.onload = function () {
            endTime = (new Date()).getTime()
            done()
        }
        download.onerror = function (err, msg) {
            alert(connErr)
        }
        startTime = (new Date()).getTime()
        var cache = "?nnn=" + startTime
        download.src = img + cache

        function done() {
            var duration = (endTime - startTime) / 1000
            var loaded = dlSize * 8
            speed = (loaded / duration).toFixed(2)
        }
    }
    return speed
}

// Область курсора
function cp() {
    return area
}

// Позиция курсора
window.addEventListener('mousemove', e => {
    var rightTop = point(e.clientX, e.clientY)
    var leftTop = point(0, e.clientY)
    var leftBottom = point(0, 0)
    var a = length(leftTop, rightTop)
    var b = length(leftBottom, leftTop)
    area = a * b
})

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
    while (y !== 0) y = x % (x = y)
    return x
}

// Проверяет параметры
function checkArgs() {
    var arr = []
    if (b % 2 === 0)
        arr.push(argErr.bModMErr)
    else if (gcd(b, m) !== 1)
        arr.push(argErr.bmGcdErr)
    else if (a % 4 !== 1)
        arr.push(argErr.aMod4Err)
    else if (a >= m)
        arr.push(argErr.aLessMErr)
    else if (b >= m)
        arr.push(argErr.bLessMErr)
    else if (c0 >= m)
        arr.push(argErr.c0LessMErr)
    if (arr.length > 0)
        return arr
    return [argErr.noErr]
}

// Записывает новое число в поле
function getNewNum() {
    document.getElementById("num").value = prng()
}

// Записывает множество чисел в поле
function getNums() {
    len = parseInt(document.getElementById("len").value)
    if (!Number.isInteger(len) || len < 1) {
        document.getElementById("set").value = inputErr
        return
    }
    document.getElementById("set").innerText = prngSet(len)
}
