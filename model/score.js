class Score extends TextMode {
    constructor(game, score = 0) {
        super(game, "目前分数为: ", 5, 295, "15px Arial")
        this.score = score
    }

    plus(score) {
        this.score += score
    }

    draw() {
        super.draw();
        this.game.context.fillText(this.text + this.score, this.x, this.y)
    }
}