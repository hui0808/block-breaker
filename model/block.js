class Block extends ImageMode {
    constructor(game, position, name) {
        super(game, name)
        this.x = position[0]
        this.y = position[1]
        this.alive = true
        this.lifes = position[2] || 1
    }

    static new(game, position, name) {
        position[2] = position[2] || 1
        let n
        if (position[2] > 3) {
            n = name + 3
        } else {
            n = name + position[2]
        }
        return new this(game, position, n)
    }

    reload() {
        if (this.lifes >= 1) {
            this.alive = true
        }

        if (this.alive && this.lifes <= 3) {
            let n = this.name.substring(0, this.name.length - 1) + this.lifes
            super.reload(n)
        }
    }

    kill() {
        this.lifes--
        if (this.lifes < 1) {
            this.alive = false
        }
    }

    collide(ball) {
        return this.alive && rectIntersects(ball, this)
    }

    draw() {
        if (this.alive) {
            this.game.drawImage(this)
        }
    }
}
