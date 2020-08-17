class Game extends GameObject {
    constructor(fps) {
        super()
        this.fps = fps
        this.images = images
        this.enableDebug = globalDebug
        this.scene = null
        this.actions = {}
        this.keydowns = {}
        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')
        window.addEventListener('keydown', event => {
            this.keydowns[event.key] = true
        })
        window.addEventListener('keyup', event => {
            this.keydowns[event.key] = false
        })
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

    //
    registerAction(key, callback) {
        this.actions[key] = callback
    }

    runloop() {
        for (let key of Object.keys(this.actions)) {
            if (this.keydowns[key]) {
                this.actions[key]()
            }
        }

        // update
        this.update()
        // debug
        this.debug()
        // clear
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        // draw
        this.draw()

        // next run loop
        setTimeout(() => {
            this.runloop()
        }, 1000 / this.fps)
    }

    textureByName(name) {
        // log('image by name', this.images)
        return this.images[name]
    }

    runWithScene(scene) {
        this.scene = scene.new(this)
        // 开始运行程序
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

    init() {
        let loads = 0
        // 预先载入所有图片
        let names = Object.keys(this.images)
        log('images', this.images)
        for (let key of names) {
            let path = this.images[key]
            let img = imageFromPath(path)
            // 存入 this.images 中
            img.onload = () => {
                log(img)
                this.images[key] = img
                // 所有图片都成功载入之后, 调用 run
                loads++
                if (loads === names.length) {
                    log('load images', this.images)
                    this.start()
                }
            }
        }
    }
}
