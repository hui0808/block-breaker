const e = sel => document.querySelector(sel)
const es = sel => document.querySelectorAll(sel)

const log = console.log.bind(console)

const imageFromPath = function (path) {
    let img = new Image()
    img.src = path
    return img
}

const loadLevel = function (game, n) {
    n--
    let level = levels[n]
    let blocks = []
    for (let i = 0; i < level.length; i++) {
        let p = level[i]
        let b = Block.new(game, p, 'block')
        blocks.push(b)
    }
    return blocks
}

const aInb = function (x, x1, x2) {
    return x >= x1 && x <= x2
}

const rectIntersects = function (a, b) {
    if (aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
        if (aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
            if (aInb(a.y, b.y, b.y + b.h) && aInb(a.y + a.h, b.y, b.y + b.h)) {
                return 2
            } else {
                return 1
            }
        }
    }
    return 0
}

const bindAll = function (sel, eventName, callback) {
    let e = es(sel)
    for (let i = 0; i < e.length; i++) {
        let input = e[i]
        input.addEventListener(eventName, function (event) {
            callback(event)
        })
    }
}

const templaterender = function (name, item) {
    return `
            <div>
                <label>
                    <input class="range_value" type="range" value="${item.value}" data-value="config.${name}" min="${item.min}" max="${item.max}">
                    ${item.text}<span class="display-label">${item.value}</span>
                </label>
            </div>
        `
}

const slider_debug = function () {
    let div = e(".debug")

    for (let key of Object.keys(config)) {
        let item = config[key]
        log(div, key, item)
        let html = templaterender(key, item)
        div.insertAdjacentHTML('beforeend', html)
    }

    bindAll('.range_value', 'input', function (event) {
        let target = event.target
        let value = target.value
        let bindVar = target.dataset.value
        eval(bindVar + '.value =' + value)
        let label = target.closest('label').querySelector('.display-label')
        label.innerText = value
    })
}

const forcount = function(iterator, count, callback) {
    const iter = function(iterator, count, key, last) {
        if (count === 0) {
            callback && callback(iterator, key, last)
        } else {
            for (let index of Object.keys(iterator)) {
                iter(iterator[index], count - 1, index, iterator)
            }
        }
    }
    iter(iterator, count)
}

const foreach = function(iterator, attribute, callback) {
    const iter = function(iterator, key, last) {
        if (iterator[attribute]) {
            iterator[attribute]()
            callback && callback(iterator, key, last)
        } else {
            for (let key of Object.keys(iterator)) {
                iter(iterator[key], key, iterator)
            }
        }
    }
    iter(iterator)
}


const save_json = function(json, name) {
    let elementA = document.createElement('a')
    elementA.setAttribute('href', 'data:text/plain;charset=utf-8,' + JSON.stringify(json))
    elementA.setAttribute('download', name)
    elementA.style.display = 'none'
    document.body.appendChild(elementA)
    elementA.click()
    document.body.removeChild(elementA)
}
