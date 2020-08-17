class Scene extends SceneMode {
    constructor(game) {
        super(game)
        this.enableDebug = true
        this.e.bg = ImageMode.new(this.game, 'background')
        this.e.paddle = Paddle.new(this.game, 'paddle')
        this.e.ball = Ball.new(this.game, 'ball')
        this.e.score = Score.new(this.game, 0)
        this.e.blocks = loadLevel(this.game, 3)
        this.setup()
    }

    setup() {
        this.game.registerAction('a', () => {
            this.e.paddle.moveLeft()
        })
        this.game.registerAction('d', () => {
            this.e.paddle.moveRight()
        })
        this.game.registerAction('f', () => {
            this.e.ball.fire()
        })
    }

    debug() {
        super.debug();
        if (!this.enableDebug) {
            return
        }

        if (!this.one) {
            this.listener(window, 'keydown', event => {
                let k = event.key
                if (k === 'p') {
                    this.paused = !this.paused
                } else if ('1234567'.includes(k)) {
                    // 为了 debug 临时加的载入关卡功能
                    this.e.blocks = loadLevel(this.game, Number(k))
                }
            })
            this.listener(this.game.canvas, 'click', event => {
                let x = Math.floor(event.offsetX / 40) * 40
                let y = Math.floor(event.offsetY / 20) * 20
                // 避免点击小球时生成砖块
                if ((Math.floor(this.e.ball.x / 40) * 40) === x &&
                    Math.floor(this.e.ball.y / 20) * 20 === y) {
                    return
                }
                log('set block', x, y)
                for (let block of this.e.blocks) {
                    if (block.x === x && block.y === y) {
                        block.lifes++
                        block.reload()
                        log('block life up')
                        return
                    }
                }
                this.e.blocks.push(Block.new(this.game, [x, y], 'block'))
            })
            this.listener(e('#save'), 'click', event => {
                let temp = this.e.blocks.map(block => [block.x, block.y, block.lifes])
                save_json(temp, 'level.json')
            })

            this.paused = false
            this.one = true
        }
    }

    update() {
        if (this.paused) {
            return
        }

        super.update();
        let c = this.e.paddle.collide(this.e.ball)
        if (c) {
            log('相撞')
            // 这里应该调用一个 ball.反弹() 来实现
            this.e.ball.rebound(c)
        }

        // 检测砖块是否被击中，清除死亡的砖块
        this.e.blocks = this.e.blocks.filter(block => {
            c = block.collide(this.e.ball)
            if (c) {
                block.kill()
                block.reload()
                this.e.ball.rebound(c)
                this.e.score.plus(10)
            }
            return block.alive
        })

        // 判断游戏结束
        if (this.e.ball.y >= 300) {
            // 跳转到 游戏结束 的场景
            log('game over')
            this.game.replaceScene(SceneEnd)
        }
    }
}
