class SceneEnd extends SceneMode {
    constructor(game) {
        super(game)
        this.e.text1 = TextMode.new(this.game, '游戏结束, 按 r 返回标题界面', 75, 165)
        this.setup()
    }

    setup() {
        this.game.registerAction('r', () => {
            this.game.replaceScene(SceneStart)
        })
    }
}
