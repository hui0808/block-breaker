const globalDebug = true

const images = {
    ball: 'img/ball.png',
    block1: 'img/block1.png',
    block2: 'img/block2.png',
    block3: 'img/block3.png',
    paddle: 'img/paddle.png',
    background: 'img/background.jpg',
}

let config = {
    fps: {
        value: 30,
        text: "fps: ",
        min: 1,
        max: 60,
    },
    paddle_speed: {
        value: 15,
        text: "板子速度: ",
        min: 1,
        max: 30,
    },
    ball_speedX: {
        value: 5,
        text: "小球x轴速度: ",
        min: 0,
        max: 15,
    },
    ball_speedY: {
        value: 5,
        text: "小球y轴速度: ",
        min: 0,
        max: 15,
    },
}