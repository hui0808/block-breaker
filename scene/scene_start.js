class SceneStart extends SceneMode {
    constructor(game) {
        super(game)
        this.e.text1 = TextMode.new(this.game, '按 k 开始游戏', 150, 165)
        this.setup()
    }

    setup() {
        this.game.registerAction('k', () => {
            this.game.replaceScene(Scene)
        })
    }
}
