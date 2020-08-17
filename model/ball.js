class Ball extends ImageMode {
    constructor(game, name) {
        super(game, name)
        this.x = 100
        this.y = 200
        this.directionX = 1
        this.directionY = 1
        this.speedX = 5
        this.speedY = 5
        this.fired = false
        this.enableDrag = false
        this.enableDebug = true
    }

    debug() {
        super.debug()
        if (this.enableDebug) {
            this.speedX = config.ball_speedX.value
            this.speedY = config.ball_speedY.value
            if (!this.one) {
                this.listener(this.game.canvas, 'mousedown', event => {
                    let x = event.offsetX;
                    let y = event.offsetY;
                    log('x:', x, 'y:', y, event)
                    // 检查是否点中了 ball
                    if (this.hasPoint(x, y)) {
                        // 设置拖拽状态
                        log('enableDrag', this.enableDrag)
                        this.enableDrag = true
                    }
                })
                this.listener(this.game.canvas, 'mousemove', event => {
                    let x = event.offsetX;
                    let y = event.offsetY;
                    if (this.enableDrag) {
                        log('x:', x, 'y:', y, 'drag')
                        this.x = x
                        this.y = y
                    }
                })
                this.listener(this.game.canvas, 'mouseup', event => {
                    let x = event.offsetX;
                    let y = event.offsetY;
                    log('x:', x, 'y:', y, 'up')
                    this.enableDrag = false
                })
                this.one = true
            }
        }
    }

    fire() {
        this.fired = true
    }

    move() {
        if (this.fired) {
            if (this.x < 0 || this.x > 400) {
                this.rebound_x()
            }
            if (this.y < 0 || this.y > 300) {
                this.rebound_y()
            }
            this.x += this.speedX * this.directionX
            this.y += this.speedY * this.directionY
        }
    }

    update() {
        this.move()
    }

    rebound_x() {
        this.directionX *= -1
    }

    rebound_y() {
        this.directionY *= -1
    }

    rebound(flag) {
        if (flag === 1) {
            this.rebound_y()
        } else {
            this.rebound_x()
        }
    }

    hasPoint(x, y) {
        let xIn = aInb(x, this.x, this.x + this.w)
        let yIn = aInb(y, this.y, this.y + this.h)
        return xIn && yIn
    }
}
