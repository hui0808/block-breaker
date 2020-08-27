class Game extends GameObject {
    constructor(fps) {
        super()
        this.fps = fps
        this.images = images
        this.enableDebug = globalDebug
        this.scene = null
        this.pause = false
        this.actions = {}
        this.keydowns = {}
        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')
        this.listener(window, 'keydown', event => this.keydowns[event.key] = true)
        this.listener(window, 'keyup', event => this.keydowns[event.key] = false)
        this.init()
    }

    start() {
        this.runWithScene(SceneStart)
    }

    drawImage(img) {
        this.context.drawImage(img.texture, img.x, img.y)
    }

    update() {
        this.scene.update()
    }

    draw() {
        this.scene.draw()
    }

    debug() {
        if (this.enableDebug) {
            this.scene.debug()
            this.fps = config.fps.value

            if (!this.one) {
                slider_debug()
                this.one = true
            }
        }
    }

    registerAction(key, callback) {
        this.actions[key] = callback
    }

    handelEvent() {
        for (let key of Object.keys(this.actions)) {
            if (this.keydowns[key]) {
                this.actions[key]()
            }
        }
    }

    runloop() {
        this.handelEvent()
        if (!this.pause) {
            this.update()
            this.debug()
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.draw()
        }
        setTimeout(() => {
            this.runloop()
        }, 1000 / this.fps)
    }

    textureByName(name) {
        return this.images[name]
    }

    runWithScene(scene) {
        this.scene = scene.new(this)
        setTimeout(() => {
            this.runloop()
        }, 1000 / this.fps)
    }

    replaceScene(scene, callback) {
        this.actions = {}
        this.keydowns = {}
        let s = scene.new(this)
        callback && callback(s)
        this.scene.destory()
        delete this.scene
        this.scene = s
    }

    preload(callback) {
        let loads = 0
        let names = Object.keys(this.images)
        log('images', this.images)
        if (names.length === 0) callback && callback()
        for (let key of names) {
            let path = this.images[key]
            let img = imageFromPath(path)
            img.onload = () => {
                log(img)
                this.images[key] = img
                loads++
                if (loads === names.length) {
                    log('load images', this.images)
                    callback && callback()
                }
            }
        }
    }

    init() {
        this.preload(() => this.start())
    }
}
