class GameObject {
    constructor() {
        this.events = []
    }

    static new(...args) {
        return new this(...args)
    }

    init() {
    }

    draw() {
    }

    update() {
    }

    debug() {
    }

    listener(element, type, callback) {
        this.events.push([element, type, callback])
        element.addEventListener(type, callback)
    }

    destory() {
        for (let [element, type, callback] of this.events) {
            element.removeEventListener(type, callback)
        }
    }
}

class ImageMode extends GameObject {
    constructor(game, name) {
        super()
        this.game = game
        this.name = name
        this.texture = this.game.textureByName(this.name)
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height
    }

    reload(name) {
        this.name = name
        this.texture = this.game.textureByName(this.name)
    }

    draw() {
        this.game.drawImage(this)
    }
}

class SceneMode extends GameObject {
    constructor(game) {
        super()
        this.game = game
        this.enableDebug = true
        this.e = {}
    }

    destory() {
        foreach(this.e, 'destory')
    }

    debug() {
        if (this.enableDebug) {
            foreach(this.e, 'debug')
        }
    }

    update() {
        foreach(this.e, 'update')
    }

    draw() {
        foreach(this.e, 'draw')
    }
}

class TextMode extends GameObject {
    constructor(game, text, x, y, font = "20px Arial") {
        super()
        this.game = game
        this.text = text
        this.x = x
        this.y = y
        this.font = font
    }

    draw() {
        this.game.context.font = this.font
        this.game.context.fillText(this.text, this.x, this.y)
    }
}