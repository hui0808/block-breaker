class Score extends TextMode {
    constructor(game, score = 0) {
        super(game, "", 5, 295, "15px Arial")
        this.score = score
    }

    plus(score) {
        this.score += score
    }

    update() {
        super.update()
        this.text = '目前分数为: ' + this.score
    }
}