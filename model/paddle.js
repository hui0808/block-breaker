class Paddle extends ImageMode {
    constructor(game, name) {
        super(game, name)
        this.x = 100
        this.y = 280
        this.speed = 15
        this.enableDebug = true
    }

    move(x) {
        if (x < 0) {
            x = 0
        }
        if (x + this.w > 400) {
            x = 400 - this.w
        }
        this.x = x
    }

    moveLeft() {
        this.move(this.x - this.speed)
    }

    moveRight() {
        this.move(this.x + this.speed)
    }


    collide(ball) {
        // log('collide', ball)
        return rectIntersects(ball, this)
    }

    debug() {
        super.debug();
        if (this.enableDebug) {
            this.speed = config.paddle_speed.value
        }
    }
}
